import { IconType } from "constants/tile";
import { useAlert } from "hooks/useAlertContext";
import { useTile } from "hooks/useTileContext";
import { useUI } from "hooks/useUIContext";
import { useCallback, useEffect, useState } from "react";

export default function Header() {
  const { uiMode, setUIMode } = useUI();
  const { tiles } = useTile();
  const { push } = useAlert();
  const [autosave, setAutosave] = useState(false);
  const [autosaveInterval, setAutosaveInterval] = useState(null as NodeJS.Timer | null);

  const toggleUIMode = useCallback(() => {
    if (uiMode) {
      document.querySelectorAll(".ui-only").forEach((ui) => {
        ui.setAttribute("style", (ui.getAttribute("style") || "").replace(" display: none;", ""));
      });
      document.querySelectorAll(".react-resizable-handle").forEach((ui) => {
        ui.setAttribute("style", (ui.getAttribute("style") || "").replace(" display: none;", ""));
      });
    } else {
      document.querySelectorAll(".ui-only").forEach((ui) => {
        ui.setAttribute("style", (ui.getAttribute("style") ?? "") + " display: none;");
      });
      document.querySelectorAll(".react-resizable-handle").forEach((ui) => {
        ui.setAttribute("style", (ui.getAttribute("style") ?? "") + " display: none;");
      });
    }
  }, [uiMode]);

  const save = () => {
    localStorage.setItem(
      "data",
      JSON.stringify({
        /*      tiles: tiles.map((tile) => {
          return {
            ...tile,
            assets: tile.assets.map((asset) => {
              if ("item" in asset) return { ...asset, item: asset.item.innerHTML };
              if ("items" in asset)
                return {
                  ...asset,
                  items: asset.items.map((item) => {
                    if (typeof item === "string") {
                      return item;
                    } else if (item.type === "constant") {

                    } else return item;
                  }),
                };
              return { ...asset };
            }),
          };
        }), */
        tiles,
        autosave,
      }),
    );
    push({ type: "success", message: "Saved!" });
  };

  useEffect(() => {
    if (autosave) setAutosaveInterval(setInterval(save, 6000000));
    else {
      clearInterval(autosaveInterval!);
      setAutosaveInterval(null);
    }
  }, [autosave]);

  useEffect(() => {
    toggleUIMode();
  }, [toggleUIMode, uiMode]);

  useEffect(() => {
    if (localStorage.getItem("data")) setAutosave(JSON.parse(localStorage.getItem("data")!).autosave ?? true);
  }, []);

  return (
    <div className="w-full px-8 h-16 fixed z-[100] bg-white inset-x-0 top-0 flex justify-between items-center font-semibold text-slate-500 border-b-slate-200 border-b-[1px]">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          UI MODE
          <input type="checkbox" className="toggle border-2" checked={uiMode} onChange={() => setUIMode((s) => !s)} />
        </label>
        <label className="flex items-center gap-2">
          AUTO SAVE
          <input
            type="checkbox"
            className="toggle border-2"
            checked={autosave}
            onChange={() => setAutosave((s) => !s)}
          />
        </label>
      </div>
      <div className="flex items-center gap-4">
        <button className="btn btn-ghost" onClick={() => save()}>
          SAVE
        </button>
      </div>
    </div>
  );
}
