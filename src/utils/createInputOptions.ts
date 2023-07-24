export default function createInputOptions<T>(dictionary: Record<string, T>) {
  return Object.entries(dictionary).map(([value, label]) => ({
    value,
    label
  }));
}
