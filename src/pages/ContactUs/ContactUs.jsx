import { useRef } from "react";
import emailjs from "emailjs-com";
import "./ContactUs.css";
import SideBar from "../../components/SideBar/SideBar";
const ContactUs = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const formRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        // service ID FROM EMAIL SERVICE / service ID FROM EMAIL SERVICE
        "service_caf1mlh",
        // template ID FROM EMAIL template / service ID FROM EMAIL SERVICE
        "template_wboh6nt",
        // public key from account / service ID FROM EMAIL SERVICE
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
      <SideBar></SideBar>
      <div className="contactUs">
        <div className="contactUs-intro">
          <h1>CONTACT US : </h1>
          <p>
            Have questions, feedback, or inquiries? We&apos;re here to help! Contact
            us using the iform below, and our team will get back to you as soon
            as possible.
          </p>
          <p>
            Feel free to reach out to us for assistance with orders, product ,
            or any other queries you may have. Your satisfaction is our
            priority, and we look forward to hearing from you!
          </p>
        </div>
        <form className="contactUs-form" ref={formRef} onSubmit={handleSubmit}>
          <label>Email : </label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            name="email"
            defaultValue={user.email}
          />
          <label>Your Message :</label>
          <textarea
            type="text"
            required
            placeholder="Please Enter your message"
            name="message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
