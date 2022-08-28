import { BACKDROP, BackdropList, THEME, ThemeList } from "constants/theme";
import { useUI } from "hooks/useUIContext";
import cc from "classcat";
import { useMessage } from "hooks/useMessageContext";
import { useTile } from "hooks/useTileContext";
import { useCallback, useEffect, useState } from "react";
import { useAlert } from "hooks/useAlertContext";

export default function Home() {
  const { borderRadius, setBorderRadius, theme, setTheme, backdropFilter, setBackdropFilter } = useUI();
  const { tiles, setTiles } = useTile();
  const { message } = useMessage();
  const { push } = useAlert();

  return (
    <>
      <div className="panel-title">Border Radius</div>
      <input
        className="range range-xs w-full"
        type="range"
        step={4}
        min={0}
        max={20}
        value={borderRadius}
        onChange={(e) => setBorderRadius(parseInt(e.target.value))}
      />
      <div className="panel-title">Theme Palette</div>
      <ul className="flex flex-col">
        {(Object.keys(THEME) as ThemeList[]).map((palette) => (
          <>
            <div className="font-semibold">{palette}</div>
            <li
              className={cc([
                "flex w-min items-center p-1 bg-transparent mb-2",
                theme.every((c) => THEME[palette].includes(c)) && "!bg-black",
              ])}
              key={palette}
              onClick={() => {
                setTheme(THEME[palette]);
                message({
                  content: "Do you want to apply the theme palette to the current tiles?",
                  buttonText: ["YES", "NO"],
                  onClose: () => {
                    setTiles((tiles) =>
                      tiles.map((tile) => {
                        return {
                          ...tile,
                          background: THEME[palette][Math.floor(Math.random() * THEME[palette].length)],
                        };
                      }),
                    );
                    push({ type: "info", message: "Applied to all tiles." });
                  },
                });
              }}
            >
              {THEME[palette].map((color) => (
                <div className="w-6 h-6 m-0" style={{ backgroundColor: color }} key={color}></div>
              ))}
            </li>
          </>
        ))}
      </ul>
      <div className="panel-title">Gradient</div>
      <ul className="flex gap-2 flex-wrap">
        {(Object.keys(BACKDROP) as BackdropList[]).map((backdrop) => (
          <div className="flex flex-col items-center" key={backdrop}>
            <div className="font-semibold text-xs">{backdrop.slice(0, 4)}</div>
            <li
              className="relative w-8 h-8"
              style={{ backgroundColor: theme[0] }}
              onClick={() => {
                setBackdropFilter(BACKDROP[backdrop]);
                push({ type: "info", message: "Applied to all tiles." });
              }}
            >
              <div className="absolute inset-0 tile-mask" style={{ backdropFilter: BACKDROP[backdrop] }} />
              <div
                className={cc(["absolute inset-0", backdropFilter === BACKDROP[backdrop] && "border-4 border-black"])}
              ></div>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}
