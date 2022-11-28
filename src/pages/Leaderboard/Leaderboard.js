import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";

import { auth } from "../../firebase";

const Leaderboard = () => {
  const { user } = UserAuth();
  const [leaderBoard, setLeaderBoard] = useState([]);

  useEffect(() => {
    const fetchHighScore = async () => {
      const q = query(collection(db, "users"));

      const querySnapshot = await getDocs(q);
      let array = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        array.push(doc.data());
      });

      let filteredArr = array.sort(
        (a, b) => parseFloat(b.highScore) - parseFloat(a.highScore)
      );
      setLeaderBoard(filteredArr);
    };
    fetchHighScore();
  }, [user]);

  return (
    <div className="leaderboard">
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
          <h1 className="page-title">ΕΥΧΑΡΙΣΤΟΥΜΕ ΓΙΑ ΤΗ ΣΥΜΜΕΤΟΧΗ ΣΑΣ!</h1>
          <h2 className="page-title">
            Ο ΔΙΑΓΩΝΙΣΜΟΣ ΓΙΑ ΤΗΝ ΠΡΟΚΡΙΣΗ
            <br />
            ΣΤΟΝ <span className="purple-txt">ΗΜΙΤΕΛΙΚΟ</span> ΕΧΕΙ ΟΛΟΚΛΗΡΩΘΕΙ.
          </h2>
          <h2 className="page-title">ΝΙΚΗΤΕΣ</h2>
          <div className="winners-container">
            <ol className="winners">
              {leaderBoard &&
                leaderBoard.map((item, index) => {
                  if (index < 24) {
                    return (
                      <li key={index}>
                        <div className="winner">
                          <div className="winner-name">{item.userName}</div>
                          <div className="winner-score yellow-txt">
                            {item.highScore}
                          </div>
                        </div>
                      </li>
                    );
                  }
                })}
            </ol>
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
          <div className="footer-left"></div>
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

export default Leaderboard;
