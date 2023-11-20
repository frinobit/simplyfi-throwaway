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

  const formatCurrency = (value) => {
    return `$${new Intl.NumberFormat("en-SG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)}`;
  };

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

  const handleSVGUploadFile = async (selectedFile, coverageId) => {
    if (!selectedFile || !coverageId) {
      alert("Please select a file and provide a coverage ID.");
      return;
    }

    const uniqueFileName = findUniqueName(selectedFile.name, 1);

    const formData = new FormData();
    formData.set("pdf", selectedFile, uniqueFileName);
    formData.set("coverageId", coverageId);

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

  const handleSVGUpload = (coverageId) => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = ".pdf";

    inputElement.addEventListener("change", (event) => {
      const selectedFile = event.target.files[0];
      handleSVGUploadFile(selectedFile, coverageId);
    });

    inputElement.click();
  };

  return (
    <div>
      <div className={DeepDiveCSS.headerContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M18 6q-.825 0-1.413-.588T16 4q0-.825.588-1.413T18 2q.825 0 1.413.588T20 4q0 .825-.588 1.413T18 6Zm-1 16v-8q0-1-.513-1.8t-1.312-1.25l.875-2.575q.2-.625.738-1T18 7q.675 0 1.213.375t.737 1L22.5 16H20v6h-3Zm-4.5-10.5q-.625 0-1.063-.438T11 10q0-.625.438-1.063T12.5 8.5q.625 0 1.063.438T14 10q0 .625-.438 1.063T12.5 11.5ZM5.5 6q-.825 0-1.413-.588T3.5 4q0-.825.588-1.413T5.5 2q.825 0 1.413.588T7.5 4q0 .825-.588 1.413T5.5 6Zm-2 16v-7H2V9q0-.825.588-1.413T4 7h3q.825 0 1.413.588T9 9v6H7.5v7h-4Zm7.5 0v-4h-1v-4q0-.625.438-1.063T11.5 12.5h2q.625 0 1.063.438T15 14v4h-1v4h-3Z"
          />
        </svg>
        <h3>Life Insurance Coverage</h3>
      </div>
      <div className={DeepDiveCSS.table_container}>
        <table className={DeepDiveCSS.table}>
          <thead>
            <tr>
              <th className={DeepDiveCSS.labelColumnTH}>Label</th>
              <th className={DeepDiveCSS.otherColumnsTH}>Premium</th>
              <th className={DeepDiveCSS.otherColumnsTH}>Death</th>
              <th className={DeepDiveCSS.otherColumnsTH}>Illness</th>
              <th className={DeepDiveCSS.otherColumnsTH}>Disability (P)</th>
              <th className={DeepDiveCSS.otherColumnsTH}>Disability (T)</th>
              <th className={DeepDiveCSS.otherColumnsTH}>Medical</th>
              <th className={DeepDiveCSS.otherColumnsTH}>Income</th>
              <th className={DeepDiveCSS.otherColumnsTH}>Accident</th>
              <th className={DeepDiveCSS.otherColumnsTH}>Care</th>
              <th className={DeepDiveCSS.otherColumnsTH}>Upload</th>
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
                    {coverage.premium !== 0
                      ? formatCurrency(coverage.premium)
                      : "N/A"}
                  </td>
                  <td className={DeepDiveCSS.otherColumns}>
                    {coverage.death !== 0
                      ? formatCurrency(coverage.death)
                      : "N/A"}
                  </td>
                  <td className={DeepDiveCSS.otherColumns}>
                    {coverage.illness !== 0
                      ? formatCurrency(coverage.illness)
                      : "N/A"}
                  </td>
                  <td className={DeepDiveCSS.otherColumns}>
                    {coverage.disabilityP !== 0
                      ? formatCurrency(coverage.disabilityP)
                      : "N/A"}
                  </td>
                  <td className={DeepDiveCSS.otherColumns}>
                    {coverage.disabilityT !== 0
                      ? formatCurrency(coverage.disabilityT)
                      : "N/A"}
                  </td>
                  <td className={DeepDiveCSS.otherColumns}>
                    {coverage.medical !== 0
                      ? formatCurrency(coverage.medical)
                      : "N/A"}
                  </td>
                  <td className={DeepDiveCSS.otherColumns}>
                    {coverage.income !== 0
                      ? formatCurrency(coverage.income)
                      : "N/A"}
                  </td>
                  <td className={DeepDiveCSS.otherColumns}>
                    {coverage.accident !== 0
                      ? formatCurrency(coverage.accident)
                      : "N/A"}
                  </td>
                  <td className={DeepDiveCSS.otherColumns}>
                    {coverage.care !== 0
                      ? formatCurrency(coverage.care)
                      : "N/A"}
                  </td>
                  <td className={DeepDiveCSS.otherColumns}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className={DeepDiveCSS.animatedSVG}
                      onClick={() => handleSVGUpload(coverage._id)}
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
