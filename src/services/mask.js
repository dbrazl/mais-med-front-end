export default function mask(value, pattern) {
  let index = 0;
  const string = value.toString();
  return pattern.replace(/9/g, () => string[index++] || '');
}
