import { degrees } from "motion";

export const INITIAL_STAFF = {
  avatarUrl: "",
  email: "",
  password: "",
  firstname: "",
  lastname: "",
  phone: "",
  position: "",
  status: "",
  role: ""
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
