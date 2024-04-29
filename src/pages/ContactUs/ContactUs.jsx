import { useRef } from "react";
import emailjs from "emailjs-com";
import "./ContactUs.css";
const ContactUs = () => {
  const formRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        // service ID FROM EMAIL SERVICE
        "service_caf1mlh",
        // template ID FROM EMAIL template
        "template_wboh6nt",
        // public key from account
        formRef.current,
        "I29Z7G8tFAi6eRmzN"
      );
      formRef.current.reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="contactUs-form" ref={formRef} onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          required
          placeholder="Enter your email"
          name="email"
        />
        <label>Message</label>
        <textarea
          type="text"
          required
          placeholder="Ynter your message"
          name="message"
        />
        <button type="submit">envoyer</button>
      </form>
    </>
  );
};

export default ContactUs;
