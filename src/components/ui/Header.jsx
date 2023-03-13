import "../../styles/Header.css";
import Button from "./Button";
import Tooltip from "./Tooltip";
import { IoMoon, IoSunny } from "../../assets/icons";

const Header = ({ theme, handleTheme }) => {

  return (
    <header className="header">

      <div className="header-col-1"></div>

      <div className="header-col-2">
        <Tooltip content="change theme" position='left'>
          <Button
            title={
              theme === "theme__light" ?
                <IoSunny className="theme-icon" />
                : <IoMoon className="theme-icon" />
            }
            className="btn-transparent btn-svgpair btnsvg-larger"
            onClick={handleTheme}
          />
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;


/*
patterns: 
1.) copy to clipboard button
import copyToClipboard from "../../utils/copyToClipboard";
import { IoCopyOutline } from "react-icons/io5";
<Tooltip content="copy">
  <Button
    title={<IoCopyOutline />}
    className="btn-transparent btn-svgpair"
    onClick={() => copyToClipboard()}
  />
</Tooltip>
*/