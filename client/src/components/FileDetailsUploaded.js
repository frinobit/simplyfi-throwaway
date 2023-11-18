import FileDetailsCSS from "../styles/components/FileDetails.module.css";
import { useFilesContext } from "../hooks/useFilesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// api
import { fetchFiles } from "../pages/api";

const FileDetailsUploaded = ({ file }) => {
  const { user } = useAuthContext();
  const { dispatch: filesDispatch } = useFilesContext();

  const handleSummaryClick = async () => {
    const response = await fetch("/openai/generate_summary", {
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
      fetchFiles(user, filesDispatch);
    }
  };

  const handleDeleteClick = async () => {
    const response = await fetch("/file/policy/" + file._id, {
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
          onClick={handleSummaryClick}
        >
          <path
            fill="currentColor"
            d="M7 17h2v-5H7v5Zm8 0h2V7h-2v10Zm-4 0h2v-3h-2v3Zm0-5h2v-2h-2v2Zm-6 9q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm0-2h14V5H5v14ZM5 5v14V5Z"
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

export default FileDetailsUploaded;
