import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fullName, setFullName] = useState();
  const [city, setCity] = useState();
  const [workLocation, setWorkLocation] = useState();

  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(email, password, fullName);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      auth.onAuthStateChanged((user) => {
        user &&
          setDoc(doc(db, "users", user.uid), {
            city: city,
            workLocation: workLocation,
          });
        updateProfile(user, {
          displayName: fullName,
        })
          .then(() => {
            navigate("/account");
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>
        <h1 className="py-2">
          Already have an account yet?{" "}
          <Link to="/" className="underline">
            Sign in.
          </Link>
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3"
            type="email"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Full Name</label>
          <input
            onChange={(e) => setFullName(e.target.value)}
            className="border p-3"
            type="text"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">City</label>
          <input
            onChange={(e) => setCity(e.target.value)}
            className="border p-3"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="work-location">Choose your Work Location:</label>
          <select
            onChange={(e) => setWorkLocation(e.target.value)}
            id="work-location"
            name="work-ls"
          >
            <option value="ΓΕΡΜΑΝΟΣ">ΓΕΡΜΑΝΟΣ</option>
            <option value="COSMOTE">COSMOTE</option>
            <option value=" Δ.Κ. ΓΕΡΜΑΝΟΣ"> Δ.Κ. ΓΕΡΜΑΝΟΣ </option>
            <option value="ΚΕΝΤΡΙΚΑ">ΚΕΝΤΡΙΚΑ</option>
          </select>
        </div>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3"
            type="password"
          />
        </div>
        <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
