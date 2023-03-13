import "../../styles/Select.css";
import PropTypes from "prop-types";
import { useState } from "react";

/**
 * @Component Select
 * @example
 * <Select
 *  title="Select an option..."
 *  width="80%"
 *  maxWidth="180px"
 *  options={[
 *    { value: "option1", label: "option 1" },
 *    { value: "option2", label: "option 2" },
 *  ]}
 * />
 */
const Select = (
  {
    title = "",
    width = "100%",
    maxWidth = "100%",
    options = [{}],
  }
) => {

  const [selected, setSelected] = useState({
    value: null, label: null
  });
  const [isClosed, setIsClosed] = useState(true);
  const [above, setAbove] = useState(false);
  const [optionsHeight, setOptionsHeight] = useState("200px");

  const handleOpen = (e) => {
    if (options.length === 0) return;
    setIsClosed((prev) => !prev);
    const windowHeight = window.innerHeight;
    const len = (options.length * 36);
    const optHeight = len > 200 ? 200 : len; // options height
    const parentTop = e.target.parentElement.offsetTop;
    const offTop = (windowHeight - parentTop) + 8;
    /**
     * options will open above if there is not enough space below
     * 
     * if there is not enough space above or below, options will open in the direction with the most space and will be limited to the amount of space left in that direction.
     */
    if ((offTop - 32) < optHeight && (parentTop - 32) < optHeight) {
      if (parentTop > offTop) {
        setAbove(true);
        setOptionsHeight(offTop - 8 + "px");
      } else {
        setAbove(false);
        setOptionsHeight(parentTop - 8 + "px");
      }
    } else {
      setAbove(offTop < optHeight);
      setOptionsHeight("200px");
    }

    !isClosed ? window.removeEventListener("click", closeOnClickedOutside) : window.addEventListener("click", closeOnClickedOutside);
  };

  const closeOnClickedOutside = (e) => {
    if (e.target.closest(".select") === null) {
      setIsClosed(true);
      window.removeEventListener("click", closeOnClickedOutside);
    }
  };

  const handleSelect = (e) => {
    setSelected({
      value: e.target.getAttribute("data-value"),
      label: e.target.getAttribute("data-label"),
    });
    setIsClosed(true);
    window.removeEventListener("click", closeOnClickedOutside);
  };

  return (
    <>
      <div
        className="select"
        style={{ width: width, maxWidth: maxWidth }}
        aria-label="button"
        role="button"
      >
        <div
          className={isClosed ? "select__title" : "select__title select--open"}
          onClick={(e) => handleOpen(e)}
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleOpen(e);
          }}
        >
          <span>{selected.label === null ? title : selected.label}</span>
          <svg width="1.125rem" height="1.125rem" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
        </div>

        <div
          className="options-wrapper"
          hidden={isClosed}
        >
          <div
            onClick={(e) => handleSelect(e)}
            className={above ? "select__options options-above" : "select__options options-below"}
            style={{ maxHeight: optionsHeight }}
          >
            {
              options.map((option) => (
                <div
                  key={option.value}
                  value={option.value}
                  data-value={option.value}
                  data-label={option.label}
                  tabIndex="0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSelect(e);
                  }}
                  className={
                    option.value === selected.value ? "option option--selected" : "option"
                  }
                >
                  {option.label}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
};

Select.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
};
export default Select;
