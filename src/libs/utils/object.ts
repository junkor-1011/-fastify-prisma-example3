/**
 * generate object only includes designated keys
 * @param obj - any Object
 * @param keys - array of keys you want to save
 */

export const pickObject = <T extends Record<string, unknown>, U extends keyof T>(
  obj: T,
  keys: U[],
): Pick<T, U> => {
  const subset = Object.fromEntries(
    keys.filter((key) => key in obj).map((key) => [key, obj[key]]),
  ) as Pick<T, U>;
  return subset;
};

/**
 * generate object excludes designted keys
 * @param obj - any Object
 * @param keys - array of keys you want to delete
 */
export const omitObject = <T extends Record<string, unknown>, U extends keyof T>(
  obj: T,
  keys: U[],
): Omit<T, U> => {
  const omitKeys = [...keys] as string[];
  const allKeys = Object.keys(obj);
  const subset = Object.fromEntries(
    allKeys.filter((key) => !omitKeys.includes(key)).map((key) => [key, obj[key]]),
  ) as Omit<T, U>;
  return subset;
};
