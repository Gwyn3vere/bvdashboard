import { create } from "zustand";
import { MOCK_NEWS_LIST } from "../mock/news";

const normalizeNews = (item) => ({
  ...item,
  authorId: item.author?.id || "",
  categoryId: item.category?.id || "",
});

export const useNewsStore = create((set, get) => ({
  news: MOCK_NEWS_LIST.map(normalizeNews),
  editingNewsId: null,
  loading: false,

  getNewsById: (id) => get().news.find((s) => s.id === id),

  setNews: (news) => set({ news: news.map(normalizeNews) }),

  setEditingNewsId: (id) => set({ editingNewsId: id }),

  updateNews: (updatedNews) =>
    set((state) => ({
      news: state.news.map((s) =>
        s.id === updatedNews.id ? normalizeNews({ ...s, ...updatedNews }) : s,
      ),
    })),

  updateCategoryForNews: (oldId, newId) =>
    set((state) => ({
      news: state.news.map((n) =>
        n.categoryId === oldId ? { ...n, categoryId: newId } : n,
      ),
    })),

  deleteNews: (id) =>
    set((state) => ({
      news: state.news.filter((s) => s.id !== id),
    })),

  fetchNews: async () => {
    set({ loading: true });

    const data = MOCK_NEWS_LIST;

    set({
      news: data.map(normalizeNews),
      loading: false,
    });
  },
}));
