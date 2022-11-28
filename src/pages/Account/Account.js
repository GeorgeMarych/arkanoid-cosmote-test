import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

const Account = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [score, setScore] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [avatarNumber, setAvatarNumber] = useState();
  const [timesPlayed, setTimesPlayed] = useState();

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
    const fetchCurrentHighScore = async () => {
      const docRef = doc(db, "users", user && user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let data = docSnap.data();
        localStorage.setItem("gameoverscore", data.highScore);
        setScore(data.highScore);
      } else {
        console.log("No such document!");
      }
    };
    user.uid && fetchCurrentHighScore();

    const fetchAvatar = async () => {
      const docRef = doc(db, "users", user && user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let data = docSnap.data();
        setTimesPlayed(data.timesPlayed);
        setAvatarNumber(data.avatarNumber);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    user.uid && fetchAvatar();
    timesPlayed > 4 && navigate("/gameover");
  }, [user, timesPlayed]);

  useEffect(() => {
    window.addEventListener("storage", () => {
      let score = localStorage.getItem("score");
      let gameoverscore = localStorage.getItem("gameoverscore");

      if (Number(gameoverscore) > Number(score)) {
        setScore(gameoverscore);
      } else {
        setScore(score);
      }
    });
    setScore(localStorage.getItem("gameoverscore"));

    window.addEventListener("storage", (e) => {
      if (e["key"] == "trigger") {
        setTimeout(() => {
          const asyncFunc = async () => {
            try {
              const docRef = doc(db, "users", user.uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                let data = docSnap.data();
                let count = data.timesPlayed;
                auth.onAuthStateChanged((user) => {
                  user &&
                    updateDoc(doc(db, "users", user.uid), {
                      timesPlayed: count + 1,
                    });
                });
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            } catch (error) {
              console.log(error.message);
            }
          };
          user.uid && asyncFunc();
          navigate("/gameover");
        }, 2500);
      }
    });
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
              <a onClick={logOut} title="Logout" className="logout">
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
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<iframe src='game/game/index.html' frameBorder='0' height='500px' ></iframe>",
            }}
            className="iframe-container"
          ></div>
          {/* <a href="#" className="openInstructions">
            ΟΔΗΓΙΕΣ
          </a> */}
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
        </footer>
      </div>
    </div>
  );
};

export default Account;
