import SnapshotCSS from "../../styles/pages/SnapshotPremium.module.css";

export const AssetsBox = ({ description, amount }) => {
  return (
    <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}>
      <p>{description}</p>
      <p>${amount.toLocaleString()}</p>
    </div>
  );
};

export const LiabilitiesBox = ({ description, amount }) => {
  return (
    <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox}`}>
      <p>{description}</p>
      <p>${amount.toLocaleString()}</p>
    </div>
  );
};
