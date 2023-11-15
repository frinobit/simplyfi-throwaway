import MyinfoCSS from "../styles/pages/Myinfo.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";

const InputField = ({ label, name }) => {
  return (
    <div>
      <label>{label}</label>
      <div className={MyinfoCSS.input_group}>
        <input
          type="text"
          className="form-control"
          name={name}
          // value=""
          placeholder=""
          required=""
          defaultValue=""
        />
      </div>
    </div>
  );
};

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
        const response = await fetch("/myinfo/getEnv");
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
      const codeChallengeResponse = await fetch(
        "/myinfo/generateCodeChallenge",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (codeChallengeResponse.ok) {
        const codeChallengeResult = await codeChallengeResponse.json();
        const authorizeUrl = `${authApiUrl}?client_id=${clientId}&scope=${scope}&purpose_id=${purposeId}&code_challenge=${codeChallengeResult}&code_challenge_method=${method}&redirect_uri=${redirectUrl}`;
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
      {user ? (
        <div className={MyinfoCSS.myinfo_container}>
          <h1>Myinfo</h1>
          <img
            src="/simplyfi-throwaway/assets/myinfo.svg"
            alt="myinfo"
            onClick={handleAuthorize}
          />

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
                    <InputField label="NRIC" name="uinfin" />
                    <InputField label="Full Name" name="name" />
                    <InputField label="Sex" name="sex" />
                    <InputField label="Race" name="race" />
                    <InputField label="Nationality" name="nationality" />
                    <InputField label="Date Of Birth" name="dob" />
                    <InputField label="Email" name="email" />
                    <InputField label="Mobile Number" name="mobileno" />
                    <InputField label="Registered Address" name="regadd" />
                    <InputField label="Housing Type" name="housingtype" />
                    <InputField label="Marital Status" name="marital" />
                    <InputField
                      label="Highest Education Level"
                      name="edulevel"
                    />
                    <InputField
                      label="Notice of Assessment - Latest Assessable Income (SGD)"
                      name="assessableincome"
                    />
                  </div>
                  <div>
                    <form id="formAuthorize">
                      <button type="submit" className="btn2">
                        Submit Application
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      ) : (
        <p>Loading</p>
      )}

      {!user && !showSignUp && (
        <Login onSignUpClick={() => setShowSignUp(true)} />
      )}

      {!user && showSignUp && <Signup onBackToLoginClick={handleBackToLogin} />}
    </div>
  );
};

export default Myinfo;
