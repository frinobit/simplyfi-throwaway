import { usePersonalsContext } from "../hooks/usePersonalsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const PersonalDetails = ({ personal }) => {
  const { dispatch } = usePersonalsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/personals/" + personal._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PERSONAL", payload: json });
    }
  };

  return (
    <div className="personal-details">
      <h4>{personal.name}</h4>
      <p>
        <strong>Contact: </strong>
        {personal.contact}
      </p>
      <p>
        <strong>Date of birth: </strong>
        {personal.date_of_birth}
      </p>
      <p>
        <strong>IC number: </strong>
        {personal.ic_number}
      </p>
      <p>
        <strong>Marital status: </strong>
        {personal.marital_status}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default PersonalDetails;
