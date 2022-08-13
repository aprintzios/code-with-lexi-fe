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
import CreateSessions from './components/CreateSessions/CreateSessions';

export default class App extends React.Component {

  state = {
    user: null,
  }

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData })
  }

  handleLogOut = () => {
    localStorage.removeItem('token')
    this.setState({ user: null })
  }

  grabUserData = () => {
    let token = localStorage.getItem('token')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // decode token
      if (payload.exp < Date.now() / 1000) {  // Check if our token is expired, and remove if it is (standard/boilerplate)
        localStorage.removeItem('token');
        token = null;
      } else { // token not expired! our user is still 'logged in'. Put them into state.
        let userDoc = payload.user // grab user details from token
        console.log("payload.user", payload.user);
        this.setState({ user: userDoc })
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
              <Tutoring />
              <InfoLeft pic={feInfo} content={feContent} />
              <InfoRight pic={beInfo} content={beContent} btn={'Book Now'} />
              <InfoLeft pic={csInfo} content={csContent} />
              <About pic={aboutPic} content={aboutContent} btn={'Contact Me'} bgColor={'#FAE6FF'} />
              {/* <About pic={aboutPic} content={aboutContent}/> */}
            </div>
          } />

          < Route path='/book' element={
            <BookNow />
          } />

          {this.state.user && this.state.user.isAdmin ? 
            <Route path='/createSessions' element={
              <CreateSessions/>
            }/>
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

      </div>
    );
  }
}