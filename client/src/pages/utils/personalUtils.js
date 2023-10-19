export const getName = (personals, category) => {
  try {
    // personals[0].name
    const name = personals?.["0"]?.[category];

    if (name) {
      return `${name}`;
    } else {
      return "---";
    }
  } catch (error) {
    // Handle the error here, you can log it or return an error message
    console.log("An error occurred:", error.message);
    return "---";
  }
};
