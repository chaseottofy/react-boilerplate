import "../../styles/SvgInput.css";
import PropTypes from "prop-types";
/**
 * SvgInput
 * @example
  import { AiOutlineSearch } from "react-icons/ai";
  <SvgInput 
    svg={ <AiOutlineSearch /> } 
    input= { <Input type="text" /> } 
  />
*/
const SvgInput = ({ svg, input }) => {
  return (
    <div className="svg-input">
      {input}
      {svg}
    </div>
  );
};

SvgInput.propTypes = {
  svg: PropTypes.element.isRequired,
  input: PropTypes.element.isRequired
};
export default SvgInput;