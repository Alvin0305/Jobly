import { useEffect } from "react";
import { useUser } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import "./usertile.css";
import socket from "../../socket";

const UserTile = ({ user, isFriend }) => {
  const navigate = useNavigate();
  const { user: current_user } = useUser();

  const handleSendFriendRequest = (e) => {
    e.stopPropagation();
    socket.emit("send_connection_request", current_user.id, user.id);
  };

  const handleUnsendFriendRequest = (e) => {
    e.stopPropagation();
    socket.emit("send_disconnection_request", current_user.id, user.id);
  };

  return (
    <div
      className="user-tile"
      onClick={() =>
        navigate(`/home/profile/other/${user.id}`, { state: { user: user } })
      }
    >
      <img src={user?.image} alt="Avatar" className="user-tile-avatar" />
      <h2 className="user-tile-name m0">
        {user?.firstname + " " + user?.lastname}
      </h2>
      <h3 className="user-tile-headline m0">{user?.headline}</h3>
      <h4 className="user-tile-summary m0">
        {user?.summary?.substring(0, 100) + "..."}
      </h4>
      <button
        className={`user-tile-button ${isFriend ? "user-tile-followed" : ""}`}
        onClick={
          isFriend
            ? (e) => handleUnsendFriendRequest(e)
            : (e) => handleSendFriendRequest(e)
        }
      >
        {isFriend ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
};

export default UserTile;
