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
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute'
import Login from './Login'
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { checkToken, register, login } from '../auth.js';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [loggedIn, setLoggedIn] = React.useState(false)
  const history = useHistory();
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState("")
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)

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
    	}).catch((err) => console.log(err));
		} else {
			api.deleteLike(card._id).then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
			}).catch((err) => console.log(err));
		}
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id).then((newCard) => {
			setCards((state) => state.filter((c) => c._id !== card._id));
		}).catch((err) => console.log(err));
	}

	React.useEffect((() => {
    api.getUserInfo()
			.then((userData) => {
				setCurrentUser(userData);
			}).catch((err) => {console.log(err)})
    tokenCheck();
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
    setIsInfoTooltipOpen(false)
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

  function moveToRegister() {
    history.push('/sign-up');
  }

  function moveToLogin() {
    history.push('/sign-in');
  }

  function onRegister(password, email) {
    register(password, email).then((res) => {
      if(!res.message && !res.error){
        moveToLogin()
        handleOpenInfo("ok")
      } else {
        handleOpenInfo("error")	
      }
    }).catch((err) => console.log(err));    
  }

  function onLogin (password, email) {
    login(password, email).then((data) => {
      if (data?.token){
        localStorage.setItem('jwt', data.token)
        setLoggedIn(true);
        setEmail(email);
        history.push('/');
      } else {
        handleOpenInfo("error")	
      }
    }).catch((err) => console.log(err));

    
  }

  function signOut() {
    localStorage.removeItem('jwt');
    moveToLogin()
    setLoggedIn(false)
  }

  function tokenCheck () {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      checkToken(jwt).then((res) => {
        if (res?.data?.email){
          setLoggedIn(true);
          history.push("/");
          setEmail(res.data.email)
        }
      }).catch((err) => console.log(err)); 
    }
  } 

  function handleOpenInfo(status) {
    setStatus(status)
    setIsInfoTooltipOpen(true)
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Switch>
            
            <Route path="/sign-in">
              <Header onClick={moveToRegister} linkText="Регистрация"/>
              <Login onLogin={onLogin}/>
            </Route>

            <Route path="/sign-up">
              <Header onClick={moveToLogin} linkText="Войти"/>
              <Register onRegister={onRegister}/>

            </Route>

            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              <Header email={email} linkTo="/sign-in" onClick={signOut} linkText="Выйти"/>
              <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}/>
              <Footer />
              <EditProfilePopup onUpdateUser={handleUpdateUser} onClose={closeAllPopups} isOpen = {isEditProfilePopupOpen} />
              <AddPlacePopup onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} isOpen = {isAddPlacePopupOpen} />
              <EditAvatarPopup onUpdateUser={handleUpdateAvatar} onClose={closeAllPopups} isOpen = {isEditAvatarPopupOpen} />
              <PopupWithForm name="confirm" title="Вы уверены?" button="Да" />
              <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
            </ProtectedRoute>

            <Route path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>

          </Switch>
          <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} status={status} />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
