import PropTypes from 'prop-types';

const validateInput = (
  text,
  max = 50,
  min = 1,
) => {

  const newText = text.trim().replace(/[^a-zA-Z0-9\s_-]+|\s{2,}/g, ' ');

  if (newText.length === 0) {
    return {
      valid: false,
      msg: "input cannot be empty"
    };
  } else if (newText.length < min) {
    return {
      valid: false,
      msg: `input must be at least ${min} characters`
    };
  } else if (newText.length > max) {
    return {
      valid: false,
      msg: `input must be less than ${max} characters`
    };
  } else {
    return {
      valid: true,
      msg: "",
      text: newText
    };
  }
};

validateInput.propTypes = {
  text: PropTypes.string.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
};
export default validateInput;