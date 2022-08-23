import React, { useEffect } from "react";
import './Contact.css'

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
      <div id="contactWrapper"> 
          <div id="contactLeft">
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" required />
            </div>
            <div>
                <label htmlFor="user_email">Email:</label>
                <input type="email" id="user_email" required />
            </div>
            <div>
                <label htmlFor="subject">Subject:</label>
                <textarea id="subject" required />
            </div>
            <div>
                <label htmlFor="message">Message:</label>
                <textarea id="message" required />
            </div>
            <button id="submitBtn">Submit</button>
        </div>
    </div>
  );
};