export const assignColors = (items, palette) => {
  let lastIndex = -1;

  return items.map((item, index) => {
    let colorIndex = index % palette.length;

    if (colorIndex === lastIndex) {
      colorIndex = (colorIndex + 1) % palette.length;
    }

    lastIndex = colorIndex;

    return {
      ...item,
      __uiColor: palette[colorIndex]
    };
  });
};

export function buildDoctorColorMap(doctors, palette) {
  const coloredDoctors = assignColors(doctors, palette);

  return coloredDoctors.reduce((map, doctor) => {
    map[doctor.id] = doctor.__uiColor;
    return map;
  }, {});
}

export const DOCTOR_COLORS = [
  { name: "primary", label: "Xanh lá", hex: "#19c953", tailwind: "bg-[#19c953]" },
  { name: "secondary", label: "Xanh dương", hex: "#1c74f8", tailwind: "bg-[#1c74f8]" },
  { name: "purple", label: "Tím", hex: "#8100f2", tailwind: "bg-[#8100f2]" },
  { name: "cyan", label: "Cyan", hex: "#00bcd4", tailwind: "bg-[#00bcd4]" },
  { name: "warning", label: "Vàng", hex: "#ffcc00", tailwind: "bg-[#ffcc00]" },
  { name: "error", label: "Đỏ", hex: "#ff4d4d", tailwind: "bg-[#ff4d4d]" }
];

export const getColorByIndex = (index) => {
  return DOCTOR_COLORS[index % DOCTOR_COLORS.length];
};

export const getColorHexByName = (colorName) => {
  const color = DOCTOR_COLORS.find((c) => c.name === colorName);
  return color ? color.hex : "#8100f2";
};
