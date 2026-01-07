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
