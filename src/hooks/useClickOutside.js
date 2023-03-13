import { useState, useEffect } from "react";

const useClickOutside = (elementRef) => {
  const [isClickedOutside, setIsClickedOutside] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        setIsClickedOutside(true);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [elementRef]);

  return isClickedOutside;
}

export default useClickOutside;