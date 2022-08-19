import Flag from "../assets//finish.png";
import Mine from "../assets/bomb.png";

export const Tile = ({
  x,
  y,
  isFlagged,
  isMine,
  isRevealed,
  value,
  setFlag,
  showTiles,
}) => {
  return (
    <div className="tile">
      {!isRevealed && (
        <button
          onContextMenu={(e) => {
            setFlag(x, y);
            e.preventDefault();
          }}
          onClick={() => showTiles(x, y)}
        >
          {isFlagged && <img src={Flag} alt="Flag" />}
        </button>
      )}
      {!isMine ? (
        <span className={`Tile-${value}`}>{value !== 0 ? value : ""}</span>
      ) : (
        <img className={`Mine${value}`} src={Mine} alt="Mine" />
      )}
    </div>
  );
};
