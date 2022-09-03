import '../styles/Notification.css';

const Notification = ({ type, message }) => {
  if (message === null) {
    return null;
  }
  return <div className={`${type} notification`}>{message}</div>;
};

export default Notification;
