import SnapshotCSS from "../../styles/pages/Snapshot.module.css";

const LiabilitiesBox = ({ description, amount }) => {
  return (
    <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox}`}>
      <p>{description}</p>
      <p>`${amount.toLocaleString()}`</p>
    </div>
  );
};

export default LiabilitiesBox;
