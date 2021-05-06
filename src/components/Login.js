
function Login(props) {

	return (
		<div className="login">
			<form className="login__form">
				<h2 className="login__title">Вход</h2>
				<input type="email" className="login__input" placeholder="Email" />
				<input type="email" className="login__input" placeholder="Пароль" />
				<button type="submit" className="login__entry-button">Войти</button>
			</form>
		</div>
	)	
}
export default Login;