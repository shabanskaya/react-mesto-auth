function ImagePopup(props) {
	return (
		<div className = {`popup popup_feature_fullview ${props.isOpen?'popup_opened':''}`} >
			<div className="popup__pic-container">
				<img className="popup__pic" src={props.card.link} alt={props.card.name} />
				<h2 className="popup__subtitle">{props.card.name}</h2>
				<button onClick={props.onClose} className="popup__close-button" type="button" aria-label="Закрыть"></button>
			</div>
		</div>	
	)	
}
export default ImagePopup;