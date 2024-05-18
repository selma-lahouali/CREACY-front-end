import { useEffect, useState } from "react";
import "./Notifications.css";

const FailNotification = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    visible && (
      <div className="notification-container">
        <div className="failNotification fail fadeIn">
          <p>{message}</p>
        </div>
      </div>
    )
  );
};

export default FailNotification;
