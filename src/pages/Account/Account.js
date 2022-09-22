import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

const Account = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [score, setScore] = useState();

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    window.addEventListener("storage", () => {
      setScore(localStorage.getItem("score"));
    });
  }, []);

  return (
    <div>
      <h1>Account</h1>
      <h2>User: {user && user.displayName} </h2>
      <h2>Score: {score && score}</h2>
      <button onClick={logOut}>Sign Out</button>
      <iframe width="482" height="587" src="game/game/index.html" />
    </div>
  );
};

export default Account;
