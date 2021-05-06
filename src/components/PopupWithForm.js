function PopupWithForm(props) {
	return (
		<div className={`popup popup_feature_${props.name} ${(props.isOpen)?"popup_opened":""}`}>
			<div className="popup__container">
				<form onSubmit={props.onSubmit} className = "popup__form" name={`${props.name}form`}>
					<h2 className={`popup__title${props.name==="confirm"?" popup__title_feature_confirm":""}`}>{props.title}</h2>
						{props.children}
					<button className="popup__save-button" type="submit">{props.button}</button>
				</form>
				<button onClick={props.onClose} className="popup__close-button" type="button" aria-label="Закрыть"></button>
			</div>
		</div>
	)	
}
export default PopupWithForm;