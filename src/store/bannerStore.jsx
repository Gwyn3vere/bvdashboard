import { create } from "zustand";
import { MOCK_BANNER_LIST } from "../mock/banners";
import { fetchBannersService, createBannerService } from "../services/banner";

export const useBannerStore = create((set, get) => ({
  banners: [],
  editingBannerId: null,
  loading: false,

  getBannerById: (id) => {
    return get().banners.find((b) => b?.id === id);
  },

  setBanners: (banners) => set({ banners }),

  setEditingBannerId: (id) => set({ editingBannerId: id }),

  createBanner: async (payload) => {
    try {
      set({ loading: true });

      const res = await createBannerService(payload);

      if (!res.success) throw new Error(res.errors?.banner);

      await get().fetchBanners(); // sync lại từ BE

      set({ loading: false });

      return { success: true };
    } catch (error) {
      set({ loading: false });
      return { success: false, message: error.message };
    }
  },

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
    set((state) => {
      const activeCount = state.banners.filter((b) => b.archive === 0).length;

      return {
        banners: state.banners.map((b) =>
          b.id === id
            ? {
                ...b,
                archive: 0,
                isActive: true,
                viewOrder: activeCount + 1,
              }
            : b,
        ),
      };
    }),

  deleteBanner: (id) =>
    set((state) => ({
      banners: state.banners.filter((b) => b.id !== id),
    })),

  fetchBanners: () => {
    set({ loading: true });

    // const res = await fetchBannersService();
    const mockRes = MOCK_BANNER_LIST;

    // if (res.success) {
    //   set({
    //     banners: res.banners.data,
    //     loading: false,
    //   });
    // } else {
    //   console.error(res.errors);
    //   set({ loading: false });
    // }

    set({
      banners: mockRes,
      loading: false,
    });
  },
}));
