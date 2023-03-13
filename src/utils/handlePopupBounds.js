import PropTypes from "prop-types";
const handlePopupBounds = (
  popupDimensions,
  popupPosition,
  shouldCenter = false,
) => {
  const { width, height } = popupDimensions;
  const { left, top } = popupPosition;
  const [windowHeight, windowWidth] = [
    window.innerWidth,
    window.innerHeight,
  ];

  let newX;
  let newY;

  if (shouldCenter) {
    newX = windowWidth / 2 - width / 2;
  } else {
    newX = left + width > windowWidth ? width - windowWidth : left;
  }

  newY = height + top > windowHeight ? height - windowHeight : top;

  if (newX < 0) {
    newX = Math.abs(newX);
  }

  if (newY < 0) {
    newY = 48;
  }

  return {
    left: newX,
    top: newY
  };
};

handlePopupBounds.propTypes = {
  popupDimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }).isRequired,
  popupPosition: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }).isRequired,
  shouldCenter: PropTypes.bool
};
export default handlePopupBounds;