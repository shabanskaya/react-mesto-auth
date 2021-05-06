import { Link } from "react-router-dom";

function Header(props) {
	return (
		<header className = "header">
			<a href="#" className="header__logo" target="_self"></a>
			<div className="header__nav-container">
				<Link className="header__link" to={props.linkTo}>{props.linkText}</Link>
			</div>
			
		</header>
	)	
}
export default Header