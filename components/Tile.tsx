/* eslint-disable @next/next/no-img-element */
import React, { forwardRef, useEffect, useRef, useState } from "react";
import cc from "classcat";
import { TileInterface, TileType } from "constants/tile";
import { useUI } from "hooks/useUIContext";
import Commits from "./Commits";
import Solvedac from "./Solvedac";

const AssetToComponent = (asset: TileType, index: number, size: number[]) => {
  const [value, setValue] = useState("");
  const { uiMode } = useUI();
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (asset.type === "string") setValue(asset.str);
  }, [asset]);

  switch (asset.type) {
    case "image":
      return <img src={asset.url} className="object-cover" alt="image" key={"image" + index} />;
    case "string":
      return (
        <div className="p-2 flex items-center" key={"string" + index}>
          <div
            className={cc([
              "w-full h-min outline-none py-1 px-2 resize-none overflow-hidden transition-all text-center",
              uiMode && "bg-white bg-opacity-20 focus:bg-opacity-50",
            ])}
            contentEditable={uiMode}
            onChange={() => setValue(textRef.current!.innerText)}
            style={asset.style}
            ref={textRef}
          >
            {value}
          </div>
        </div>
      );
    case "commit":
      return <Commits id="r-4bb1t" size={size} key={"commit" + index} />;
    case "solvedac":
      return <Solvedac id="r4bb1t" key={"solvedac" + index} />;
    case "list":
      return (
        <ul className="pl-8 pr-2" style={asset.style}>
          {asset.items.map((item, i) => (
            <li
              key={i}
              contentEditable={uiMode}
              className={cc(["transition-all px-1 m-1", uiMode && "bg-white bg-opacity-20 focus:bg-opacity-50"])}
            >
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};

const Tile = ({ item, close }: { item: TileInterface; close: Function }) => {
  const { borderRadius } = useUI();
  return (
    <div
      className={cc(["flex flex-col justify-center w-full h-full overflow-auto select-none"])}
      style={{
        background: item.background,
        borderRadius: `${borderRadius}px`,
      }}
    >
      <div className="flex justify-between px-2 py-1 absolute inset-x-0 top-0 text-white ui-only drop-shadow-md">
        {item.type}
        <button type="button" className="" onClick={() => close()}>
          ×
        </button>
      </div>
      {item.assets.map((asset, index) => AssetToComponent(asset, index, [item.w, item.h]))}
    </div>
  );
};
export default Tile;
