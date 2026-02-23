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

export const generateCategoryId = (name, existingIds = []) => {
  if (!name) return "";

  // 1. Remove Vietnamese accents
  const normalized = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 2. Remove special characters
  const clean = normalized.replace(/[^a-zA-Z0-9\s]/g, "");

  // 3. Create acronym
  const baseId = clean
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toLowerCase();

  // 4. Handle duplicate
  let finalId = baseId;
  let counter = 1;

  while (existingIds.includes(finalId)) {
    finalId = `${baseId}${counter}`;
    counter++;
  }

  return finalId;
};
