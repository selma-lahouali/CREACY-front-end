import { useState, useEffect } from "react";
import "./DarkLightMode.css";

const DarkLightMode = () => {
  const [theme, setTheme] = useState("light");

  const handleChange = (e) => setTheme(e.target.checked ? "dark" : "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      {/* vdfv bv bv bf */}
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
