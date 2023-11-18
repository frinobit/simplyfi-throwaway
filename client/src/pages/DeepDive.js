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
import FileDetailsUploaded from "../components/FileDetailsUploaded";
import FileDetailsSummary from "../components/FileDetailsSummary";

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

  const handleAddNewClick = async () => {
    const response = await fetch("/api/coverage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      fetchCoverages(user, coveragesDispatch);
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
                    <th className={DeepDiveCSS.otherColumns}>Upload</th>
                  </tr>
                </thead>
                <tbody>
                  {coverages && coverages.length > 0 ? (
                    coverages.map((coverage) => (
                      <tr key={coverage._id}>
                        <td className={DeepDiveCSS.labelColumn}>
                          {coverage.label !== "" ? coverage.label : "N/A"}
                        </td>
                        <td className={DeepDiveCSS.otherColumns}>
                          {coverage.premium !== 0 ? coverage.premium : "N/A"}
                        </td>
                        <td className={DeepDiveCSS.otherColumns}>
                          {coverage.death !== 0 ? coverage.death : "N/A"}
                        </td>
                        <td className={DeepDiveCSS.otherColumns}>
                          {coverage.illness !== 0 ? coverage.illness : "N/A"}
                        </td>
                        <td className={DeepDiveCSS.otherColumns}>
                          {coverage.disabilityP !== 0
                            ? coverage.disabilityP
                            : "N/A"}
                        </td>
                        <td className={DeepDiveCSS.otherColumns}>
                          {coverage.disabilityT !== 0
                            ? coverage.disabilityT
                            : "N/A"}
                        </td>
                        <td className={DeepDiveCSS.otherColumns}>
                          {coverage.medical !== 0 ? coverage.medical : "N/A"}
                        </td>
                        <td className={DeepDiveCSS.otherColumns}>
                          {coverage.income !== 0 ? coverage.income : "N/A"}
                        </td>
                        <td className={DeepDiveCSS.otherColumns}>
                          {coverage.accident !== 0 ? coverage.accident : "N/A"}
                        </td>
                        <td className={DeepDiveCSS.otherColumns}>
                          {coverage.care !== 0 ? coverage.care : "N/A"}
                        </td>
                        <td className={DeepDiveCSS.otherColumns}>
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
              <button onClick={handleAddNewClick}>Add New</button>
            </div>
          </div>
          <div className={DeepDiveCSS.row_container}>
            <h3>Upload a PDF!</h3>
            <h3>Ask me a question on the right! OR</h3>
            <h3>Generate a summary by pressing the icon!</h3>
            <div
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
                    <FileDetailsUploaded key={file._id} file={file} />
                  ))}
              </div>
            ) : null}
            <div>
              <p>Summary generated:</p>
              {files && files.length > 0 ? (
                <div>
                  {files
                    .filter((file) => file.type === "summary")
                    .map((file) => (
                      <FileDetailsSummary key={file._id} file={file} />
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
