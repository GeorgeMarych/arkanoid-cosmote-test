import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";

const SignIn = () => {
  const [timesPlayed, setTimesPlayed] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = UserAuth();

  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const [formDataVal, setFormDataVal] = useState({
    password: null,
    email: null,
  });
  const testValidation = (value, name) => {
    switch (name) {
      case "email":
        //need to add validation
        const regex =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        regex.test(value) ? validate(true, name) : validate(false, name);
        break;
      default:
      // code block
    }
  };

  const validate = (value, name) => {
    setFormDataVal({
      ...formDataVal,
      [name]: value,
    });
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    testValidation(evt.target.value, evt.target.name);
    setFormData({
      ...formData,
      [evt.target.name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // timesPlayed < 5 ? navigate("/account") : navigate("/gameover");
      navigate("/account");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <header className="header">
          <div className="header-left">
            <img
              src="assets/images/cosmote_logo.png"
              alt="Cosmote Logo"
              className="cosmote-logo"
            />
          </div>
          <div className="header-center">
            <img
              src="assets/images/metacnic22-header.png"
              alt="Metacnic Logo"
              className="metacnic-logo"
            />
          </div>
          <div className="header-right">
            <img
              src="assets/images/germanos_logo.png"
              alt="Germanos Logo"
              className="germanos-logo"
            />
          </div>
        </header>
        <section className="mainContent">
          <h1 className="page-title">ΕΙΣΟΔΟΣ</h1>
          <div className="login-form">
            <form onSubmit={handleSubmit} id="loginForm" className="loginForm">
              <div className="form-input-group login-form-group">
                <div className="email input-container">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={handleChange}
                    id="email"
                    type="text"
                    name="email"
                    value={formData.email}
                    placeholder="Πχ. johndoe@cosmote.gr"
                  />
                  {formDataVal.email === null ? (
                    <></>
                  ) : (
                    !formDataVal.email && (
                      <div className="error-message error-email">
                        Το email δεν είναι έγκυρο
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="form-input-group login-form-group">
                <div className="password input-container">
                  <label htmlFor="password">Κωδικός</label>
                  <input
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="*********"
                    value={formData.password}
                  />
                  {error.length > 0 && (
                    <div className="error-message error-password">
                      Ο κωδικός είναι λανθασμένος ή δεν υπάρχει λογαριασμός
                    </div>
                  )}
                </div>
              </div>
              <div className="form-input-group login-form-group forgot-password-container">
                <Link to="/resetpassword" className="underline">
                  Ξέχασα τον κωδικό μου
                </Link>
              </div>
              <div className="submit-container">
                <button type="submit" className="btn yellow-btn">
                  LOGIN
                </button>
                <Link to="/register" className="underline">
                  Δημιουργία Λογαριασμού
                </Link>
              </div>
            </form>
          </div>
        </section>
        <footer className="footer">
          <div className="footer-left">
            <img
              src="assets/images/cosmopop.png"
              alt=""
              className="footer-left-img"
            />
          </div>
          {/* <div className="footer-right">
            <a href="#" className="footer-terms small-link termsLink">
              Όροι και προϋποθέσεις
            </a>
          </div> */}
        </footer>
        {/* <div id="termsModal" className="modal">
           <!-- Modal content --> 
          <div className="modal-content">
            <span className="close">&times;</span>
            <div className="iframe-container">
              <iframe
                src="assets/terms/terms.html"
                frameBorder="0"
                className="terms-iframe"
              ></iframe>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SignIn;
