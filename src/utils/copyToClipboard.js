import PropTypes from "prop-types";

const copyToClipboard = (text) => {
  if (!navigator.clipboard || !text) return;
  return navigator.clipboard.writeText(text);
}

copyToClipboard.propTypes = {
  text: PropTypes.string.isRequired,
}

export default copyToClipboard