import "../../styles/Sidebar.css";
import Button from "./Button";
import Tooltip from "./Tooltip";
import { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineMenuFold,
  IoBookmark,
  IoCalendarClear,
  IoChatboxEllipses,
  IoFileTray
} from '../../assets/icons';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const Toolbar = ({ title, icon, onClick }) => {
    return (
      <div className="sidebar-icon__wrapper">
        <Tooltip
          content={title}
          position="right"
          height="80%"
          radius="50%"
        >
          <Button
            title={icon}
            className="btn-transparent btn-svgpair btnsvg-larger"
            aria-label={title}
            onClick={onClick ? onClick : null}
          />
        </Tooltip>
      </div>
    );
  };

  return (
    <aside className={open ? "sidebar show-sidebar" : "sidebar hide-sidebar"}>
      <div className="sidebar-header">
        <div className="sidebar__row">
          <Toolbar
            title={open ? "close menu" : "open menu"}
            icon={open ? <AiOutlineMenuFold /> : <AiOutlineMenu />}
            onClick={() => setOpen(prev => !prev)}
          />
        </div>
      </div>

      <div className="sidebar-body">
        <div className="sidebar__row">
          <Toolbar
            title={"bookmarks icon"}
            icon={<IoBookmark />}
          />
          <div className="sidebar-content">
            <span>example content</span>
          </div>
        </div>

        <div className="sidebar__row">
          <Toolbar title={"calendar icon"} icon={<IoCalendarClear />} />
          <div className="sidebar-content">
            <span>example content</span>
          </div>
        </div>

        <div className="sidebar__row">
          <Toolbar title={"chat icon"} icon={<IoChatboxEllipses />} />
          <div className="sidebar-content">
            <span>example content</span>
          </div>
        </div>

        <div className="sidebar__row">
          <Toolbar title={"files icon"} icon={<IoFileTray />} />
          <div className="sidebar-content">
            <span>example content</span>
          </div>
        </div>
      </div>


      <div className="sidebar-footer">
        <div className="sidebar__row">
          <div className="sidebar-content"></div>
        </div>
      </div>
    </aside>
  );
};
