import { BACKDROP, BackdropList, SHADOW, THEME, ThemeList } from "constants/theme";
import { useUI } from "hooks/useUIContext";
import cc from "classcat";
import { useMessage } from "hooks/useMessageContext";
import { useTile } from "hooks/useTileContext";
import { useCallback, useEffect, useState } from "react";
import { useAlert } from "hooks/useAlertContext";

export default function Home() {
  const { borderRadius, setBorderRadius, theme, setTheme, backdropFilter, setBackdropFilter, shadow, setShadow } =
    useUI();
  const { tiles, setTiles } = useTile();
  const { message } = useMessage();
  const { push } = useAlert();

  return (
    <>
      <div className="panel-title">Border Radius</div>
      <input
        className="range range-xs flex-shrink-0 w-full"
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
            <div className="font-semibold flex items-center">
              {palette}
              <button
                className="w-4 h-4 p-1 mt-0.5"
                onClick={() =>
                  message({
                    content: "Do you want to apply the theme palette to the current tiles?",
                    buttonText: ["YES", "NO"],
                    onClose: () => {
                      setTheme(THEME[palette]);
                      setTiles((tiles) =>
                        tiles.map((tile, i) => {
                          return {
                            ...tile,
                            background: THEME[palette][Math.floor(Math.random() * THEME[palette].length)],
                          };
                        }),
                      );
                      push({ type: "info", message: "Applied to all tiles." });
                    },
                  })
                }
              >
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 118.04 122.88"
                  className="w-full aspect-square"
                >
                  <path d="M16.08,59.26A8,8,0,0,1,0,59.26a59,59,0,0,1,97.13-45V8a8,8,0,1,1,16.08,0V33.35a8,8,0,0,1-8,8L80.82,43.62a8,8,0,1,1-1.44-15.95l8-.73A43,43,0,0,0,16.08,59.26Zm22.77,19.6a8,8,0,0,1,1.44,16l-10.08.91A42.95,42.95,0,0,0,102,63.86a8,8,0,0,1,16.08,0A59,59,0,0,1,22.3,110v4.18a8,8,0,0,1-16.08,0V89.14h0a8,8,0,0,1,7.29-8l25.31-2.3Z"></path>
                </svg>
              </button>
            </div>
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
                      tiles.map((tile, i) => {
                        return {
                          ...tile,
                          background: THEME[palette][i % THEME[palette].length],
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
      <div className="panel-title">Shadow</div>
      <ul className="flex gap-2 flex-wrap">
        {SHADOW.map((s) => (
          <li
            className={cc(["w-8 h-8", shadow === s && "border-4 border-black"])}
            style={{ boxShadow: s, backgroundColor: theme[0] }}
            key={s}
            onClick={() => {
              setShadow(s);
            }}
          ></li>
        ))}
      </ul>
    </>
  );
}
