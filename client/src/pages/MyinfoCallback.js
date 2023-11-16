import MyinfoCSS from "../styles/pages/Myinfo.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";

const InputFieldNoChange = ({ label, name, value }) => (
  <div>
    <label>{label}</label>
    <div className={MyinfoCSS.input_group_callback}>
      <input
        type="text"
        className={MyinfoCSS.input_field_no_change}
        name={name}
        placeholder=""
        required=""
        defaultValue={value}
        readOnly
      />
    </div>
  </div>
);

const InputFieldYesChange = ({ label, name, value, onChange }) => (
  <div>
    <label>{label}</label>
    <div className={MyinfoCSS.input_group_callback}>
      <input
        type="text"
        className={MyinfoCSS.input_field_yes_change}
        name={name}
        placeholder=""
        required=""
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

const MyinfoCallback = () => {
  const { user } = useAuthContext();
  const [showSignUp, setShowSignUp] = useState(false);

  const method = "S256";
  const [clientId, setClientId] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [scope, setScope] = useState("");
  const [purposeId, setPurposeId] = useState("");
  //   const [environment, setEnvironment] = useState("");
  const [authApiUrl, setAuthApiUrl] = useState("");
  const [formData, setFormData] = useState({
    uinfin: "",
    name: "",
    sex: "",
    race: "",
    nationality: "",
    dob: "",
    email: "",
    mobileno: "",
    regadd: "",
    housingtype: "",
    marital: "",
    edulevel: "",
    assessableincome: "",
  });

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

    function callServerAPIs() {
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get("code");

      fetch("/myinfo/getPersonData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authCode: authCode,
          codeVerifier: window.sessionStorage.getItem("codeVerifier"),
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          prefillForm(result);
        })
        .catch((error) => {
          alert("ERROR:" + JSON.stringify(error));
        });
    }

    function prefillForm(data) {
      let noaData = "";
      let address = "";
      if (data["noa-basic"]) {
        noaData = str(data["noa-basic"].amount)
          ? formatMoney(str(data["noa-basic"].amount), 2, ".", ",")
          : "";
      }
      if (data.regadd.type === "SG") {
        address =
          str(data.regadd.country) === ""
            ? ""
            : str(data.regadd.block) +
              " " +
              str(data.regadd.building) +
              " \n" +
              "#" +
              str(data.regadd.floor) +
              "-" +
              str(data.regadd.unit) +
              " " +
              str(data.regadd.street) +
              " \n" +
              "Singapore " +
              str(data.regadd.postal);
      } else if (data.regadd.type === "Unformatted") {
        address = str(data.regadd.line1) + "\n" + str(data.regadd.line2);
      }
      // Transform data to match the structure of formData state
      const transformedData = {
        uinfin: str(data.uinfin),
        name: str(data.name),
        sex: str(data.sex),
        race: str(data.race),
        nationality: str(data.nationality),
        dob: str(data.dob),
        email: str(data.email),
        mobileno:
          str(data.mobileno.prefix) +
          str(data.mobileno.areacode) +
          " " +
          str(data.mobileno.nbr),
        regadd: address,
        housingtype:
          str(data.housingtype) === ""
            ? str(data.hdbtype)
            : str(data.housingtype),
        marital: str(data.marital),
        edulevel: str(data.edulevel),
        assessableincome: noaData,
      };
      setFormData(transformedData);
    }

    function formatMoney(n, decimalCount = 2, decimal = ".", thousands = ",") {
      const c = isNaN((decimalCount = Math.abs(decimalCount)))
        ? 2
        : decimalCount;
      const d = decimal === undefined ? "." : decimal;
      const t = thousands === undefined ? "," : thousands;
      const s = n < 0 ? "-" : "";
      const num = Math.abs(Number(n) || 0).toFixed(c);
      const i = String(parseInt(num, 10));
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        s +
        (j ? i.substr(0, j) + t : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
        (c
          ? d +
            Math.abs(num - i)
              .toFixed(c)
              .slice(2)
          : "")
      );
    }

    function str(data) {
      if (!data) return "";
      if (data.value) return data.value;
      else if (data.desc) return data.desc;
      else if (typeof data === "string") return data;
      else return "";
    }

    const url = window.location.href;
    if (url.includes("callback?code")) {
      callServerAPIs();
    } else if (url.includes("callback")) {
      alert("ERROR: Missing Auth Code");
    }
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

        const authorizeUrl = `${authApiUrl}?client_id=${clientId}&scope=${scope}&purpose_id=${purposeId}&code_challenge=${codeChallengeResult.data}&code_challenge_method=${method}&redirect_uri=${redirectUrl}`;
        window.location = authorizeUrl;
      } else {
        throw new Error("Failed to generate code challenge");
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("ho");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/personals", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        window.alert("Form data submitted successfully!");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  return (
    <div className={MyinfoCSS.myinfo}>
      {user ? (
        <div className={MyinfoCSS.myinfo_container}>
          <h1>Myinfo - Callback</h1>
          <img
            src="/simplyfi-throwaway/assets/myinfo.svg"
            alt="myinfo"
            onClick={handleAuthorize}
          />

          <section id="form">
            <form id="formApplication" onSubmit={handleSubmit}>
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
                    <InputFieldNoChange
                      label="NRIC"
                      name="uinfin"
                      value={formData.uinfin}
                    />
                    <InputFieldNoChange
                      label="Full Name"
                      name="name"
                      value={formData.name}
                    />
                    <InputFieldNoChange
                      label="Sex"
                      name="sex"
                      value={formData.sex}
                    />
                    <InputFieldNoChange
                      label="Race"
                      name="race"
                      value={formData.race}
                    />
                    <InputFieldNoChange
                      label="Nationality"
                      name="nationality"
                      value={formData.nationality}
                    />
                    <InputFieldNoChange
                      label="Date Of Birth"
                      name="dob"
                      value={formData.dob}
                    />
                    <InputFieldYesChange
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <InputFieldYesChange
                      label="Mobile Number"
                      name="mobileno"
                      value={formData.mobileno}
                      onChange={handleChange}
                    />
                    <InputFieldYesChange
                      label="Registered Address"
                      name="regadd"
                      value={formData.regadd}
                      onChange={handleChange}
                    />
                    <InputFieldNoChange
                      label="Housing Type"
                      name="housingtype"
                      value={formData.housingtype}
                    />
                    <InputFieldNoChange
                      label="Marital Status"
                      name="marital"
                      value={formData.marital}
                    />
                    <InputFieldNoChange
                      label="Highest Education Level"
                      name="edulevel"
                      value={formData.edulevel}
                    />
                    <InputFieldNoChange
                      label="Notice of Assessment - Latest Assessable Income (SGD)"
                      name="assessableincome"
                      value={formData.assessableincome}
                    />
                  </div>
                  <div>
                    <button type="submit">Submit Application</button>
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

export default MyinfoCallback;
