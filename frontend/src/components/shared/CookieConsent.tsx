import React, { useState, useEffect } from "react";

const COOKIE_KEY = "cookie_consent_accepted";

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: 0,
        right: 0,
        zIndex: 2000,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        className="shadow rounded bg-dark text-white px-4 py-3"
        style={{
          maxWidth: 420,
          width: "90%",
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span>
          This site uses cookies to enhance your experience and maintain your session. By continuing, you accept our use of cookies.
        </span>
        <button
          className="btn btn-primary btn-sm"
          onClick={acceptCookies}
          style={{ whiteSpace: "nowrap" }}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
