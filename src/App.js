import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
//components
import Headliner from './components/Headliner/Headliner';
import Tutoring from './components/Tutoring/Tutoring';
import InfoLeft from './components/InfoLeft/InfoLeft';
import InfoRight from './components/InfoRight/InfoRight';
import About from './components/About/About';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { Protected } from './components/Protected/Protected';

//images
import feInfo from './images/feInfo.png'
import feContent from './images/feContent.png'
import beInfo from './images/beInfo.png'
import beContent from './images/beContent.png'
import csInfo from './images/csInfo.png'
import csContent from './images/csContent.png'
import aboutPic from './images/aboutPic.png'
import aboutContent from './images/aboutContent.png'
import React from 'react';
import BookNow from './components/BookNow/BookNow';
import ManageSessions from './components/ManageSessions/ManageSessions';
import CreateSessions from './components/CreateSessions/CreateSessions';
import { ContactForm } from './components/Contact/Contact';

export default class App extends React.Component {

  state = {
    user: null,
    isLoggedIn: false
  }

  AttachScript(scriptName){
    const script = document.createElement("script")
    script.src = scriptName
    // script.async = true
    script.defer = true
    document.body.appendChild(script)
  }

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData, isLoggedIn: true })
  }

  handleLogOut = () => {
    localStorage.removeItem('token')
    this.setState({ user: null, isLoggedIn: false })
  }

  grabUserData = () => {
    let token = localStorage.getItem('token')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // decode token
      if (payload.exp < Date.now() / 1000) {  // Check if our token is expired, and remove if it is (standard/boilerplate)
        localStorage.removeItem('token');
        token = null;
        this.setState({ user: null, isLoggedIn: false })
      } else { // token not expired! our user is still 'logged in'. Put them into state.
        let userDoc = payload.user // grab user details from token
        this.setState({ user: userDoc, isLoggedIn: true })
      }
    }
  }


  componentDidMount = () => {
    this.grabUserData();
  }

  render() {
    return (
      <div className='App'>
        <Navbar handleLogOut={this.handleLogOut} user={this.state.user} />
        <Routes>
          <Route path='/' element={
            <div className='main-container'>
              <Headliner />
              <Tutoring id='tutoring'/>
              <InfoLeft id={'feInfo'} pic={feInfo} user={this.state.user} content={feContent} />
              <InfoRight id={'beInfo'} pic={beInfo} user={this.state.user} content={beContent} btn={'Book Now'} />
              <InfoLeft id={'csInfo'} pic={csInfo} user={this.state.user} content={csContent} />
              <About id='about' pic={aboutPic} content={aboutContent} user={this.state.user} btn={'Contact Me'} bgColor={'#FAE6FF'} />
              <ContactForm></ContactForm>
            </div>
          } />

          < Route path='/book' element={
             <Protected isLoggedIn={this.state.isLoggedIn}>
                <BookNow user={this.state.user} id='book' />
             </Protected>
          } />

          {this.state.user && this.state.user.isAdmin ? 
            <>    
              <Route path='/manage' element={
                <Protected isLoggedIn={this.state.isLoggedIn}>
                  <ManageSessions/>
                </Protected>
              }/>
              <Route path='/create' element={
                <Protected isLoggedIn={this.state.isLoggedIn}>
                  <CreateSessions/>
                </Protected>
              }/>
            </>
            :
            <></>
  }
          {this.state.user ?
            <></>
            :
            <>
              <Route path='/login' element={
                <Login setUserInState={this.setUserInState} />
              } />
              <Route path='/signup' element={
                <Signup setUserInState={this.setUserInState} />
              } />
              <Route path="/redirect" element={<Navigate to="/signup" />} />
            </>
          }
        </Routes>
          <input type="hidden" value={this.state.isLoggedIn} id="isLoggedIn"/>
      </div>
    );
  }
}