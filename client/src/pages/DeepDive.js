import DeepDiveCSS from "../styles/pages/DeepDive.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// context
import { useFilesContext } from "../hooks/useFilesContext";

// components
import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";
import ChatbotDeepDive from "../components/ChatbotDeepDive";
import FileDetailsDelete from "../components/FileDetailsDelete";
import FileDetailsDownload from "../components/FileDetailsDownload";

// api
import { fetchFiles } from "./api";

const DeepDive = () => {
  const { user } = useAuthContext();
  const { files, dispatch: filesDispatch } = useFilesContext();
  const [showSignUp, setShowSignUp] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (user) {
      fetchFiles(user, filesDispatch);
    }
  }, [filesDispatch, user]);

  const handleSummaryClick = async () => {
    const response = await fetch("/openai/generate_summary", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to start the conversation");
    }

    const data = await response.json();
    console.log(data.message);
    // const chatbotResponse = { text: data.message, isUser: false };
    setSummary(data.message);
  };

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

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const findUniqueName = (name, count) => {
    const fileExt = name.split(".").pop();
    const fileName = name.replace(/\.[^/.]+$/, "");

    const newName = count === 1 ? fileName : `${fileName}(${count})`;
    const updatedName = fileExt ? `${newName}.${fileExt}` : newName;
    const fileExists = files.find((file) => file.fileName === updatedName);

    return fileExists ? findUniqueName(name, count + 1) : updatedName;
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const uniqueFileName = findUniqueName(file.name, 1);

    const formData = new FormData();
    formData.set("pdf", file, uniqueFileName);

    try {
      const response = await fetch("/file/policy/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (response.ok) {
        fetchFiles(user, filesDispatch);
      }
      setFile(null);
      setIsDragging(false);
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
        <div
          className={DeepDiveCSS.deepdive_container}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <h3>Upload a PDF and ask me a question!</h3>
          <div
            className={`${DeepDiveCSS.deepdive_upload} ${
              isDragging ? DeepDiveCSS.dragging : ""
            }`}
          >
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
          <p>Files uploaded:</p>
          {files && (
            <div>
              {files.map((file) => (
                <FileDetailsDelete key={file._id} file={file} />
              ))}
            </div>
          )}
          <div>
            <button onClick={handleSummaryClick}>Generate summary</button>
            <p>Summary generated:</p>
            {files && (
              <div>
                {files.map((file) => (
                  <FileDetailsDownload key={file._id} file={file} />
                ))}
              </div>
            )}
            <p>{summary}</p>
          </div>
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
