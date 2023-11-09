import FileDetailsCSS from "../styles/components/FileDetails.module.css";
import { useFilesContext } from "../hooks/useFilesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// api
import { fetchFiles } from "../pages/api";

const FileDetailsDelete = ({ file }) => {
  const { dispatch } = useFilesContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

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
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_FINANCIAL", payload: json });
      fetchFiles(user, dispatch);
    }
  };

  return (
    <div className={FileDetailsCSS.file_details}>
      <p>{file.fileName}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        onClick={handleClick}
      >
        <path
          fill="currentColor"
          d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
        />
      </svg>
    </div>
  );
};

export default FileDetailsDelete;
