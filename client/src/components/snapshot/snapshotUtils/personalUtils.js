export const getName = (personals, category) => {
  try {
    const name = personals?.["0"]?.[category];

    if (name) {
      return `${name}`;
    } else {
      return "---";
    }
  } catch (error) {
    console.log("An error occurred:", error.message);
    return "---";
  }
};
