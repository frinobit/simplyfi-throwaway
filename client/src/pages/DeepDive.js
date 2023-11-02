import DeepDiveCSS from "../styles/pages/DeepDive.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// context
import { useFilesContext } from "../hooks/useFilesContext";

// components
import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";
import ChatbotDeepDive from "../components/ChatbotDeepDive";

// api
import { fetchFiles } from "./utils/api";

const DeepDive = () => {
  const { user } = useAuthContext();
  const [showSignUp, setShowSignUp] = useState(false);
  const { files, dispatch: filesDispatch } = useFilesContext();
  const [file, setFile] = useState(null);

  useEffect(() => {
    let socket;

    if (user) {
      fetchFiles(user, filesDispatch);
    } else {
      console.log("socket off");
      if (socket) {
        socket.disconnect();
      }
    }

    return () => {
      console.log("socket off");
      if (socket) {
        socket.disconnect();
      }
    };
  }, [filesDispatch, user]);

  const handleBackToLogin = () => {
    setShowSignUp(false);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch("/file/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully");
        fetchFiles(user, filesDispatch);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className={DeepDiveCSS.deepdive}>
      {user ? (
        <div className={DeepDiveCSS.deepdive_container}>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleFileUpload}>Upload PDF</button>
          {files ? (
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  <p>{file.filename}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading</p>
          )}
        </div>
      ) : (
        <div className={DeepDiveCSS.deepdive_container}>
          <p>Loading</p>
        </div>
      )}

      <div className={DeepDiveCSS.chatbot_container}>
        <ChatbotDeepDive />
      </div>

      {!user && !showSignUp && (
        <Login onSignUpClick={() => setShowSignUp(true)} />
      )}

      {!user && showSignUp && <Signup onBackToLoginClick={handleBackToLogin} />}
    </div>
  );
};

export default DeepDive;
