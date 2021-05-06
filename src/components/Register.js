import {Link} from "react-router-dom";

function Register(props) {

	return (
		<div className="login">
			<form className="login__form">
				<h2 className="login__title">Регистрация</h2>
				<input type="email" className="login__input" placeholder="Email" />
				<input type="password" className="login__input" placeholder="Пароль" />
				<button type="submit" className="login__entry-button">Зарегистрироваться</button>
			</form>
			<Link className="login__link" to="/sign-in" >Уже зарегистрированы? Войти</Link>
		</div>
	)	
}
export default Register;