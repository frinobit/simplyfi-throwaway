export const fetchFiles = async (user, filesDispatch) => {
  if (user) {
    const response = await fetch("/file", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      filesDispatch({ type: "SET_FILES", payload: json });
    }
  }
};
