import React from 'react';
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Main(props) {

	const currentUser = React.useContext(CurrentUserContext);

	return (
		<main className="content">
			<section className = "profile">
				<img className = "profile__avatar" src={currentUser.avatar} alt="портрет" />
				<button onClick={props.onEditAvatar} className = "profile__avatar-overlay" type="button" aria-label="Редактировать аватар"></button>
				<h1 className = "profile__name">{currentUser.name}</h1>
				<button onClick={props.onEditProfile} className="profile__edit-button" type="button" aria-label="Редактировать"></button>
				<p className="profile__about">{currentUser.about}</p>
				<button onClick={props.onAddPlace} className="profile__add-button" aria-label="Добавить" type="button"></button>
			</section>
			
			<section className="places">
				<ul className="places__list">
					{props.cards.map((card) => { return (
						<Card onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onCardClick={props.onCardClick} key={card._id} card={card} />
					)})}
				</ul>
			</section>
		</main>
	)	
}
export default Main;