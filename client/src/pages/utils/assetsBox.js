import SnapshotCSS from "../../styles/pages/SnapshotPremium.module.css";

const AssetsBox = ({ description, amount }) => {
  return (
    <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}>
      <p>{description}</p>
      <p>${amount.toLocaleString()}</p>
    </div>
  );
};

export default AssetsBox;