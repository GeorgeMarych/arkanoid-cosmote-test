import "./css/reset.css";
import "./css/style.css";
import "./css/responsive.css";

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/Signup/SignUp";
import Account from "./pages/Account/Account";
import Welcome from "./pages/Welcome/Welcome";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import GameOver from "./pages/Gameover/GameOver";
import Leaderboard from "./pages/Leaderboard/Leaderboard";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import OldLeaderboard from "./pages/OldLeaderboard/OldLeaderboard";

function App() {
  const [contestEnded, setContestEnded] = useState();
  useEffect(() => {
    const fetchContestEnd = async () => {
      const docRef = doc(db, "contestend", "contentend");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let data = docSnap.data();
        console.log(data.contestEnded);
        setContestEnded(data.contestEnded);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    fetchContestEnd();
  }, [contestEnded]);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={contestEnded && contestEnded ? <Leaderboard /> : <Welcome />}
        />
        <Route
          path="/login"
          element={contestEnded && contestEnded ? <Leaderboard /> : <SignIn />}
        />
        <Route
          path="/register"
          element={contestEnded && contestEnded ? <Leaderboard /> : <SignUp />}
        />
        <Route
          path="/oldleaderboard"
          element={
            contestEnded && contestEnded ? <Leaderboard /> : <OldLeaderboard />
          }
        />
        <Route
          path="/resetpassword"
          element={
            contestEnded && contestEnded ? <Leaderboard /> : <ForgotPassword />
          }
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route
          path="/gameover"
          element={
            <ProtectedRoute>
              <GameOver />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
