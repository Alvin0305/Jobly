import "./feedbubble.css";

const FeedBubble = ({ name, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`feed-bubble ${selected && "selected-feed-bubble"}`}
    >
      <h4 className="m0 feed-bubble-text">{name}</h4>
    </div>
  );
};

export default FeedBubble;
