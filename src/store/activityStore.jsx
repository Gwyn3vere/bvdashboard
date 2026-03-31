import { create } from "zustand";
import { MOCK_ACTIVITY_LOG, ACTION_CONFIG } from "../mock/activity";

export const useActivityStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────────
  activities: [],
  loading: false,

  // ── Selectors ──────────────────────────────────────────────

  /**
   * Lấy N activities gần nhất — dùng cho dashboard widget.
   * @param {number} limit  Mặc định 10
   */
  getRecentActivities: (limit = 10) =>
    get()
      .activities.slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit),

  /**
   * Lấy config hiển thị (label, color, icon) của 1 activity.
   * @param {string} action  ACTION_TYPES value
   */
  getActionConfig: (action) => ACTION_CONFIG[action] ?? { label: action, color: "secondary", icon: "info" },

  // ── Actions ────────────────────────────────────────────────

  /**
   * Thêm 1 activity mới vào đầu danh sách.
   * Gọi sau mỗi thao tác quan trọng (confirm, cancel, publish...).
   *
   * @param {{
   *   action:     string,
   *   actor:      { id, name, avatar },
   *   target:     string,
   *   targetId:   string,
   *   targetType: string,
   *   meta?:      object,
   * }} activity
   */
  addActivity: (activity) => {
    const newActivity = {
      id: `act-${Date.now()}`,
      createdAt: new Date().toISOString(),
      meta: {},
      ...activity,
    };
    set((state) => ({
      activities: [newActivity, ...state.activities],
    }));
  },

  // ── Fetch ──────────────────────────────────────────────────
  // TODO khi có API thật: thay MOCK_ACTIVITY_LOG bằng API call
  // GET /api/activity-logs?limit=50&sort=createdAt:desc
  fetchActivities: async () => {
    set({ loading: true });
    set({
      activities: MOCK_ACTIVITY_LOG,
      loading: false,
    });
  },
}));
