import DeepDiveCSS from "../styles/pages/DeepDive.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// context
import { useFilesContext } from "../hooks/useFilesContext";

// components
import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";
import ChatbotDeepDive from "../components/ChatbotDeepDive";
import FileDetails from "../components/FileDetails";

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
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please select a PDF file.");
      event.target.value = null;
    }
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
      setFile(null);
      const inputElement = document.querySelector('input[type="file"]');
      if (inputElement) {
        inputElement.value = null;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className={DeepDiveCSS.deepdive}>
      {user ? (
        <div className={DeepDiveCSS.deepdive_container}>
          <h3>Upload a PDF and ask me a question!</h3>
          <div className={DeepDiveCSS.deepdive_content}>
            <input type="file" onChange={handleFileChange} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={handleFileUpload}
            >
              <path
                fill="currentColor"
                d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16h-2Zm-5 4q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Z"
              />
            </svg>
          </div>
          <p>Lists of files uploaded:</p>
          {files && (
            <div>
              {files.map((file) => (
                <FileDetails key={file._id} file={file} />
              ))}
            </div>
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
