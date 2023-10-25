import SnapshotCSS from "../../styles/pages/SnapshotBasic.module.css";

export const AssetsBox = ({ description, amount }) => {
  return (
    <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}>
      <p>{description}</p>
      <div className={SnapshotCSS.arrow}>
        <p>${amount.toLocaleString()}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 20V4m0 0l6 6m-6-6l-6 6"
          />
        </svg>
      </div>
    </div>
  );
};

export const LiabilitiesBox = ({ description, amount }) => {
  return (
    <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox}`}>
      <p>{description}</p>
      <div className={SnapshotCSS.arrow}>
        <p>${amount.toLocaleString()}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 4v16m0 0l6-6m-6 6l-6-6"
          />
        </svg>
      </div>
    </div>
  );
};
