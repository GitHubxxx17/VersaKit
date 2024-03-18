import { useEffect, useRef } from "react";

export default function useDeboounce(fn: Function, delay: number = 500) {
  let timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, []);

  return function (...argu: any[]) {
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      fn?.apply(null, argu);
    }, delay);
  };
}
