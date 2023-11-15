import MyinfoCSS from "../styles/pages/Myinfo.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";

const Myinfo = () => {
  const { user } = useAuthContext();
  const [showSignUp, setShowSignUp] = useState(false);

  const method = "S256";
  const [clientId, setClientId] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [scope, setScope] = useState("");
  const [purposeId, setPurposeId] = useState("");
  //   const [environment, setEnvironment] = useState("");
  const [authApiUrl, setAuthApiUrl] = useState("");

  const handleBackToLogin = () => {
    setShowSignUp(false);
  };

  useEffect(() => {
    const fetchAppInfo = async () => {
      try {
        const response = await fetch("/getEnv");
        if (response.ok) {
          const data = await response.json();
          setClientId(data.clientId);
          setRedirectUrl(data.redirectUrl);
          setScope(data.scope);
          setPurposeId(data.purpose_id);
          // setEnvironment(data.environment);
          setAuthApiUrl(data.authApiUrl);
        } else {
          throw new Error("Network response was not ok.");
        }
      } catch (error) {
        console.log("error:", error.message);
      }
    };

    fetchAppInfo();
  }, []);

  const handleAuthorize = async (event) => {
    event.preventDefault();
    try {
      const codeChallengeResponse = await fetch("/generateCodeChallenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (codeChallengeResponse.ok) {
        const codeChallengeResult = await codeChallengeResponse.json();

        const authorizeUrl = `${authApiUrl}?client_id=${clientId}&scope=${scope}&purpose_id=${purposeId}&code_challenge=${codeChallengeResult.data}&code_challenge_method=${method}&redirect_uri=${redirectUrl}`;
        window.location = authorizeUrl;
      } else {
        throw new Error("Failed to generate code challenge");
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  return (
    <div className={MyinfoCSS.myinfo}>
      <div className={MyinfoCSS.myinfo_container}>
        <h1>Myinfo</h1>
        <form id="formAuthorize" onSubmit={handleAuthorize}>
          <button type="submit" className="btn2">
            Retrieve MyInfo
          </button>
        </form>

        <section id="form">
          <form id="formApplication">
            <div>
              <div>
                <h2>Form</h2>
                <h4>Application pre-filled with MyInfo!</h4>
              </div>
              <div>
                <div>
                  <p>
                    Confirm your details below and click "Submit Application".
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <h3>Personal Information</h3>
                  <div>
                    <label>NRIC</label>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        name="uinfin"
                        //   value=""
                        placeholder=""
                        required=""
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div>
                    <label>Full Name</label>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        //   value=""
                        placeholder=""
                        required=""
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div>
                    <label>Sex</label>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        name="sex"
                        //   value=""
                        placeholder=""
                        required=""
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div>
                    <label>Race</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="race"
                        //   value=""
                        placeholder=""
                        required=""
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div>
                    <label>Nationality</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="nationality"
                        //   value=""
                        placeholder=""
                        required=""
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div>
                    <label>Date Of Birth</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="dob"
                        //   value=""
                        placeholder=""
                        required=""
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div>
                    <label>Email</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        //   value=""
                        placeholder=""
                        required=""
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div>
                    <label>Mobile Number</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="mobileno"
                        //   value=""
                        placeholder=""
                        required=""
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div>
                    <label>Registered Address</label>
                    <div className="input-group">
                      <textarea cols="50" rows="3" name="regadd"></textarea>
                    </div>
                  </div>
                  <div>
                    <label>Housing Type</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="housingtype"
                        //   value=""
                        placeholder=""
                        required=""
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div>
                    <label>Marital Status</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="marital"
                        //   value=""
                        placeholder=""
                        required=""
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div>
                    <label>Highest Education Level</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="edulevel"
                        //   value=""
                        placeholder=""
                        required=""
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div>
                    <label>
                      Notice of Assessment - Latest Assessable Income (SGD)
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="assessableincome"
                        //   value=""
                        placeholder=""
                        required=""
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <a href="http://localhost:3001/mock">Submit Application</a>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>

      {!user && !showSignUp && (
        <Login onSignUpClick={() => setShowSignUp(true)} />
      )}

      {!user && showSignUp && <Signup onBackToLoginClick={handleBackToLogin} />}
    </div>
  );
};

export default Myinfo;
