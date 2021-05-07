import { Link } from "react-router-dom";

function Header(props) {
  
	return (
		<header className = "header">
			<Link href="/" className="header__logo" target="_self"></Link>
			<div className="header__nav-container">
				<Link to="/" className="header__link">{props.email}</Link>
				<button onClick={props.onClick} className="header__link">{props.linkText}</button>
			</div>
			
		</header>
	)	
}
export default Header