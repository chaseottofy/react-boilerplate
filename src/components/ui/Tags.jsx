import "../../styles/Tags.css";
import PropTypes from "prop-types";
import { useState } from "react";
import Button from "./Button";
import Input from "../form/Input";
import Toast from "./Toast";
import { IoClose } from "../../assets/icons";

/**
 * @Component Tags
 * @example
 * <Tags tags={['one', 'two']} />
 */
const Tags = ({ tags = [] }) => {
  const [tagData, setTagData] = useState(tags);
  const [error, setError] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    callback: null,
    from: null,
    timeout: null,
  });

  const submitData = (e) => {
    e.preventDefault();
    if (newTag.length > 0) {
      if (tagData.includes(newTag)) {
        setToast(prev => ({
          ...prev,
          show: !prev.show,
          message: "tag already added",
          callback: null,
          from: prev.from === e.target ? null : e.target,
          timeout: 2000,
        }));
        setError(true);
        return;
      } else {
        setTagData([...tagData, newTag.trim()]);
        setNewTag("");
      }
    } else {
      setToast(prev => ({
        ...prev,
        show: !prev.show,
        message: "no tag entered",
        callback: null,
        from: prev.from === e.target ? null : e.target,
        timeout: 2000,
      }));
      return;
    }
  };
  return (
    <>
      <div className="tag-input">
        <ul className="tags">
          {tagData.map((tag, index) => (
            <li key={index} className="tag">
              <Button
                className="btn-primary btn-svg__plus-text show-icon--hover"
                title={
                  <>
                    <span>{tag}</span>
                    <IoClose />
                  </>
                }
                onClick={() => {
                  let newtags = tagData.filter((_, i) => i !== index);
                  setTagData(newtags);
                }}
              />
            </li>
          ))}
        </ul>

        <div
          className={error ? "tag-input--wrapper form-err--target__input" : "tag-input--wrapper"}
        >
          <Input
            type="text"
            value={newTag}
            maxLength={24}
            onChange={(e) => {
              if (error) {
                setError(false);
              }
              setNewTag(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter" && newTag.length > 0) {
                submitData(e);
              }

              if (e.key === "Backspace" && newTag.length === 0 && tagData.length > 0) {
                setTimeout(() => {
                  setNewTag(tagData.slice(-1)[0]);
                  setTagData([
                    ...tagData.slice(0, -1)
                  ]);
                }, 4);
              }

              if (e.key === "Escape") {
                e.target.blur();
              }
            }}
            placeholder="new tag..."
          />
        </div>
      </div>
      {
        toast.show && (
          <Toast
            toast={toast}
            setToast={setToast}
          />
        )
      }
    </>
  );
};

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default Tags;