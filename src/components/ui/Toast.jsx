import "../../styles/Toast.css";
import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import Button from "./Button";
import { IoClose } from "../../assets/icons";

/**
 * Toast
 * @description display message and optional callback
 */
const Toast = ({ toast, setToast }) => {
  const ref = useRef(false);

  const resetToast = () => {
    window.removeEventListener("click", closeOnClickedOutside);
    setToast(prev => ({
      ...prev,
      show: false,
      message: "",
      callback: null,
      from: null,
      timeout: null,
    }));
  };

  const closeOnClickedOutside = (e) => {
    if (e.target === toast.from && ref.current) {
      resetToast();
      return;
    }
    if (e.target.closest(".toast") === null && ref.current) {
      resetToast();
      return;
    }

    ref.current = true;
  };

  useEffect(() => {
    if (toast.show) {
      if (toast.timeout !== null) {
        setTimeout(() => {
          resetToast();
        }, toast.timeout);
      }
      ref.current = false;
      window.addEventListener("click", closeOnClickedOutside);

    } else {
      resetToast();
    }
  }, [toast.show]);

  return (
    <>
      <aside
        className={toast.show ? "toast toast-show" : "toast toast-hide"}
        ref={ref}
      >
        <div className="toast-col-1">
          <span className="toast-message">{toast.message}</span>
        </div>

        <div className="toast-col-2">
          {
            toast.callback !== null ? (
              <Button
                title="Undo"
                className="btn-primary btn-primary--darker btn-small"
                disabled={!toast.show}
                onClick={() => {
                  resetToast();
                  if (toast.callback !== null) {
                    toast.callback();
                  }
                }}
              />
            ) : null
          }
          <Button
            title={<IoClose />}
            className="btn-transparent btn-svgpair"
            disabled={!toast.show}
            onClick={resetToast}
          />
        </div>

      </aside>
    </>
  );
};

Toast.propTypes = {
  toast: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    callback: PropTypes.func,
    from: PropTypes.object,
    timeout: PropTypes.number,
  }),
  setToast: PropTypes.func.isRequired,
};

export default Toast;