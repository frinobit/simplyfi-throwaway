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

export const fetchCoverages = async (user, coveragesDispatch) => {
  if (user) {
    const response = await fetch("/api/coverage", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      coveragesDispatch({ type: "SET_COVERAGES", payload: json });
    }
  }
};
