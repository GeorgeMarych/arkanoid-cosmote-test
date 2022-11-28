import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const GameOver = () => {
  const { user } = UserAuth();
  const [avatarNumber, setAvatarNumber] = useState();
  const [timesPlayed, setTimesPlayed] = useState();
  const [score, setScore] = useState();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const gameoverscore = localStorage.getItem("gameoverscore");
    const fetchAvatar = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let data = docSnap.data();
        setAvatarNumber(data.avatarNumber);
        setTimesPlayed(data.timesPlayed);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    user.uid && fetchAvatar();

    const asyncFunc = async () => {
      try {
        const docRef = doc(db, "users", user && user.uid);

        auth.onAuthStateChanged((user) => {
          user &&
            updateDoc(doc(db, "users", user.uid), {
              highScore: gameoverscore,
            });
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    user.uid && asyncFunc();
  }, [user, timesPlayed]);

  useEffect(() => {
    setScore(localStorage.getItem("gameoverscore"));
  }, []);

  return (
    <div className="main">
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
            {/* <!-- TODO: DISPLAY PREVIOUS HIGHSCORE INSIDE .highscore --> */}
            <h2 className="page-title highscore-title">
              HIGHSCORE:{" "}
              <span className="yellow-txt highscore-container">
                <span className="highscore">{score ? score : 0}</span>{" "}
                <img
                  src="assets/images/cheese.png"
                  className="cheese"
                  alt="cheese"
                />
              </span>
            </h2>
          </div>
          <div className="header-right avatar-added">
            <div className="avatar-container header-avatar">
              <img
                src={
                  avatarNumber && `assets/images/avatars/${avatarNumber}.png`
                }
                alt="Avatar"
                className="avatar-img"
              />
              <a onClick={logOut} href="#" title="Logout" className="logout">
                LOGOUT
              </a>
            </div>
            <div>
              <img
                src="assets/images/germanos_logo.png"
                alt="Germanos Logo"
                className="germanos-logo"
              />
            </div>
          </div>
        </header>
        <section className="mainContent">
          <h1 className="page-title">ΕΥΧΑΡΙΣΤΟΥΜΕ ΓΙΑ ΤΗ ΣΥΜΜΕΤΟΧΗ ΣΑΣ!</h1>
          <div className="avatar-container big-avatar">
            <img
              src={avatarNumber && `assets/images/avatars/${avatarNumber}.png`}
              alt="Avatar"
              className="avatar-img"
            />
          </div>
          <h2 className="page-title">
            ΕΧΕΤΕ ΣΥΓΚΕΝΤΡΩΣΕΙ{" "}
            <span className="yellow-txt">{score ? score : 0}</span> ΠΟΝΤΟΥΣ
            <br /> ΜΕΧΡΙ ΣΤΙΓΜΗΣ
          </h2>
          {timesPlayed < 5 && (
            <div className="btn-container">
              <Link to="/account" className="btn yellow-btn">
                ΞΑΝΑΠΑΙΞΕ
              </Link>
            </div>
          )}
        </section>
        <footer className="footer">
          <div className="footer-left">
            <img
              src="assets/images/cosmopop.png"
              alt=""
              className="footer-left-img"
            />
          </div>
          <div className="footer-center">
            <img
              src="assets/images/metacnic22-header.png"
              alt=""
              className="footer-center-img"
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
  );
};

export default GameOver;
