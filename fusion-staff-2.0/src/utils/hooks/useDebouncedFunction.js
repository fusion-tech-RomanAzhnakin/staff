import { useRef } from 'react';

const useDebouncedFunction = (func, delay, cleanUp = false) => {
  const timeOutRef = useRef();

  return (...args) => {
    if (cleanUp) {
      clearTimeout(timeOutRef.current);
      timeOutRef.current = null;
    }

    timeOutRef.current = setTimeout(() => func(...args), delay);
  };
};

export default useDebouncedFunction;
