import { API_TOKEN_KEY, api } from "./api.config";

export const fetchBannersService = async () => {
  try {
    const res = await api.get("banners");

    return { success: true, banners: res.data.data };
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Fetch banners failed";
    return { success: false, errors: { banners: message } };
  }
};

export const createBannerService = async (payload) => {
  try {
    const res = await api.post("banners", payload);

    return {
      success: true,
      banner: res.data.data,
    };
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Create banner failed";

    return {
      success: false,
      errors: { banner: message },
    };
  }
};
