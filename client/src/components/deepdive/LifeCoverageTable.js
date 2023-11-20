import DeepDiveCSS from "../../styles/pages/DeepDive.module.css";

// context
import { useFilesContext } from "../../hooks/useFilesContext";
import { useCoveragesContext } from "../../hooks/useCoveragesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

// api
import { fetchFiles, fetchCoverages } from "../../pages/api";

const LifeCoverageTable = ({ coverages }) => {
  const { user } = useAuthContext();
  const { files, dispatch: filesDispatch } = useFilesContext();
  const { dispatch: coveragesDispatch } = useCoveragesContext();

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

  const findUniqueName = (name, count) => {
    const fileExt = name.split(".").pop();
    const fileName = name.replace(/\.[^/.]+$/, "");

    const newName = count === 1 ? fileName : `${fileName}(${count})`;
    const updatedName = fileExt ? `${newName}.${fileExt}` : newName;
    const fileExists = files.find((file) => file.fileName === updatedName);

    return fileExists ? findUniqueName(name, count + 1) : updatedName;
  };

  const handleSVGUploadFile = async (selectedFile) => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const uniqueFileName = findUniqueName(selectedFile.name, 1);

    const formData = new FormData();
    formData.set("pdf", selectedFile, uniqueFileName);

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
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSVGUpload = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = ".pdf";

    inputElement.addEventListener("change", (event) => {
      const selectedFile = event.target.files[0];
      handleSVGUploadFile(selectedFile);
    });

    inputElement.click();
  };

  return (
    <div>
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
                    {coverage.disabilityP !== 0 ? coverage.disabilityP : "N/A"}
                  </td>
                  <td className={DeepDiveCSS.otherColumns}>
                    {coverage.disabilityT !== 0 ? coverage.disabilityT : "N/A"}
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
                      onClick={handleSVGUpload}
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
  );
};

export default LifeCoverageTable;
