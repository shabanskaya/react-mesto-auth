import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import React from 'react';

function EditProfilePopup(props) {

	const [name, setName] = React.useState('');
	const [description, setDescription] = React.useState('');
	const currentUser = React.useContext(CurrentUserContext);
	React.useEffect(() => {
		if (currentUser !== null && currentUser !== undefined) {
			currentUser.name !== undefined && setName(currentUser.name);
    	currentUser.about !== undefined && setDescription(currentUser.about);
		}
	}, [currentUser, props.isOpen]); 

	function handleNameChange(e) {
		setName(e.target.value);
	}
	function handleDescriptionChange(e) {
		setDescription(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.onUpdateUser({
			name,
			about: description,
		});
	} 
	return (
		<PopupWithForm onSubmit = {handleSubmit} onClose={props.onClose} isOpen = {props.isOpen} name="edit" title="Редактировать профиль" button="Сохранить">
			<input onChange={handleNameChange} className="popup__input popup__input_content_name" type="text" value={name} id="name-input" name="name" required minLength="2" maxLength="40" />
			<span className="name-input-error popup__input-error"></span>
			<input onChange={handleDescriptionChange}  className="popup__input popup__input_content_job" type="text" value={description} id="job-input" name="about" required minLength="2" maxLength="200" />
			<span className="job-input-error popup__input-error"></span>
		</PopupWithForm>
	)	
}
export default EditProfilePopup