function InfoTooltip(props) {
	const titleOk = "Вы успешно зарегистрировались!"
	const titleError = `Что-то пошло не так! Попробуйте ещё раз.`
	return (
		<div className={`popup popup_feature_info ${(props.isOpen)?"popup_opened":""}`}>
			<div className="popup__container">
				<div className = "popup__form" name="infoform">
					<div className={`popup__info-pic ${(props.status==="ok")?"popup__info-pic_status_ok":"popup__info-pic_status_error"}`}></div>
					<h2 className={"popup__title popup__title_feature_info"}>{props.status==="ok"?titleOk:titleError}</h2>
				</div>
				<button onClick={props.onClose} className="popup__close-button" type="button" aria-label="Закрыть"></button>
			</div>
		</div>
	)	
}
export default InfoTooltip;