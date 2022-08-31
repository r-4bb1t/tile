import { IconType } from "constants/tile";
import { useAlert } from "hooks/useAlertContext";
import { useAuth } from "hooks/useAuthContext";
import { useTile } from "hooks/useTileContext";
import { useUI } from "hooks/useUIContext";
import { useCallback, useEffect, useState } from "react";
import { FaDownload, FaSave } from "react-icons/fa";
import cc from "classcat";

export default function Header() {
  const { uiMode, setUIMode, borderRadius, theme, shadow, backdropFilter } = useUI();
  const { tiles, tilesRef } = useTile();
  const { push } = useAlert();
  const { solvedac, session } = useAuth();
  const [printMode, setPrintMode] = useState(false);

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
    if (printMode) setUIMode(false);
  }, [printMode]);

  const download = useCallback(async () => {
    setPrintMode(true);
    setTimeout(() => {
      window.print();
      setPrintMode(false);
    }, 1000);

    /* const element = tilesRef.current;
    if (!element) {
      push({ type: "error", message: "Failed to download." });
      return;
    } */

    /* try {
      const data = element.outerHTML;
      const link = document.createElement("a");

      if (typeof link.download === "string") {
        link.href = data;
        link.download = "image.html";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(data);
      }
    } catch (e) {
      console.log(e);
    } */
  }, []);

  useEffect(() => {
    toggleUIMode();
  }, [toggleUIMode, uiMode]);

  return (
    <div
      className={cc([
        "w-full px-8 h-16 fixed z-[100] bg-white inset-x-0 top-0 flex justify-between items-center font-semibold text-slate-500 border-b-slate-200 border-b-[1px]",
        printMode && "hidden",
      ])}
    >
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          UI MODE
          <input type="checkbox" className="toggle border-2" checked={uiMode} onChange={() => setUIMode((s) => !s)} />
        </label>
      </div>
      <div className="flex items-center gap-4">
        <button className="btn btn-ghost flex items-center justify-center gap-2" onClick={() => save()}>
          <FaSave />
          SAVE
        </button>
        <button className="btn btn-ghost flex items-center justify-center gap-2" onClick={() => download()}>
          <FaDownload />
          DOWNLOAD
        </button>
      </div>
    </div>
  );
}
