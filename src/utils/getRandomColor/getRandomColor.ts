export const getRandomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const color = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;

  return color;
};

const toHex = (decimalValue: number) => {
  const hex = decimalValue.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};
