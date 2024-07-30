import ButtonLink from '../ButtonLink/ButtonLink';

import "./EmptyList.scss";

const EmptyList = ({text}) => {
  return (
    <div className="empty-list">
      <p className="body body--dark">{text}</p>
      <ButtonLink styleType="primary" label="Create Event" link="/events/create" />
    </div>
  );
};

export default EmptyList;