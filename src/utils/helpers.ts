export function formatWikipediaUrl(rawUrl: string): string {
  let url = rawUrl.replace(/\\/g, '');
  url = url.replace(/^http:\/\//, 'https://');
  return url;
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
