export function isNullOrUndefined<T>(
  value: T | null | undefined,
): value is null | undefined {
  return typeof value === 'undefined' || value === null;
}
