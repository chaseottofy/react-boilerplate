import "../../styles/Checkbox.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { RxCheck } from "../../assets/icons";
import Button from "./Button";

// const Checkbox = ({checked, setChecked}) => {}
const Checkbox = (
  {
    checked,
    title,
    className = "btn-transparent"
  }
) => {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <Button
      onClick={() => setIsChecked(prev => !prev)}
      className={className}
      role="checkbox"
      aria-checked={isChecked}
      title={
        <div className="checkbox-container">
          {title && <span className="checkbox-title">{title}</span>}
          <div
            role="presentation"
            className={isChecked ? "checkbox-wrapper has-check" : "checkbox-wrapper"}
          >
            <span
              className={
                isChecked ? "checkbox-fill checked" : "checkbox-fill"
              }
              role="presentation"
            >{
                isChecked && <RxCheck className="checkbox-icon" />
              }
            </span>
          </div>
        </div>
      }
    />
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};
export default Checkbox;