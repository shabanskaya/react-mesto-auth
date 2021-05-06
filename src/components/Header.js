import { Link } from "react-router-dom";

function Header(props) {
  
	return (
		<header className = "header">
			<a href="/" className="header__logo" target="_self"></a>
			<div className="header__nav-container">
				<Link to="/" className="header__link">{props.email}</Link>
				<a onClick={props.onClick} className="header__link">{props.linkText}</a>
			</div>
			
		</header>
	)	
}
export default Header