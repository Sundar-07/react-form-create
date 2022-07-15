import React from "react";

function Alerts({type,msg}) {
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
