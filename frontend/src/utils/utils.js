export const getMimeType = (file_url) => {
  return "image";
};

export const trimText = (text, length) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};
