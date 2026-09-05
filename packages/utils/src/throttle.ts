export function throttle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
) {
  let lastTime = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastTime >= delay) {
      callback(...args);
      lastTime = now;
    }
  }
}