import PropTypes from "prop-types";
import "../../styles/Input.css";

const Input = ({
  value = "",
  onChange = null,
  onKeyDown = null,
  type = "text",
  className = "input-dark",
  placeholder = null,
  checked = null,
  maxLength = 50,
  autoFocus = false,
  role = "textbox",
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      type={type}
      className={className}
      placeholder={placeholder}
      checked={checked}
      maxLength={maxLength}
      autoFocus={autoFocus}
      role={role}
      spellCheck="false"
    />
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  checked: PropTypes.bool,
  maxLength: PropTypes.number,
  autoFocus: PropTypes.bool,
  role: PropTypes.string,
};

export default Input;