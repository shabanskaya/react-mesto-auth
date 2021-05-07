import {Link} from "react-router-dom";
import React from "react";
import { register } from "../auth";

function Register(props) {

	const [inputValues, setInputValues] = React.useState({password: '', email: ''})

	function handleChange (e) {
    const {name, value} = e.target;
    setInputValues({...inputValues,
      [name]: value 
    });
  }

	function handleSubmit(e) {
		e.preventDefault();
		const { password, email } = {...inputValues};
		props.onRegister(password, email);
	}

	return (
		<div className="login">
			<form onSubmit={handleSubmit} className="login__form">
				<h2 className="login__title">Регистрация</h2>
				<input onChange={handleChange} name="email" value={inputValues.email} type="email" className="login__input" placeholder="Email" />
				<input onChange={handleChange} name="password" value={inputValues.password} type="password" className="login__input" placeholder="Пароль" />
				<button type="submit" className="login__entry-button">Зарегистрироваться</button>
			</form>
			<Link className="login__link" to="/sign-in" >Уже зарегистрированы? Войти</Link>
		</div>
	)	
}
export default Register;