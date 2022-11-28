import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { validateIndexedDBOpenable } from "@firebase/util";
import swal from "sweetalert";
var DB = require("../../DB/EMAILDB.json");

const SignUp = () => {
  const [error, setError] = useState();
  const [randomAvatar, setRandomAvatar] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    var modal = document.getElementById("termsModal");
    var link = document.getElementsByClassName("register-terms");
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
    function randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    setRandomAvatar(randomIntFromInterval(1, 6));
  }, []);

  const [formData, setFormData] = useState({
    fullname: "",
    password: "",
    passwordver: "",
    email: "",
    city: "",
    workLocation: "",
    mobile: "",
    consent: false,
    terms: false,
  });

  const [formDataVal, setFormDataVal] = useState({
    fullname: null,
    password: null,
    passwordver: null,
    email: null,
    city: null,
    workLocation: null,
    mobile: null,
    consent: null,
    terms: null,
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    testValidation(evt.target.value, evt.target.name);
    if (evt.target.name === "consent" || evt.target.name === "terms") {
      setFormData({
        ...formData,
        [evt.target.name]: !formData[evt.target.name],
      });
      setFormDataVal({
        ...formDataVal,
        [evt.target.name]: !formDataVal[evt.target.name],
      });
    } else {
      setFormData({
        ...formData,
        [evt.target.name]: value,
      });
    }
  };

  const testValidation = (value, name) => {
    switch (name) {
      case "fullname":
        /^(.*)\s+(.*)$/.test(value)
          ? validate(true, name)
          : validate(false, name);
        break;
      case "password":
        value.length > 6 ? validate(true, name) : validate(false, name);
        break;
      case "email":
        //need to add validation
        let filtArr = [];
        DB.map((item) => {
          filtArr.push(item[0]);
        });
        const regex =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        regex.test(value) && filtArr.includes(value.toLowerCase())
          ? validate(true, name)
          : validate(false, name);
        break;
      case "city":
        value.length > 0 && /\S/.test(value)
          ? validate(true, name)
          : validate(false, name);
        break;
      case "workLocation":
        value ? validate(true, name) : validate(false, name);
        break;
      case "mobile":
        value.length === 10 && value.startsWith(69)
          ? validate(true, name)
          : validate(false, name);
        break;
      case "passwordver":
        value == formData.password
          ? validate(true, name)
          : validate(false, name);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const areTrue = Object.values(formDataVal).every((value) => value === true);
    if (areTrue) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        auth.onAuthStateChanged((user) => {
          user &&
            setDoc(doc(db, "users", user.uid), {
              userName: formData.fullname,
              city: formData.city,
              email: formData.email,
              workLocation: formData.workLocation,
              mobileNumber: formData.mobile,
              avatarNumber: randomAvatar,
              highScore: 0,
              timesPlayed: 0,
            });
          updateProfile(user, {
            displayName: formData.fullName,
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
        swal({
          title: "Έχετε ήδη εγγραφεί.",
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn purple-btn",
          },
        });
        console.log(error.message);
      }
    } else {
      formDataVal.workLocation == null &&
        setFormDataVal({ ...formDataVal, workLocation: false });
      swal({
        title: "ΠΑΡΑΚΑΛΩ ΕΛΕΓΞΤΕ \n" + "ΟΛΑ ΤΑ ΠΕΔΙΑ!",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn purple-btn",
        },
      });
    }
  };

  return (
    <div className="register">
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
          <h1 className="page-title">ΔΗΜΙΟΥΡΓΙΑ ΛΟΓΑΡΙΑΣΜΟΥ</h1>
          <div className="register-form form">
            <form
              onSubmit={handleSubmit}
              id="registerForm"
              className="registerform"
            >
              <div className="avatar-container">
                {/* <!--TODO: this should be randob selected form 1 to 8--> */}
                <img
                  src={
                    randomAvatar && `assets/images/avatars/${randomAvatar}.png`
                  }
                  alt="Avatar"
                  className="avatar-img"
                />
              </div>
              <div className="register-text">
                <p>
                  Παρακαλούμε εισάγετε το email με το οποίο λάβατε μέρος στην
                  προηγουμένη φάση
                </p>
              </div>
              <div className="form-input-group">
                {/* <!--TODO: Remove the    Class TESTING & DISPLAY PURPOCES ONLY--> */}
                <div className="fullname input-container   ">
                  <label htmlFor="fullname">Ονοματεπώνυμο</label>
                  <input
                    onChange={handleChange}
                    id="fullname"
                    type="text"
                    name="fullname"
                    value={formData.fullName}
                    placeholder="Πχ. Γιάννης Γιαννόπουλος"
                  />
                  {formDataVal.fullname === null ? (
                    <></>
                  ) : (
                    !formDataVal.fullname && (
                      <div className="error-message  error-fullname">
                        Δεν έχετε συμπληρώσει Ονοματεπώνυμο
                      </div>
                    )
                  )}
                </div>
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
                      <div className="error-message    error-email">
                        Το email δεν είναι έγκυρο
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="form-input-group">
                <div className="mobile input-container">
                  <label htmlFor="mobile">Κινητό τηλέφωνο</label>
                  <input
                    onChange={handleChange}
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    placeholder="Πχ. 6912345678"
                    maxLength="10"
                  />
                  {formDataVal.mobile === null ? (
                    <></>
                  ) : (
                    !formDataVal.mobile && (
                      <div className="error-message    error-mobile">
                        Ο αριθμός δεν είναι σωστός
                      </div>
                    )
                  )}
                </div>
                <div className="email input-container">
                  <label htmlFor="area">Περιοχή</label>
                  <input
                    onChange={handleChange}
                    id="area"
                    name="city"
                    type="text"
                    value={formData.city}
                    placeholder="Πχ. Αθήνα"
                  />
                  {formDataVal.city === null ? (
                    <></>
                  ) : (
                    !formDataVal.city && (
                      <div className="error-message    error-area">
                        Δεν έχετε συμπληρώσει Περιοχή
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="form-input-group">
                <div className="mobile input-container">
                  <label htmlFor="company">Κατάστημα</label>

                  <select
                    id="company"
                    name="workLocation"
                    value={formData.workLocation}
                    onChange={handleChange}
                  >
                    <option disabled={true} value="">
                      Επιλέγετε
                    </option>
                    <option value="cosmote">COSMOTE</option>
                    <option value="germanos">ΓΕΡΜΑΝΟΣ</option>
                    <option value="synergates-germanos">
                      ΣΥΝΕΡΓΑΤΕΣ Δ.Κ. ΓΕΡΜΑΝΟΣ
                    </option>
                    <option value="kentrika">ΚΕΝΤΡΙΚΑ</option>
                  </select>
                  {formDataVal.workLocation === null ? (
                    <></>
                  ) : (
                    !formDataVal.workLocation && (
                      <div className="error-message    error-company">
                        Δεν έχετε συμπληρώσει Περιοχή
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="form-input-group">
                <div className="password input-container">
                  <label htmlFor="password">Κωδικός</label>
                  <input
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    placeholder="*********"
                  />
                  {formDataVal.password === null ? (
                    <></>
                  ) : (
                    !formDataVal.password && (
                      <div className="error-message    error-password">
                        Ο κωδικός είναι πολύ αδύναμος
                      </div>
                    )
                  )}
                </div>
                <div className="email input-container">
                  <label htmlFor="passwordver">Επαλήθευση Κωδικού</label>
                  <input
                    onChange={handleChange}
                    id="passwordver"
                    name="passwordver"
                    type="password"
                    value={formData.passwordver}
                    placeholder="*********"
                  />
                  {formDataVal.passwordver === null ? (
                    <></>
                  ) : (
                    !formDataVal.passwordver && (
                      <div className="error-message    error-passwordver">
                        Οι κωδικοί δεν ταιριάζουν
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="form-input-group checkbox-container">
                <label htmlFor="consent">
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    id="consent"
                    name="consent"
                    value={formData.consent === null ? "" : formData.consent}
                  />
                  <span className="checkbox-text">
                    Συναινώ να χρησιμοποιηθούν τα στοιχεία μου για τη συμμετοχή
                    μου στο διαγωνισμό
                  </span>
                </label>
                {formDataVal.consent === null ? (
                  <></>
                ) : (
                  !formDataVal.consent && (
                    <div className="error-message    error-consent">
                      Πρέπει να συναινέσετε στη χρήση των στοιχείων σας
                    </div>
                  )
                )}
              </div>
              <div className="form-input-group checkbox-container">
                <label htmlFor="terms">
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    id="terms"
                    name="terms"
                    value={formData.terms === null ? "" : formData.terms}
                  />
                  <span className="checkbox-text">
                    Διάβασα και αποδέχομαι τους{" "}
                    <a href="#" className="register-terms">
                      όρους & προϋποθέσεις
                    </a>{" "}
                    της ενέργειας
                  </span>
                </label>
                {formDataVal.terms === null ? (
                  <></>
                ) : (
                  !formDataVal.terms && (
                    <div className="error-message    error-terms">
                      Πρέπει να αποδεχθείτε τους όρους & προϋποθέσεις
                    </div>
                  )
                )}
              </div>
              <div className="submit-container">
                <button type="submit" className="btn purple-btn">
                  REGISTER
                </button>
                <Link to="/login">Έχω ήδη λογαριασμό</Link>
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
        <div id="termsModal" className="modal">
          {/* <!-- Modal content -->  */}
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

export default SignUp;
