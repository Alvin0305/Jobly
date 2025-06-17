export const getMimeType = (file_url) => {
  if (!file_url) return null;
  try {
    const url = new URL(file_url);
    const pathname = url.pathname.toLowerCase();
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".svg",
      ".gif",
      ".bmp",
    ];
    const videoExtensions = [".mp4", ".mov", ".avi", ".wmv", ".webm"];
    const documentExtensions = [
      ".pdf",
      ".doc",
      ".docx",
      "xls",
      ".xlsx",
      ".ppt",
      ".pptx",
      ".txt",
    ];
    if (imageExtensions.some((ext) => pathname.endsWith(ext))) return "image";
    if (videoExtensions.some((ext) => pathname.endsWith(ext))) return "video";
    if (documentExtensions.some((ext) => pathname.endsWith(ext))) return "raw";
    return "raw";
  } catch (err) {
    console.log("invalid url", file_url);
    return null;
  }
};

export const trimText = (text, length) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};
