import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Notifications = () => {

    const notification = {id:'a',title:'a',date:'2019-09-09'}
    const notifications = [{id:'a',title:'a',date:'2019-09-09'}]

  const notificationList = notifications.map(notification => {
    return (
      <div className="toast" key={`notification_${notification.id}`}>
        <div className="toast-header">
          <i className="fas fa-fw fa-bell"></i>
          <strong className="mr-auto">{notification.title}</strong>
          <small></small>
          <button type="button"
            className="ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
            >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">
          {notification.text}
        </div>
      </div>
    )
  });

  return (
    <div className="toast-wrapper">
      {notificationList}
    </div>
  );
};

export default Notifications;
