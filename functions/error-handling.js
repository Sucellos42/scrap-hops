// error-handling.js
export function handleError(error) {
  console.error(`Scraping error: ${error}`);
  return { error };
}
