//import logo from './logo.svg';
import React from 'react';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import ImagePopup from './ImagePopup.js';
import AddPlacePopup from "./AddPlacePopup";
import api from '../utils/api'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import { Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [loggedIn, setLoggedIn] = React.useState(false)

  const [cards, setCards] = React.useState([])
	
	React.useEffect((() => {
    
		api.getInitialCards()
			.then((data) => {setCards(data)})
			.catch((err) => {console.log(err)});
	}), [])

	function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
		if (!isLiked) {
    	api.putLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    	});
		} else {
			api.deleteLike(card._id).then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
			});
		}
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id).then((newCard) => {
			setCards((state) => state.filter((c) => c._id !== card._id));
		});
	}

	React.useEffect((() => {
    api.getUserInfo()
			.then((userData) => {
				setCurrentUser(userData);
			}).catch((err) => {console.log(err)})
	}), [])
  function handleCardClick(card) {
    setIsImagePopupOpen(true)
    setSelectedCard(card)
  }
  function handleEditAvatarClick(e) {
    setIsEditAvatarPopupOpen(true)
	}
	
	function handleEditProfileClick(e) {
    setIsEditProfilePopupOpen(true)
	}
	
	function handleAddPlaceClick(e) {
    setIsAddPlacePopupOpen(true)
	}
  function closeAllPopups(e) {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false)
    setTimeout(() => {setSelectedCard({})}, 500)
  }
  function handleUpdateUser(data) {
    api.updateUserInfo(data)
      .then((dataOfUser) => {
        setCurrentUser(dataOfUser);
        closeAllPopups()
      }).catch((err) => {console.log(err)})
    
  }
  function handleUpdateAvatar(data) {
    api.updateUserAvatar(data)
      .then((dataOfUser) => {
        setCurrentUser(dataOfUser);
        closeAllPopups()
      }).catch((err) => {console.log(err)})
  }

  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups()
    }).catch((err) => {console.log(err)})
  }
  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Switch>
            <ProtectedRoute loggedIn={loggedIn}>
              <Header />
              <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}/>
              <Footer />
              <EditProfilePopup onUpdateUser={handleUpdateUser} onClose={closeAllPopups} isOpen = {isEditProfilePopupOpen} />
              <AddPlacePopup onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} isOpen = {isAddPlacePopupOpen} />
              <EditAvatarPopup onUpdateUser={handleUpdateAvatar} onClose={closeAllPopups} isOpen = {isEditAvatarPopupOpen} />
              <PopupWithForm name="confirm" title="Вы уверены?" button="Да" />
              <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
            </ProtectedRoute>

            <Route path="/sing-in">
            </Route>

            <Route path="/sing-up">
            </Route>

            <Route path="/">
              {loggedIn ? (<Redirect to="/" />) : (<Redirect to="/sign-in" />)}
            </Route>
            
          </Switch>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
