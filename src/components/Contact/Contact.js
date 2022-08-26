import React, { useEffect } from "react";
import './Contact.css'
import contactHeader from '../../images/contactHeader.png'


export const ContactForm = () => {

  const AttachScript = (scriptName) => {
    const script = document.createElement("script")
    script.src = scriptName
    document.body.appendChild(script)
  }

  const ClearScripts = () => {
    Array.from(document.getElementsByTagName('script')).forEach(elem => elem.remove())
  }

  useEffect(() => {
    ClearScripts()
    AttachScript("https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js")
    AttachScript("https://unpkg.com/sweetalert/dist/sweetalert.min.js")
    AttachScript("//cdn.jsdelivr.net/npm/sweetalert2@10")
    AttachScript("email.js")
  }, [])

  return (
    <div className="contact" id="contactWrapper">
      <div id="subWrapper">
        <div id="headerWrapper">
          <h1 id="contactHeader">Contact Me</h1>
          <hr id="contactLine"/>
        </div>

        <div id="formWrapper">
          <div>
            <label htmlFor="name">Name: </label>
            <br/>
            <input className="formInput" type="text" id="name" required />
          </div>
          <div>
            <label htmlFor="user_email">Email: </label>
            <br/>
            <input className="formInput" type="email" id="user_email" required />
          </div>
          <div>
            <label htmlFor="subject">Subject: </label>
            <br/>
            <textarea className="formInput" id="subject" required />
          </div>
          <div>
            <label htmlFor="message">Message: </label>
            <br/>
            <textarea className="formMessage" id="message" required />
          </div>
          <button className="button-13" id="submitBtn">Submit</button>
        </div>

      </div>
    </div>
  );
};