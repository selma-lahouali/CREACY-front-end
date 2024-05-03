// DarkLightMode.js

import { useState, useEffect } from "react";
import "./DarkLightMode.css";

const DarkLightMode = () => {
  const [theme, setTheme] = useState(() => {
    // Load theme preference from local storage or default to "light"
    return localStorage.getItem("theme") || "light";
  });

  const handleChange = (e) => {
    const selectedTheme = e.target.checked ? "dark" : "light";
    setTheme(selectedTheme);
    // Store theme preference in local storage
    localStorage.setItem("theme", selectedTheme);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <div className="container-switch">
        <span></span>
        <label className="switch">
          <input
            type="checkbox"
            onChange={handleChange}
            checked={theme === "dark"}
          />
          <span className="slider"></span>
        </label>
      </div>
    </>
  );
};

export default DarkLightMode;
