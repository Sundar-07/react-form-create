import React, { useEffect } from "react";

function Alerts({ type, msg, removeAlert }) {

  //clearing alerts
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert();
    }, 3500);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <>
      <div className="container">
        <div className={`alert alert-${type}`} role="alert">
          {msg}
        </div>
      </div>
    </>
  );
}

export default Alerts;
