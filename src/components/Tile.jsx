import Flag from "../assets//finish.png";
import Mine from "../assets/bomb.png";
import { useTheme } from "../customHooks";
import { styles } from "../styles/themeStyles";

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
  const theme = useTheme();
  return (
    <div className="tile" style={styles[`${theme}`].TileStyles.tile}>
      {!isRevealed && (
        <button
          className="tile-button"
          onContextMenu={(e) => {
            setFlag(x, y);
            e.preventDefault();
          }}
          onClick={(e) => {
            showTiles(x, y);
            e.stopPropagation();
          }}
          style={styles[`${theme}`].TileStyles.tileButton}
        >
          {isFlagged && <img className="tile-image" src={Flag} alt="Flag" />}
        </button>
      )}
      {!isMine ? (
        <span className="tile-value" id={`Tile-${value}`}>
          {value !== 0 ? value : ""}
        </span>
      ) : (
        <img className="tile-image" id={`Mine${value}`} src={Mine} alt="Mine" />
      )}
    </div>
  );
};
