export function readInitialState<T>(read: () => T, unavailable: T): Promise<T> {
  return Promise.resolve().then(() => {
    try {
      return read();
    } catch {
      return unavailable;
    }
  });
}
