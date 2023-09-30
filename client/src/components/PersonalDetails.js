const PersonalDetails = ({ personal }) => {
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
    </div>
  );
};

export default PersonalDetails;
