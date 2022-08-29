import cc from "classcat";
import { useMessage } from "hooks/useMessageContext";
import { useTile } from "hooks/useTileContext";
import { useAlert } from "hooks/useAlertContext";
import Tile from "components/Tile";
import { useUI } from "hooks/useUIContext";
import { TileInterface } from "constants/tile";

export default function Solvedac() {
  const { addTile } = useTile();
  const { message } = useMessage();
  const { push } = useAlert();
  const { theme } = useUI();

  const ItemList = [
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "SolvedAC",
      assets: [
        {
          type: "grid",
          items: [
            { type: "solvedac", id: "r4bb1t", itemType: "profile" },
            { type: "solvedac", id: "r4bb1t", itemType: "tier" },
            { type: "solvedac", id: "r4bb1t", itemType: "badge" },
            { type: "solvedac", id: "r4bb1t", itemType: "class" },
          ],
        },
      ],
    },
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "SolvedAC Profile",
      assets: [{ type: "solvedac", id: "r4bb1t", itemType: "profile" }],
    },
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "SolvedAC Tier",
      assets: [{ type: "solvedac", id: "r4bb1t", itemType: "tier" }],
    },
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "SolvedAC Badge",
      assets: [{ type: "solvedac", id: "r4bb1t", itemType: "badge" }],
    },
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "SolvedAC Class",
      assets: [{ type: "solvedac", id: "r4bb1t", itemType: "class" }],
    },
  ] as TileInterface[];

  return (
    <>
      <div className="panel-title">SolvedAC</div>
      <div className="flex flex-wrap gap-2 justify-center">
        {ItemList.map((item) => (
          <button
            key={item.i}
            onClick={() => {
              addTile(item);
            }}
          >
            <Tile isUIList item={item} />
          </button>
        ))}
      </div>
    </>
  );
}
