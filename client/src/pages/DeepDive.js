import DeepDiveCSS from "../styles/pages/DeepDive.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// context
import { useFilesContext } from "../hooks/useFilesContext";
import { useCoveragesContext } from "../hooks/useCoveragesContext";

// components
import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";
import ChatbotDeepDive from "../components/ChatbotDeepDive";
import FileDetailsDelete from "../components/FileDetailsDelete";
import FileDetailsDownload from "../components/FileDetailsDownload";

// api
import { fetchFiles } from "./api";
import { fetchCoverages } from "./api";

const DeepDive = () => {
  const { user } = useAuthContext();
  const { files, dispatch: filesDispatch } = useFilesContext();
  const { coverages, dispatch: coveragesDispatch } = useCoveragesContext();
  const [showSignUp, setShowSignUp] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (user) {
      fetchFiles(user, filesDispatch);
      fetchCoverages(user, coveragesDispatch);
    }
  }, [filesDispatch, coveragesDispatch, user]);

  const handleSummaryClick = async () => {
    const response = await fetch("/openai/generate_summary", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      fetchFiles(user, filesDispatch);
    }
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
        <div className={DeepDiveCSS.deepdive_container}>
          <div className={DeepDiveCSS.row_container}>
            <h3>top</h3>
            <p>hehehehehehehehehehehehehehehe</p>
          </div>
          <div className={DeepDiveCSS.row_container}>
            <h3>Life Insurance Coverage</h3>
            <div className={DeepDiveCSS.table_container}>
              <table className={DeepDiveCSS.table}>
                <thead>
                  <tr>
                    <th className={DeepDiveCSS.labelColumn}>Label</th>
                    <th className={DeepDiveCSS.otherColumns}>Premium</th>
                    <th className={DeepDiveCSS.otherColumns}>Death</th>
                    <th className={DeepDiveCSS.otherColumns}>Illness</th>
                    <th className={DeepDiveCSS.otherColumns}>Disability (P)</th>
                    <th className={DeepDiveCSS.otherColumns}>Disability (T)</th>
                    <th className={DeepDiveCSS.otherColumns}>Medical</th>
                    <th className={DeepDiveCSS.otherColumns}>Income</th>
                    <th className={DeepDiveCSS.otherColumns}>Accident</th>
                    <th className={DeepDiveCSS.otherColumns}>Care</th>
                  </tr>
                </thead>
                <tbody>
                  {coverages && coverages.length > 0 ? (
                    coverages.map((coverage) => (
                      <tr key={coverage._id}>
                        <td>{coverage.label}</td>
                        <td>{coverage.premium}</td>
                        <td>{coverage.death}</td>
                        <td>{coverage.illness}</td>
                        <td>{coverage.disabilityP}</td>
                        <td>{coverage.disabilityT}</td>
                        <td>{coverage.medical}</td>
                        <td>{coverage.income}</td>
                        <td>{coverage.accident}</td>
                        <td>{coverage.care}</td>
                        <td>
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
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No coverages found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className={DeepDiveCSS.row_container}>
            <h3>Upload a PDF and ask me a question!</h3>
            <div
              // className={DeepDiveCSS.deepdive_upload}
              className={`${DeepDiveCSS.deepdive_upload} ${
                isDragging ? DeepDiveCSS.dragging : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
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
            {files && files.length > 0 ? (
              <div>
                {files
                  .filter((file) => file.type === "policy")
                  .map((file) => (
                    <FileDetailsDelete key={file._id} file={file} />
                  ))}
              </div>
            ) : null}
            <div>
              <button onClick={handleSummaryClick}>Generate summary</button>
              <p>Summary generated:</p>
              {files && files.length > 0 ? (
                <div>
                  {files
                    .filter((file) => file.type === "summary")
                    .map((file) => (
                      <FileDetailsDownload key={file._id} file={file} />
                    ))}
                </div>
              ) : null}
            </div>
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
