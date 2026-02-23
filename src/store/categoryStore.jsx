import { create } from "zustand";
import { MOCK_NEWS_CATEGORIES } from "../mock/news";
import { useNewsStore } from "./newsStore";

const DEFAULT_CATEGORY_ID = "uncategorized";

export const useCategoryStore = create((set, get) => ({
  categories: MOCK_NEWS_CATEGORIES,
  editingCategoryId: null,
  loading: false,

  getCategoryById: (id) => get().categories.find((c) => c.id === id),

  setCategories: (categories) => set({ categories }),

  setEditingCategoryId: (id) => set({ editingCategoryId: id }),

  createCategory: (data) => {
    const existingIds = get().categories.map((c) => c.id);

    const id = generateCategoryId(data.name, existingIds);

    set((state) => ({
      categories: [...state.categories, { ...data, id }],
    }));
  },

  updateCategory: (updateCategory) =>
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === updateCategory.id ? { ...c, ...updateCategory } : c,
      ),
    })),

  deleteCategory: (id) => {
    if (id === DEFAULT_CATEGORY_ID) return;

    const newsStore = useNewsStore.getState();

    newsStore.updateCategoryForNews(id, DEFAULT_CATEGORY_ID);

    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    }));
  },

  fetchCategory: async () => {
    set({ loading: true });

    const data = MOCK_NEWS_CATEGORIES;

    set({
      categories: data,
      loading: false,
    });
  },
}));
