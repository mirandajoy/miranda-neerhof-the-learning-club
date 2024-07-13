import "./EmptyList.scss";

const EmptyList = ({text}) => {
  return (
    <div className="empty-list">
      <p className="body body--dark">{text}</p>
    </div>
  );
};

export default EmptyList;