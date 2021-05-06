import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup(props) {

	const [name, setName] = React.useState('');
	const [url, setUrl] = React.useState('');

	function handleNameChange(e) {
		setName(e.target.value);
	}
	function handleUrlChange(e) {
		setUrl(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.onAddPlace({
			name, 
			link: url
		});
		setName('')
		setUrl('')
	} 
	return (
		<PopupWithForm onSubmit = {handleSubmit} onClose={props.onClose} isOpen = {props.isOpen} name="add" title="Новое место" button="Создать">
			<input onChange={handleNameChange} className="popup__input popup__input_content_label" value={name} type="text" id="label-input" placeholder="Название" name="name" required minLength="2" maxLength="30" />
			<span className="label-input-error popup__input-error"></span>
			<input onChange={handleUrlChange} className="popup__input popup__input_content_link" value={url} type="url" id="link-input" placeholder="Ссылка на картинку" name="link" required />
			<span className="link-input-error popup__input-error"></span>
		</PopupWithForm>
	)	
}
export default AddPlacePopup