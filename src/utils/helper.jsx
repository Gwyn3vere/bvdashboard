import { authStorage, decodeToken } from "./mockToken";

export const generateTableOfContents = (htmlContent) => {
  if (!htmlContent) return [];

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Chỉ lấy H2 (main sections)
    const headings = doc.querySelectorAll("h2");

    return Array.from(headings)
      .map((h) => h.textContent.trim())
      .filter((text) => text.length > 0) // Loại bỏ heading rỗng
      .slice(0, 5); // Giới hạn 5 items cho gọn
  } catch (error) {
    console.error("Error parsing HTML:", error);
    return [];
  }
};

export const isAuthenticated = () => {
  const token = authStorage.getToken();
  if (!token) return false;

  const payload = decodeToken(token);
  if (!payload || payload.exp * 1000 < Date.now()) {
    authStorage.clear();
    return false;
  }

  return true;
};
