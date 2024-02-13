export const getYoutubeVideoId = (url: string) => {
  const videoIdMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]+)/,
  );
  return videoIdMatch ? videoIdMatch[1] : null;
};
