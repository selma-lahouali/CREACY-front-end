import { useRef } from "react";
import emailjs from "emailjs-com";
import "./ContactUs.css";
import SideBar from "../../components/SideBar/SideBar";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
const ContactUs = () => {
  const { t } = useTranslation();
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
      Swal.fire({
        title: t("ContactUs.successMessageTitle"),
        text: t("ContactUs.successMessageTesxt"),
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("UserCart.failOrderText"),
      });
    }
  };
  return (
    <>
      <SideBar></SideBar>
      <div className="contactUs">
        <div className="contactUs-intro">
          <h1>{t("ContactUs.contactUs")}</h1>
          <p>
            {t("ContactUs.paragraphe1")}.
          </p>
          <p>
            {t("ContactUs.paragraphe2")}
          </p>
        </div>
        <form className="contactUs-form" ref={formRef} onSubmit={handleSubmit}>
          <label> {t("ContactUs.email")} : </label>
          <input
            type="email"
            required
            placeholder={t("ContactUs.emailPlaceholder")}
            name="email"
            defaultValue={user.email}
          />
          <label>{t("ContactUs.message")} :</label>
          <textarea
            type="text"
            required
            placeholder={t("ContactUs.messagePlaceholder")}
            name="message"
          />
          <button type="submit">{t("ContactUs.send")}</button>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
