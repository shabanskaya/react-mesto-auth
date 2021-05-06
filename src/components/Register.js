import {Link} from "react-router-dom";
import React from "react";
import { register } from "../auth";

function Register(props) {

	const [inputValues, setInputValues] = React.useState({password: '', email: ''})
	const [status, setStatus] = React.useState("");

	React.useEffect((() => {
		if (status==="ok") {
			props.onRegister()
		}
	}), [status])

	function handleChange (e) {
    const {name, value} = e.target;
    setInputValues({...inputValues,
      [name]: value 
    });
  }

	function handleSubmit(e) {
		e.preventDefault();
		let { password, email } = {...inputValues};
      register(password, email).then((res) => {
        if(!res.message){
          setStatus("ok")
        } else {
					props.onResult("error");
          setStatus("error")	
        }
      });
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