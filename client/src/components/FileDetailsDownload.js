import FileDetailsCSS from "../styles/components/FileDetails.module.css";
import { useAuthContext } from "../hooks/useAuthContext";

const FileDetailsDownload = ({ file }) => {
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

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
          d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5Zm-6 4q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Z"
        />
      </svg>
    </div>
  );
};

export default FileDetailsDownload;
