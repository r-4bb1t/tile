import cc from "classcat";
import { useMessage } from "hooks/useMessageContext";
import { useTile } from "hooks/useTileContext";
import { useAlert } from "hooks/useAlertContext";
import Tile from "components/Tile";
import { useUI } from "hooks/useUIContext";
import { TileInterface } from "constants/tile";
import { SolvedacIconColored } from "components/Icons";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "hooks/useAuthContext";

export default function Solvedac() {
  const { addTile } = useTile();
  const { message } = useMessage();
  const { push } = useAlert();
  const { theme } = useUI();
  const { solvedac: handle, setSolvedAC } = useAuth();
  const [h, setH] = useState(handle);

  const ItemList = useMemo(
    () =>
      [
        {
          background: theme[Math.floor(Math.random() * theme.length)],
          type: "SolvedAC",
          assets: [
            {
              type: "constant",
              item: "solvedac",
              str: `@${handle ?? "-"}`,
            },
            {
              type: "grid",
              items: [
                { type: "solvedac", id: handle, itemType: "profile" },
                { type: "solvedac", id: handle, itemType: "tier" },
                { type: "solvedac", id: handle, itemType: "badge" },
                { type: "solvedac", id: handle, itemType: "class" },
              ],
              style: { paddingTop: 0 },
            },
          ],
        },
        {
          background: theme[Math.floor(Math.random() * theme.length)],
          type: "SolvedAC Profile",
          assets: [
            {
              type: "constant",
              item: "solvedac",
              str: `@${handle ?? "-"}`,
            },
            { type: "solvedac", id: handle, itemType: "profile", style: { paddingBottom: "1rem" } },
          ],
        },
        {
          background: theme[Math.floor(Math.random() * theme.length)],
          type: "SolvedAC Tier",
          assets: [
            {
              type: "constant",
              item: "solvedac",
              str: `@${handle ?? "-"}`,
            },
            { type: "solvedac", id: handle, itemType: "tier", style: { paddingBottom: "1rem" } },
          ],
        },
        {
          background: theme[Math.floor(Math.random() * theme.length)],
          type: "SolvedAC Badge",
          assets: [
            {
              type: "constant",
              item: "solvedac",
              str: `@${handle ?? "-"}`,
            },
            { type: "solvedac", id: handle, itemType: "badge", style: { paddingBottom: "1rem" } },
          ],
        },
        {
          background: theme[Math.floor(Math.random() * theme.length)],
          type: "SolvedAC Class",
          assets: [
            {
              type: "constant",
              item: "solvedac",
              str: `@${handle ?? "-"}`,
            },
            { type: "solvedac", id: handle, itemType: "class", style: { paddingBottom: "1rem" } },
          ],
        },
      ] as TileInterface[],
    [handle],
  );

  return (
    <>
      <div className="panel-title">SolvedAC</div>
      <div className="flex items-center gap-2">
        <input value={h ?? ""} onChange={(e) => setH(e.target.value)} className="w-full input input-xs" />
        <button className="h-full px-2 btn-xs bg-slate-400 rounded-lg font-bold" onClick={() => setSolvedAC(h)}>
          Apply
        </button>
      </div>
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
