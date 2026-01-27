import {
  LuBuilding2,
  LuTestTubeDiagonal,
  LuBriefcaseMedical,
  LuBuilding,
  LuNotepadText,
  LuCircleDollarSign,
  LuStethoscope,
  LuHeart,
  LuScissors,
  LuBaby,
  LuClipboardPlus,
  LuSiren,
  LuSyringe,
  LuToyBrick,
  LuBug,
  LuLeaf,
  LuEye,
  LuMicroscope,
  LuFlaskConical,
  LuShield,
  LuPill,
  LuHeartPulse
} from "react-icons/lu";

export const ICON_MAP = {
  // Group/Block icons
  "building-corporate": LuBuilding2,
  "medical-clinic": LuBriefcaseMedical,
  laboratory: LuTestTubeDiagonal,

  // Department icons - Khối phòng chức năng
  planning: LuBuilding,
  admin: LuNotepadText,
  finance: LuCircleDollarSign,
  nursing: LuHeartPulse,

  // Department icons - Khối lâm sàng
  "internal-medicine": LuHeart,
  surgery: LuScissors,
  obstetrics: LuBaby,
  outpatient: LuClipboardPlus,
  emergency: LuSiren,
  anesthesia: LuSyringe,
  pediatrics: LuToyBrick,
  infectious: LuBug,
  traditional: LuLeaf,
  "dental-ent": LuEye,

  // Department icons - Khối cận lâm sàng
  imaging: LuMicroscope,
  "lab-test": LuFlaskConical,
  "infection-control": LuShield,
  pharmacy: LuPill,

  // Default
  stethoscope: LuStethoscope
};
