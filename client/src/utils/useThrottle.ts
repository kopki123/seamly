/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
function useThrottle<Params extends any[]> (
  fn: (...args: Params) => any,
  delay = 0.5,
): (...args: Params) => void {
  let timer: ReturnType<typeof setTimeout> | null;

  return (...args: Params) => {
    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay * 1000);
  };
}

export default useThrottle;
