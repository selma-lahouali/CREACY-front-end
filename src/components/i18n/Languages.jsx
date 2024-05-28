import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Languages.css";

const LanguageSelector = () => {
  const [languageOptions, setLanguageOptions] = useState(false);
  const { i18n } = useTranslation();

  const toggleLanguageOptions = () => {
    setLanguageOptions(!languageOptions);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
    setLanguageOptions(false);
  };

  return (
    <div className="language" onClick={toggleLanguageOptions}>
      {!languageOptions && <h1>{i18n.language.toUpperCase()}</h1>}
      {languageOptions && (
        <ul>
          <li>
            <button onClick={() => changeLanguage("en")}>EN</button>
          </li>
          <li>
            <button onClick={() => changeLanguage("fr")}>FR</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
