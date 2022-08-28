import { motion } from "framer-motion";
import { useTile } from "hooks/useTileContext";
import { CSSProperties, useEffect, useRef } from "react";
import { AlignIcon } from "./Icons";
import cc from "classcat";

export default function StyleFloat({
  type,
  close,
  id,
  index,
}: {
  type: "string" | "icon";
  close: Function;
  id: string;
  index: number;
}) {
  const styleFloatRef = useRef<HTMLDivElement>(null);
  const { tiles, setTiles } = useTile();

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (
        styleFloatRef.current &&
        !styleFloatRef.current.contains(e.target as Node) &&
        !styleFloatRef.current.parentElement?.contains(e.target as Node)
      )
        close();
    });
  }, []);

  const getTileAttribute = (attribute: keyof CSSProperties) => {
    return tiles.filter((tile) => tile.i === id)[0].assets[index].style[attribute] as any;
  };

  const applyStyle = (style: CSSProperties) => {
    setTiles((tiles) =>
      tiles.map((tile) => {
        if (tile.i === id)
          return {
            ...tile,
            assets: tile.assets.map((asset, i) => {
              if (i === index) return { ...asset, style: { ...asset.style, ...style } };
              return asset;
            }),
          };
        return tile;
      }),
    );
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
      className="absolute bottom-full text-left z-[100] -translate-y-3 origin-bottom bg-white p-4 drop-shadow-lg rounded flex justify-center text-sm gap-2"
      ref={styleFloatRef}
    >
      {type === "string" && (
        <>
          <div className="flex flex-col gap-1">
            <div className="font-bold pl-1">Size</div>
            <select
              onChange={(e) => {
                applyStyle(JSON.parse(e.target.value));
              }}
              defaultValue={JSON.stringify({
                fontSize: getTileAttribute("fontSize"),
              })}
              className="input input-xs input-bordered"
            >
              <option className="text-xs" value={JSON.stringify({ fontSize: "0.75rem" })}>
                XS
              </option>
              <option className="text-sm" value={JSON.stringify({ fontSize: "0.875rem" })}>
                S
              </option>
              <option className="text-base" value={JSON.stringify({ fontSize: "1rem" })}>
                M
              </option>
              <option className="text-lg" value={JSON.stringify({ fontSize: "1.125rem" })}>
                L
              </option>
              <option className="text-xl" value={JSON.stringify({ fontSize: "1.25rem" })}>
                XL
              </option>
              <option className="text-2xl" value={JSON.stringify({ fontSize: "1.5rem" })}>
                2XL
              </option>
              <option className="text-3xl" value={JSON.stringify({ fontSize: "1.875rem" })}>
                3XL
              </option>
              <option className="text-4xl" value={JSON.stringify({ fontSize: "2.25rem" })}>
                4XL
              </option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <div className="font-bold pl-1">Weight</div>
            <select
              onChange={(e) => {
                applyStyle(JSON.parse(e.target.value));
              }}
              defaultValue={JSON.stringify({
                fontWeight: getTileAttribute("fontWeight"),
              })}
              className="input input-xs input-bordered"
            >
              <option className="font-thin" value={JSON.stringify({ fontWeight: 100 })}>
                thin
              </option>
              <option className="font-light" value={JSON.stringify({ fontWeight: 300 })}>
                light
              </option>
              <option className="font-normal" value={JSON.stringify({ fontWeight: 400 })}>
                normal
              </option>
              <option className="font-bold" value={JSON.stringify({ fontWeight: 700 })}>
                bold
              </option>
              <option className="font-black" value={JSON.stringify({ fontWeight: 900 })}>
                black
              </option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <div className="font-bold pl-1">Align</div>
            <div className="flex">
              {["left", "center", "right"].map((align) => (
                <button
                  key={align}
                  className={cc([
                    "w-6 h-6 fill-slate-600 rounded",
                    (getTileAttribute("textAlign") ?? "left") === align && "bg-slate-200",
                  ])}
                  onClick={() => applyStyle({ textAlign: align as "left" | "center" | "right" })}
                >
                  <AlignIcon align={align} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="font-bold pl-1">color</div>
            <div
              className="w-6 h-6 rounded-full border-2 border-slate-300"
              style={{ backgroundColor: getTileAttribute("color") }}
            ></div>
          </div>
        </>
      )}

      <div className="border-x-transparent border-x-8 border-t-8 border-t-white absolute -bottom-1 left-4 w-0 h-0" />
    </motion.div>
  );
}
