import { useState } from "react";
import "./DarkLightMode.css";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const DarkLightMode = ({ onToggle }) => {
  const [theme, setTheme] = useState("dark");
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    onToggle(newTheme);
  };

  return (
    <>
      <button className="dark-light-mode" onClick={toggleTheme}>
        {theme === "dark" ? (
          <MdDarkMode className="darkMode" />
        ) : (
          <MdLightMode className="lightMode" />
        )}
      </button>
    </>
  );
};

export default DarkLightMode;
