import { useUser } from "../../../../../contexts/userContext";
import { createChat } from "../../../../../services/chatService";
import "./searchtile.css";

const SearchTile = ({ user, known }) => {
  const { user: user1 } = useUser();

  const handleCreateChat = async () => {
    try {
      const response = await createChat(user.id, user1.token);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-search-tile">
      <img
        src={user.image || "/avatar.webp"}
        alt="Avatar"
        className="chat-avatar"
      />
      <div className="flex space-between width-100 align-center">
        <div className="flex gap-10 align-center">
          <h4 className="m0">{user.firstname}</h4>
          <h4 className="m0">{user.lastname}</h4>
        </div>
        <div className="chat-role-button-div">
          <h4 className="chat-search-tile-role">{user.role}</h4>
          {!known && (
            <button className="start-chat-button" onClick={handleCreateChat}>
              Chat
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchTile;
