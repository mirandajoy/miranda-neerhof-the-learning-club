import ButtonLink from "../ButtonLink/ButtonLink";

import "./EmptyList.scss";

const EmptyList = ({ text, owned }) => {
  return (
    <div className="empty-list">
      <p className="body body--dark">{text}</p>
      {owned && (
        <div className="empty-list__btn-container">
          <ButtonLink styleType="secondary" label="Create Event" link="/events/create" size="min-width-m" />
        </div>
      )}
    </div>
  );
};

export default EmptyList;
