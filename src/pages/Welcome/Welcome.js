import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Welcome = () => {
  useEffect(() => {
    var modal = document.getElementById("termsModal");
    var link = document.getElementsByClassName("termsLink");
    var span = document.getElementsByClassName("close")[0];

    for (var i = 0; i < link.length; i++) {
      link[i].onclick = function () {
        modal.style.display = "block";
      };
    }

    span.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }, []);

  return (
    <div className="home">
      <div className="container">
        <header className="header">
          <div className="header-left">
            <img
              src="assets/images/cosmote_logo.png"
              alt="Cosmote Logo"
              className="cosmote-logo"
            />
          </div>
          <div className="header-center"></div>
          <div className="header-right">
            <img
              src="assets/images/germanos_logo.png"
              alt="Germanos Logo"
              className="germanos-logo"
            />
          </div>
        </header>
        <section className="mainContent">
          <div className="hero-img-container">
            <img
              src="assets/images/metacnic22-header.png"
              alt=""
              className="hero-img"
            />
          </div>
          <div className="welcome-text">
            <p>Είσαι έτοιμος να περάσεις στον Τελικό του COSMOPOP 2022;</p>
            <p>Παίξε και φτάσε το σκόρ σου στα ύψη!</p>
          </div>
          <div className="btn-container">
            <Link to="/register" className="btn purple-btn">
              REGISTER
            </Link>
          </div>
          <div className="btn-container">
            {/* <Link to="/oldleaderboard" className="btn yellow-btn">
              ΒΑΘΜΟΛΟΓΙΕΣ ΗΜΙΤΕΛΙΚΩΝ
            </Link> */}
            <Link to="/login" className="btn yellow-btn">
              Login
            </Link>
          </div>
          <div className="bottom-img-container">
            <img
              src="assets/images/cosmopop.png"
              alt=""
              className="bottom-img"
            />
          </div>
        </section>
        <footer className="footer">
          <div className="footer-left">
            <div>
              Για οποιοδήποτε τεχνικό θέμα απευθυνθείτε στο
              <a href="mailto:cosmopop2022@gmail.com">
                {" "}
                cosmopop2022@gmail.com
              </a>
            </div>
          </div>
          <div className="footer-right">
            <a href="#" className="footer-terms small-link termsLink">
              Όροι και προϋποθέσεις
            </a>
          </div>
        </footer>
        <div id="termsModal" className="modal">
          {/* <!-- Modal content --> */}
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
        </div>
      </div>
    </div>
  );
};

export default Welcome;
