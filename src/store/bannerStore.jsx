import { create } from "zustand";
import { MOCK_BANNER_LIST } from "../mock/banners";

export const useBannerStore = create((set, get) => ({
  banners: [],
  editingBannerId: null,
  loading: false,

  getBannerById: (id) => {
    return get().banners.find((b) => b.id === id);
  },

  setBanners: (banners) => set({ banners }),

  setEditingBannerId: (id) => set({ editingBannerId: id }),

  updateBanner: (updateBanner) =>
    set((state) => ({
      banners: state.banners.map((b) => (b.id === updateBanner.id ? { ...b, ...updateBanner } : b)),
    })),

  archiveBanner: (id) =>
    set((state) => ({
      banners: state.banners.map((b) =>
        b.id === id
          ? {
              ...b,
              archive: 1,
              viewOrder: 0,
              isActive: false,
            }
          : b,
      ),
    })),

  restoreBanner: (id) =>
    set((state) => ({
      banners: state.banners.map((b) =>
        b.id === id
          ? {
              ...b,
              archive: 0,
              isActive: true,
              viewOrder: state.banners.filter((banner) => banner.archive === 0).length + 1,
            }
          : b,
      ),
    })),

  deleteBanner: (id) =>
    set((state) => ({
      banners: state.banners.filter((b) => b.id !== id),
    })),

  fetchBanners: async () => {
    set({ loading: true });

    const res = MOCK_BANNER_LIST;

    set({
      banners: res,
      loading: false,
    });
  },
}));
