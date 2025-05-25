import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Seasons from './index';
import useFetch from '../../hooks/useFetch';

const mockUseFetch = useFetch as unknown as Mock;

vi.mock('../../hooks/useFetch', () => ({
  default: vi.fn()
}));
vi.mock('../../components', () => ({
  Pagination: ({ page, totalPages, onPageChange }: any) => (
    <div data-testid="pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>Prev</button>
      <span>{page} / {totalPages}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>Next</button>
    </div>
  ),
  CardView: ({ items, renderItem }: any) => (
    <div data-testid="card-view">{items.map(renderItem)}</div>
  ),
  ListView: ({ items, renderItem }: any) => (
    <div data-testid="list-view">{items.map(renderItem)}</div>
  ),
  Header: ({ title, h2, buttonLabel, onButtonClick }: any) => (
    <div>
      <h1>{title}</h1>
      <h2>{h2}</h2>
      <button onClick={onButtonClick}>{buttonLabel}</button>
    </div>
  ),
  LoadingSpinner: ({ message }: any) => <div>{message}</div>,
  ErrorMessage: ({ message }: any) => <div>{message}</div>,
}));

const mockSeasons = [
  { season: '2020', url: 'https://en.wikipedia.org/wiki/2020_Formula_One_World_Championship' },
  { season: '2021', url: 'https://en.wikipedia.org/wiki/2021_Formula_One_World_Championship' },
];


describe('Seasons Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading message', () => {
    mockUseFetch.mockReturnValue({ data: null, loading: true, error: null });
    render(
      <MemoryRouter>
        <Seasons />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error message', () => {
    mockUseFetch.mockReturnValue({ data: null, loading: false, error: 'Error!' });
    render(
      <MemoryRouter>
        <Seasons />
      </MemoryRouter>
    );
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it('renders seasons in card view by default', () => {
    mockUseFetch.mockReturnValue({
      data: { MRData: { SeasonTable: { Seasons: mockSeasons }, total: '2' } },
      loading: false,
      error: null
    });
    render(
      <MemoryRouter>
        <Seasons />
      </MemoryRouter>
    );
    expect(screen.getByTestId('card-view')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
  });

  it('toggles from list view to card view and back - text UI', () => {
    mockUseFetch.mockReturnValue({
      data: { MRData: { SeasonTable: { Seasons: mockSeasons }, total: '2' } },
      loading: false,
      error: null
    });
    render(
      <MemoryRouter>
        <Seasons />
      </MemoryRouter>
      );
      expect(screen.getByText(/list view/i)).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: /list view/i }));
      expect(screen.getByText(/card view/i)).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: /card view/i }));
      expect(screen.getByText(/list view/i)).toBeInTheDocument();
  });

  it('pagination - text UI', () => {
    mockUseFetch.mockReturnValue({
      data: { MRData: { SeasonTable: { Seasons: mockSeasons }, total: '20' } },
      loading: false,
      error: null
    });
    render(
      <MemoryRouter>
        <Seasons />
      </MemoryRouter>
    );
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));
  });
    
    it('shows a message when no seasons are returned', () => {
      mockUseFetch.mockReturnValue({
        data: { MRData: { SeasonTable: { Seasons: [] }, total: '0' } },
        loading: false,
        error: null
      });
      render(
        <MemoryRouter>
          <Seasons />
        </MemoryRouter>
      );
      expect(screen.getByText(/no seasons/i)).toBeInTheDocument();
    });
    
    it('renders Wikipedia links with correct href and target', () => {
      mockUseFetch.mockReturnValue({
        data: { MRData: { SeasonTable: { Seasons: mockSeasons }, total: '2' } },
        loading: false,
        error: null
      });
      render(
        <MemoryRouter>
          <Seasons />
        </MemoryRouter>
      );
      const links = screen.getAllByText(/wikipedia/i);
      expect(links[0]).toHaveAttribute('href', mockSeasons[0].url);
      expect(links[0]).toHaveAttribute('target', '_blank');
    });
});
