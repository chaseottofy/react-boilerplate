import { useState } from "react";
import PropTypes from 'prop-types';
import "../../styles/Tooltip.css";
/**
 * @example
 * <Tooltip content="hello" position="top">
 *  <Button title="click me" />
 * </Tooltip>
 * @description Wrap single child element with tooltip to display on hover and focus
 */
const Tooltip = (
  {
    content,
    children,
    position = 'bottom',
    height = "80%",
    radius = "50%"
  }
) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: height,
        };
      case 'left':
        return {
          top: '50%',
          right: '100%',
          transform: 'translate(-20%, -50%)',
          height: height,
        };
      case 'right':
        return {
          top: '50%',
          left: '100%',
          transform: 'translate(20%, -50%)',
          height: height,
        };
      case 'bottom':
      default:
        return {
          top: '100%',
          left: '50%',
          transform: 'translate(-50%, 50%)',
          height: height,
        };
    }
  };

  /**
   * checkWindowBounds
   * updates tooltip position if it is outside of the window.
   * does not handle vertical overflow, only horizontal.
   */
  const checkWindowBounds = (e) => {
    const target = e.target.parentElement.nextElementSibling;
    if (target === null) return;
    const { left, right } = target.getBoundingClientRect();

    if (left < 0) {
      target.style.marginLeft = `${-left + 24}px`;
    }

    if (right > window.innerWidth) {
      target.style.marginLeft = `${window.innerWidth - right - 8}px`;
    }
  };

  const handleMouseEnter = (e) => {
    setIsVisible(true);
    checkWindowBounds(e);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const tooltipStyle = {
    ...getPositionStyle(),
    visibility: isVisible ? 'visible' : 'hidden',
  };

  return (
    <div
      className="tooltip-container"
      style={{ borderRadius: radius }}
      role="tooltip"
    >
      <div
        className="tooltip-trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        style={{ borderRadius: radius }}
        role="button"
      >
        {children}
      </div>
      <div
        className={`tooltip ${position}`}
        style={tooltipStyle}
      >
        {content}
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
  height: PropTypes.string,
  radius: PropTypes.string,
};

export default Tooltip;