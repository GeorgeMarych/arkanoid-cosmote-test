import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import swal from "sweetalert";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [error, setError] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    regex.test(e.target.value) ? setEmailValid(true) : setEmailValid(false);
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      swal({
        title: "ΠΑΡΑΚΑΛΩ ΕΛΕΓΞΤΕ \n" + "ΤΟ EMAIL ΣΑΣ",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn purple-btn",
        },
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      emailValid &&
        swal({
          title: "ΤΟ EMAIL ΑΥΤΟ ΔΕΝ\n" + "ΕΙΝΑΙ ΚΑΤΑΧΩΡΗΜΕΝΟ",
          text: "Παρακαλούμε εισάγετε το email με το οποίο λάβατε μέρος στην προηγουμένη φάση",
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn purple-btn",
          },
        });
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
          <h1 className="page-title">ΑΝΑΚΤΗΣΗ ΚΩΔΙΚΟΥ</h1>

          <div className="login-form">
            <div className="register-text">
              <p>
                Εισάγετε το Email σας
                <br />
                για να ανακτήσετε τον κωδικό σας
              </p>
            </div>
            <form onSubmit={handleSubmit} id="loginForm" className="loginForm">
              <div className="form-input-group login-form-group">
                <div className="email input-container">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={handleChange}
                    id="email"
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Πχ. johndoe@cosmote.gr"
                  />
                  {emailValid === null ? (
                    <></>
                  ) : (
                    !emailValid && (
                      <div className="error-message    error-email">
                        Το email δεν είναι έγκυρο
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="submit-container">
                <button type="submit" className="btn yellow-btn">
                  ΑΝΑΚΤΗΣΗ
                </button>
                <Link to="/login">Είσοδος</Link>
                <Link to="/register">Δημιουργία Λογαριασμού</Link>
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
      </div>
      {/* <div id="termsModal" className="modal">
        {<!-- Modal content --> 
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
  );
};

export default ForgotPassword;
