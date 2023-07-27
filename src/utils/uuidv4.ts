export default function uuidv4() {
  const getRandomValue = () => {
    const array = new Uint8Array(1);
    crypto.getRandomValues(array);
    return array[0] % 16;
  };

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = getRandomValue(),
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
