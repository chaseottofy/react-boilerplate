import { useEffect } from 'react';
import PropTypes from "prop-types";
/**
 * useEventListener
 * @example
 * const App = () => {
 *  const [count, setCount] = useState(0);
 *  const [isOnline, setIsOnline] = useState(null);
 * }
 */
const useEventListener = (eventName, handler, element = window, options = {}) => {
  useEffect(() => {
    const listener = (event) => handler(event);

    element.addEventListener(eventName, listener, options);

    return () => {
      element.removeEventListener(eventName, listener, options);
    };
  }, [eventName, handler, element, options]);
};

useEventListener.propTypes = {
  eventName: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  element: PropTypes.object,
  options: PropTypes.object,
};
export default useEventListener;