import HomeCSS from "../styles/pages/Home.module.css";

const PersonalDetails = ({ personal }) => {
  return (
    <div className={HomeCSS.personal_details}>
      <h3>PersonalDetails</h3>
      <p>
        <strong>user_id: </strong>
        {personal.user_id}
      </p>
      <p>
        <strong>title: </strong>
        {personal.title}
      </p>
      <p>
        <strong>name: </strong>
        {personal.name}
      </p>
      <p>
        <strong>date_of_birth: </strong>
        {personal.date_of_birth}
      </p>
      <p>
        <strong>nationality: </strong>
        {personal.nationality}
      </p>
      <p>
        <strong>other_nationality: </strong>
        {personal.other_nationality}
      </p>
      <p>
        <strong>nric: </strong>
        {personal.nric}
      </p>
      <p>
        <strong>address: </strong>
        {personal.address}
      </p>
      <p>
        <strong>mobile: </strong>
        {personal.mobile}
      </p>
      <p>
        <strong>email: </strong>
        {personal.email}
      </p>
      <p>
        <strong>marital_status: </strong>
        {personal.marital_status}
      </p>
      <p>
        <strong>gender: </strong>
        {personal.gender}
      </p>
      <p>
        <strong>highest_qualification: </strong>
        {personal.highest_qualification}
      </p>
      <p>
        <strong>income_range: </strong>
        {personal.income_range}
      </p>
      <p>
        <strong>spoken_language: </strong>
        {personal.spoken_language}
      </p>
      <p>
        <strong>other_spoken_language: </strong>
        {personal.other_spoken_language}
      </p>
      <p>
        <strong>written_language: </strong>
        {personal.written_language}
      </p>
      <p>
        <strong>other_written_language: </strong>
        {personal.other_written_language}
      </p>
      <p>
        <strong>smoking: </strong>
        {personal.smoking}
      </p>
      <p>
        <strong>pep: </strong>
        {personal.pep}
      </p>
      <p>
        <strong>employment_status: </strong>
        {personal.employment_status}
      </p>
      <p>
        <strong>other_employment_status: </strong>
        {personal.other_employment_status}
      </p>
      <p>
        <strong>employer: </strong>
        {personal.employer}
      </p>
      <p>
        <strong>dependants: </strong>
        {personal.dependants}
      </p>
    </div>
  );
};

export default PersonalDetails;
