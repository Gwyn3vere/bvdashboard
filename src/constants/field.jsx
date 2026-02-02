export const INITIAL_STAFF = {
  id: "",
  slug: "",
  avatar: null,
  email: "",
  password: "",
  name: "",
  phone: "",
  position: "",
  role: "",
  facility: "",
  featured: false
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
  languages: [],
  tags: [],
  featured: false,
  avatar: null
};

export const INITIAL_DETAIL_DOCTOR = {
  ...INITIAL_DOCTOR,
  bio: "",
  scheduleNote: "",
  expertise: [],
  experience: [],
  education: [],
  publications: []
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
      colorName: "warning"
    }
  ]
};

export const INITAL_GROUP = {
  id: "",
  value: "",
  name: "",
  icon: ""
};

export const INITAL_DEPARTMENT = {
  id: "",
  groupId: "",
  value: "",
  name: "",
  icon: ""
};

export const INITAL_SPECIALTY = {
  id: "",
  departmentId: "",
  value: "",
  name: ""
};
