import { useUI } from "hooks/useUIContext";
import { useEffect, useState } from "react";

export default function Header() {
  const { uiMode, setUIMode } = useUI();

  const toggleUIMode = () => {
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
  };

  useEffect(() => {
    toggleUIMode();
  }, [toggleUIMode, uiMode]);

  return (
    <div className="w-full">
      <button onClick={() => setUIMode((s: boolean) => !s)}>UI MODE</button>
    </div>
  );
}
