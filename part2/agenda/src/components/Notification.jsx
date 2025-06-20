const Notification = ({ message, errorType }) => {
  if (message === null) {
    return null;
  }

  if(errorType) {
    return <div className="confirmation">{message}</div>;
  }

  return <div className="error">{message}</div>;
};

export default Notification;