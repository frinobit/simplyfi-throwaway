import FileDetailsCSS from "../styles/components/FileDetails.module.css";
import { useFilesContext } from "../hooks/useFilesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// api
import { fetchFiles } from "../pages/api";

const FileDetailsSummary = ({ file }) => {
  const { user } = useAuthContext();
  const { dispatch: filesDispatch } = useFilesContext();

  const handleDownloadClick = async () => {
    const response = await fetch("/file/summary/" + file._id, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: file.fileName,
      }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } else {
      console.error("Failed to download the file");
    }
  };

  const handleDeleteClick = async () => {
    const response = await fetch("/file/summary/" + file._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: file.fileName,
      }),
    });

    if (response.ok) {
      fetchFiles(user, filesDispatch);
    }
  };

  return (
    <div className={FileDetailsCSS.file_details}>
      <p>{file.fileName}</p>
      <div className={FileDetailsCSS.icons}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          onClick={handleDownloadClick}
        >
          <path
            fill="currentColor"
            d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5Zm-6 4q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          onClick={handleDeleteClick}
        >
          <path
            fill="currentColor"
            d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default FileDetailsSummary;
