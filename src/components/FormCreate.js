import React, { useState, useEffect } from "react";
import Alerts from "../Alerts/Alerts";
import { Country, State, City } from "country-state-city";

function Sample() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [fromCities, setFromCities] = useState([]);
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");

  const [selectedCountries, setSelectedCountries] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
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
  const handleErrorsAll = name && email && mobile && state && message;

  // match email validation

  const validateEmail = (email) => {
    const reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    return reEmail;
  };

  //country-states-cities handle by using package
  const countryList = Country.getAllCountries();
  const stateList = State.getAllStates();
  const citiesList = City.getAllCities();

  const handleFromCountries = (e) => {
    const st = stateList.filter(
      (state) => state.countryCode === e.target.value
    );
    console.log("**state", st);
    setState(st);
    //country selected value
    setSelectedCountries(e.target.value);
  };

  const handleFromState = (e) => {
    const ct = citiesList.filter((city) => city.stateCode === e.target.value);
    console.log("**city", ct);
    setFromCities(ct);
    //state selected value
    setSelectedState(e.target.value);
  };

  //form submission

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!handleErrorsAll) {
      showAlert(true, "danger", "Should not be an empty input.Please check! ");
    } else if (!validateEmail(email)) {
      showAlert(true, "danger", "Invalid Email Address! Please check");
    } else if (mobile.length > 10 || mobile.length < 10) {
      showAlert(
        true,
        "danger",
        "Mobile number must be in 10 digits! Please check"
      );
    } else if (message.length > 100) {
      showAlert(
        true,
        "danger",
        "Message has exceeded the maximum number of words!"
      );
    } else if (!selectedCountries || !selectedCity || !selectedState) {
      showAlert(
        true,
        "danger",
        "Please select the dropdown! Should not be an empty"
      );
    } else {
      // console.log({
      //   name,
      //   email,
      //   mobile,
      //   selectedCountries,
      //   selectedState,
      //   selectedCity,
      //   message,
      // });

      const data = {
        Name: name,
        Email_ID: email,
        Mobile_No: mobile,
        Country: selectedCountries,
        State: selectedState,
        City: selectedCity,
        Message: message,
      };

      const CardBoard = (
        <>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Name:</b> {data.Name}
            </li>
            <li className="list-group-item">
              <b>Email_ID:</b> {data.Email_ID}
            </li>
            <li className="list-group-item">
              <b>Mobile_No:</b> {data.Mobile_No}
            </li>
            <li className="list-group-item">
              <b>Country:</b> {data.Country}
            </li>
            <li className="list-group-item">
              <b>State:</b> {data.State}
            </li>
            <li className="list-group-item">
              <b>City:</b> {data.City}
            </li>
            <li className="list-group-item">
              <b>Message:</b> {data.Message}
            </li>
          </ul>
        </>
      );

      showAlert(true, "success", CardBoard);
        //auto clear
      setName("");
      setEmail("");
      setMobile("");
      setSelectedCity([]);
      setSelectedState([]);
      setSelectedCountries([]);
      setMessage("");
    }
  };

  const clearRespomse = (e) => {
    e.preventDefault();

    setName("");
    setEmail("");
    setMobile("");
    setSelectedCity([]);
    setSelectedState([]);
    setSelectedCountries([]);
    setMessage("");
    showAlert(true, "success", "Cleared !!");
  };

  // useEffect(() => {
  //   // const countriesAll = Country.getAllCountries()
  //   // console.log(State.getAllStates())
  //   // console.log(City.getAllCities())
  // }, [])

  return (
    <>
      <form>
        {/* //alerts  */}
        {alert.show && <Alerts {...alert} removeAlert={showAlert} />}
        {/* End of alerts  */}

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
              value={name}
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
              value={email}
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
              value={mobile}
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
              onChange={(e) => handleFromCountries(e)}
              aria-label="Default select example"
              value={selectedCountries}
            >
              <option>Select Country</option>
              {countryList &&
                countryList.map((country, key) => (
                  <option
                    key={key}
                    title={country.name}
                    value={country.isoCode}
                  >
                    {country.name}
                  </option>
                ))}
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
              onChange={(e) => handleFromState(e)}
              aria-label="Default select example"
              value={selectedState}
            >
              <option>Select State</option>
              {state &&
                state.map((state, key) => (
                  <option key={key} title="" value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
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
              onChange={(e) => setSelectedCity(e.target.value)}
              value={selectedCity}
            >
              <option>Select City</option>
              {fromCities &&
                fromCities.map((city, key) => (
                  <option key={key} title="" value={city.stateCode}>
                    {city.name}
                  </option>
                ))}
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
              value={message}
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <div className="col-auto">
            <button className="btn btn-danger" onClick={clearRespomse}>
              Clear response
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Sample;
