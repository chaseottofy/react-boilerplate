import "../../styles/Button.css";
import PropTypes from "prop-types";
/**
 * @Component Button
 */
const Button = ({
  title,
  className = "btn-primary",
  onClick = null,
  id = null,
  disabled = false,
  tabIndex = null,
  ariaLabel = "button",
  role = null,
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      id={id}
      disabled={disabled}
      tabIndex={tabIndex ? tabIndex : disabled ? -1 : null}
      aria-label={disabled ? null : ariaLabel}
      aria-hidden={disabled}
      role={disabled ? null : role}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  ariaLabel: PropTypes.string,
  role: PropTypes.string,
};

export default Button;