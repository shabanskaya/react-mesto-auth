import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from 'react';

function Card(props) {
	const currentUser = React.useContext(CurrentUserContext);
	const isOwn = props.card.owner._id === currentUser._id;
// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const isLiked = props.card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = `card__like ${isLiked?'card__like_active':''}`;
	const cardDeleteButtonClassName = (
		`card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`
	);

	function handleClick() {
		props.onCardClick(props.card);
	} 
	function handleLikeClick() {
		props.onCardLike(props.card)
	} 
	function handleDeleteClick() {
		props.onCardDelete(props.card)
	}
	return (
		<li className="card">
			<img onClick={handleClick} className="card__pic" alt={props.card.name} src={props.card.link} />
			<div className="card__info">
				<h2 className="card__title">{props.card.name}</h2>
				<div className="card__like-container">
					<button onClick ={handleLikeClick} className={cardLikeButtonClassName} aria-label="Нравится" type="button"></button>
					<span className="card__likes">{props.card.likes.length}</span>
				</div>
			</div>
			<button onClick ={handleDeleteClick} className={cardDeleteButtonClassName} aria-label="Удалить" type="button"></button>
		</li>
	)	
}
export default Card