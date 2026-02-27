export function stringToHue(str = "") {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return Math.abs(hash) % 360;
}

export function getDoctorGradient(name = "") {
  const hue = stringToHue(name);

  const color1 = `hsl(${hue}, 70%, 60%)`;
  const color2 = `hsl(${hue}, 70%, 40%)`;

  return `linear-gradient(135deg, ${color1}, ${color2})`;
}
