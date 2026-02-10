import { create } from "zustand";
import { MOCK_NEWS_LIST } from "../mock/news";

export const useNewsStore = create((set, get) => ({
  /* =======================
     STATE
  ======================= */
  news: MOCK_NEWS_LIST,
  editingNewsId: null,
  loading: false,

  /* =======================
     GETTERS (selectors)
  ======================= */
  getNewsById: (id) => {
    return get().news.find((s) => s.id === id);
  },

  /* =======================
     ACTIONS
  ======================= */

  // dùng cho List
  setNews: (news) => set({ news }),

  // mở modal edit
  setEditingNewsId: (id) => set({ editingNewsId: id }),

  // update news (MOCK)
  updateNews: (updatedNews) =>
    set((state) => ({
      news: state.news.map((s) =>
        s.id === updatedNews.id ? { ...s, ...updatedNews } : s,
      ),
    })),

  // delete news (MOCK)
  deleteNews: (id) =>
    set((state) => ({
      news: state.news.filter((s) => s.id !== id),
    })),

  /* =======================
     API PLACEHOLDER
     (sau này chỉ đổi phần này)
  ======================= */

  fetchNews: async () => {
    set({ loading: true });

    // TODO: thay bằng API thật
    // const res = await api.get("/news");

    set({
      news: MOCK_NEWS_LIST,
      loading: false,
    });
  },
}));
