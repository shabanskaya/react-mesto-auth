import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup(props) {

	const avatarRef = React.useRef({});

	function handleSubmit(e) {
		e.preventDefault();
		props.onUpdateUser({
			avatar: avatarRef.current.value
		});
		avatarRef.current.value = ''
	} 

	return (
		<PopupWithForm onSubmit = {handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name="avatar" title="Обновить аватар" button="Сохранить">
			<input ref={avatarRef} className="popup__input popup__input_content_avatar" type="url" id="avatar-input" placeholder="Ссылка на аватар" name="avatar" required />
			<span className="avatar-input-error popup__input-error"></span>
		</PopupWithForm>
	)	
}
export default EditAvatarPopup