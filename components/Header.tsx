import { IconType } from "constants/tile";
import { useAlert } from "hooks/useAlertContext";
import { useAuth } from "hooks/useAuthContext";
import { useTile } from "hooks/useTileContext";
import { useUI } from "hooks/useUIContext";
import { useCallback, useEffect, useState } from "react";

export default function Header() {
  const { uiMode, setUIMode, borderRadius, theme, shadow, backdropFilter } = useUI();
  const { tiles } = useTile();
  const { push } = useAlert();
  const { solvedac, session } = useAuth();

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
    try {
      localStorage.setItem(
        "data",
        JSON.stringify({
          tiles,
          borderRadius,
          theme,
          backdropFilter,
          shadow,
          solvedac,
          github: session?.user?.name,
        }),
      );
      push({ type: "success", message: "Saved!" });
    } catch (e) {
      push({ type: "error", message: "Save Failed." });
    }
  };

  useEffect(() => {
    toggleUIMode();
  }, [toggleUIMode, uiMode]);

  return (
    <div className="w-full px-8 h-16 fixed z-[100] bg-white inset-x-0 top-0 flex justify-between items-center font-semibold text-slate-500 border-b-slate-200 border-b-[1px]">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          UI MODE
          <input type="checkbox" className="toggle border-2" checked={uiMode} onChange={() => setUIMode((s) => !s)} />
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
