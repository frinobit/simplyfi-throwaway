import { useFilesContext } from "../hooks/useFilesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// api
import { fetchFiles } from "../pages/utils/api";

const FileDetails = ({ file }) => {
  const { dispatch } = useFilesContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/file/" + file._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        filename: file.filename,
      }),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_FINANCIAL", payload: json });
      fetchFiles(user, dispatch);
    }
  };

  return (
    <div className="file-details">
      <p>{file.filename}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default FileDetails;
