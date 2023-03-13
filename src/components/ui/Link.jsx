import "../../styles/Link.css";
import PropTypes from "prop-types";
/**
 * Link
 * @example
 * <Link
    content={
      <Button 
        title={<IoLogoGithub />}
        className="btn-transparent btn-svgpair"
      />
    }
 *  href="https://github.com/chaseottofy"
 *  title="github repo"
 * />
 */
const Link = ({
  content,
  href = "",
  title = "",
  rel = "noreferrer",
  target = "_blank",
  role = "link",
  className = "link-default",
}) => {
  return (
    <a
      href={href}
      title={title}
      rel={rel}
      target={target}
      role={role}
      className={className}
    >{content}</a>
  );
};

Link.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  href: PropTypes.string.isRequired,
  title: PropTypes.string,
  rel: PropTypes.string,
  target: PropTypes.string,
  role: PropTypes.string,
  className: PropTypes.string,
};
export default Link;