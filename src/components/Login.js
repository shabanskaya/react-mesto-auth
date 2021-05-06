import { useHistory} from "react-router-dom";
import React from "react";
import { login } from "../auth";

function Login(props) {
	const [inputValues, setInputValues] = React.useState({password: '', email: ''})
	const [token, setToken] = React.useState("");
	const history = useHistory();

	React.useEffect((() => {
		if (token) {
			props.onLogin(inputValues.email, token);
			setInputValues({username: '', password: ''})
		}
	}), [token]) 

	function handleChange (e) {
    const {name, value} = e.target;
    setInputValues({...inputValues,
      [name]: value 
    });
  }

	function handleSubmit(e) {
		e.preventDefault();
		let { password, email } = {...inputValues};
    login(password, email).then((data) => {
				if (data?.token){
					setToken(data.token)
				} else {
					props.onResult("error")
				}
			})
	}
	
	return (
	
		<div className="login">
			<form onSubmit={handleSubmit} className="login__form">
				<h2 className="login__title">Вход</h2>
				<input onChange={handleChange} name="email" value={inputValues.email} type="email" className="login__input" placeholder="Email" />
				<input onChange={handleChange} name="password" value={inputValues.password} type="password" className="login__input" placeholder="Пароль" />
				<button type="submit" className="login__entry-button">Войти</button>
			</form>
		</div>
	
	)	
}
export default Login;