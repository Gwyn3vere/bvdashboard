export const INITIAL_STAFF = {
  id: "",
  slug: "",
  avatar: null,
  email: "",
  password: "",
  name: "",
  phone: "",
  position: "",
  department: "",
  role: "",
  facility: "",
  isActive: false,
  isVerifyEmail: false,
  featured: false,
};

export const INITIAL_DOCTOR = {
  id: "",
  slug: "",
  externalId: "",
  name: "",
  title: "",
  specialty: "",
  specialtyId: "",
  department: "",
  facility: "",
  experienceYears: 0,
  position: "",
  languages: [],
  tags: [],
  featured: false,
  avatar: null,
};

export const INITIAL_DETAIL_DOCTOR = {
  ...INITIAL_DOCTOR,
  bio: "",
  scheduleNote: "",
  expertise: [],
  experience: [],
  education: [],
  publications: [],
};

export const INITAL_WORK_SCHEDULES = {
  date: [
    {
      doctorId: "",
      dateTime: "",
      sessionType: "",
      startTime: "",
      endTime: "",
      slotDuration: 30,
      scheduleId: "",
      generatedSlots: [],
      selectedSlotIndices: [],
      slots: [],
      configured: false,
      syncStatus: "dirty",
      colorName: "warning",
    },
  ],
};

export const INITAL_GROUP = {
  id: "",
  value: "",
  name: "",
  icon: "",
};

export const INITAL_DEPARTMENT = {
  id: "",
  groupId: "",
  value: "",
  name: "",
  icon: "",
};

export const INITAL_SPECIALTY = {
  id: "",
  departmentId: "",
  value: "",
  name: "",
};

export const INITAL_NEWS = {
  id: "",
  authorId: "",
  title: "",
  shortDesc: "",
  content: "",
  categoryId: "",
  tags: ["sức khoẻ", "y tế"],
  metaTitle: "",
  metaDesc: "",
  status: "DRAFT",
  thumbnail: null,
  view: 0,
};

export const INITAL_NEWS_CATEGORY = {
  id: "",
  name: "",
  icon: "",
  color: "",
  totalNews: 0,
};

export const INITAL_BANNER = {
  id: "",
  name: "",
  viewOrder: null,
  isActive: true,
  url: "",
  color: "rgb(219, 234, 254)",
  archive: 0,
  imageUrl: null,
  imageFile: null,
};
