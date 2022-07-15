import React, { useState } from "react";
import Alerts from "../Alerts/Alerts";


function FormCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");

  //errors alert

  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  //passing alerts
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  // should not be an empty input values
  const handleErrorsAll =
    name || email || mobile || country || city || state || message;

  // match validation

  const validateEmail = (email) => {
    const reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    return reEmail;
  };

  //countries states and cities lists
  const handleFromCountries = (e) => {
    const country = countriesList.find(
      (country) => country.name === e.target.value
    );
    setCountry(country.name);
    setCity(country.cities);
  };

  //form submission

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      showAlert(true, "danger", "Invalid Email Address!");
    } else if (mobile.length > 10 || mobile.length < 10) {
      showAlert(true, "danger", "Mobile number must be in 10 digits!");
    } else if(message.length > 100){
        showAlert(true, "danger", "Message has exceeded the maximum number of words!");
    } else if(!handleErrorsAll){
        showAlert(true, "danger", "Input should not be an empty! Please check");
    }
    else {
      showAlert(false);
      console.log({
        name,
        email,
        mobile,
        country,
        city,
        state,
        message,
      });

      console.log(countriesList)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {alert.show && <Alerts {...alert} />}

        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email ID
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter your Email ID"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="mob_no" className="col-sm-2 col-form-label">
            Mobile No:
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="mob_no"
              placeholder="Enter your mobile number"
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="country" className="col-sm-2 col-form-label">
            Country:
          </label>
          <div className="col-sm-10">
            <select
              className="form-select"
              onChange={(e) => setCountry(e.target.value)}
              aria-label="Default select example"
            >
              <option>Select Country</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="city" className="col-sm-2 col-form-label">
            City:
          </label>
          <div className="col-sm-10">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setCity(e.target.value)}
            >
              <option>Select City</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="state" className="col-sm-2 col-form-label">
            State:
          </label>
          <div className="col-sm-10">
            <select
              className="form-select"
              onChange={(e) => setState(e.target.value)}
              aria-label="Default select example"
            >
              <option>Select State</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="message" className="col-sm-2 col-form-label">
            Message:
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="message"
              rows="3"
              placeholder="Enter your message: (100 words)"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormCreate;
