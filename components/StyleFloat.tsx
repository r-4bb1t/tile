import { AnimatePresence, motion } from "framer-motion";
import { useTile } from "hooks/useTileContext";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { AlignIcon } from "./Icons";
import cc from "classcat";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { GridType, IconType } from "constants/tile";

export default function StyleFloat({
  type,
  close,
  id,
  index,
  itemIndex,
}: {
  type: "string" | "gridIcon" | "icon";
  close: Function;
  id: string;
  index: number;
  itemIndex?: number;
}) {
  const styleFloatRef = useRef<HTMLDivElement>(null);
  const { tiles, setTiles } = useTile();
  const [isColorPickerOn, setIsColorPickerOn] = useState(false);
  const [link, setLink] = useState("");

  const getTileAttribute = (attribute: keyof CSSProperties) => {
    return tiles.filter((tile) => tile.i === id)[0].assets[index].style[attribute] as any;
  };

  const getGridIconColor = () =>
    ((tiles.filter((tile) => tile.i === id)[0].assets[index] as GridType).items[itemIndex!] as IconType).attributes
      .color;

  const [color, setColor] = useColor(
    "hex",
    (type === "gridIcon" ? getGridIconColor() : getTileAttribute("color")) ?? "black",
  );

  const normalizedLink = (s: string) => {
    if (!link.startsWith("http")) return "http://" + link;
    else return link;
  };

  useEffect(() => {
    if (type === "string")
      setTiles((tiles) =>
        tiles.map((tile) => {
          if (tile.i === id)
            return {
              ...tile,
              assets: tile.assets.map((asset, i) => {
                if (i === index) return { ...asset, link: link === "" ? null : normalizedLink(link) };
                return asset;
              }),
            };
          return tile;
        }),
      );
    else if (type === "gridIcon")
      setTiles((tiles) =>
        tiles.map((tile) => {
          if (tile.i === id)
            return {
              ...tile,
              assets: (tile.assets as GridType[]).map((asset: GridType, i) => {
                if (i === index)
                  return {
                    ...asset,
                    items: asset.items.map((item, ii) => {
                      if (ii === itemIndex) {
                        //@ts-ignore
                        return { ...item, link: link === "" ? null : normalizedLink(link) };
                      }
                      return item;
                    }),
                  };
                return asset;
              }),
            };
          return tile;
        }),
      );
  }, [link]);

  useEffect(() => {
    applyStyle({ color: color.hex });
    applyStyle({ fill: color.hex });
    applyStyle({ stroke: color.hex });
  }, [color]);

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

  const applyStyle = (style: CSSProperties | Object) => {
    if (type === "string")
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
    else if (type === "gridIcon")
      setTiles((tiles) =>
        tiles.map((tile) => {
          if (tile.i === id)
            return {
              ...tile,
              assets: (tile.assets as GridType[]).map((asset: GridType, i) => {
                if (i === index)
                  return {
                    ...asset,
                    items: asset.items.map((item, ii) => {
                      if (ii === itemIndex) {
                        //@ts-ignore
                        return { ...item, attributes: { ...item.attributes, ...style } };
                      }
                      return item;
                    }),
                  };
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
      className="pretendard absolute bottom-full text-black text-left z-[100] flex flex-col -translate-y-3 origin-bottom bg-white p-4 drop-shadow-lg rounded text-sm gap-2"
      ref={styleFloatRef}
    >
      <div className="flex w-full gap-2">
        {type === "string" && (
          <>
            <div className="flex flex-col gap-1">
              <div className="font-bold pl-1">Font</div>
              <select
                onChange={(e) => {
                  applyStyle(JSON.parse(e.target.value));
                }}
                defaultValue={JSON.stringify({
                  fontFamily: getTileAttribute("fontFamily") ?? "Pretendard",
                })}
                className="input input-xs input-bordered"
              >
                <option className="" value={JSON.stringify({ fontFamily: "Pretendard" })}>
                  Pretendard
                </option>
                <option className="NotoSerifKR" value={JSON.stringify({ fontFamily: "NotoSerifKR" })}>
                  NotoSerifKR
                </option>
                <option className="GmarketSansMedium" value={JSON.stringify({ fontFamily: "GmarketSansMedium" })}>
                  Gmarket Sans
                </option>
                <option className="yg-jalnan" value={JSON.stringify({ fontFamily: "yg-jalnan" })}>
                  여기어때 잘난체
                </option>
                <option className="DungGeunMo" value={JSON.stringify({ fontFamily: "DungGeunMo" })}>
                  둥근모
                </option>
              </select>
            </div>

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
          </>
        )}

        <div className="flex flex-col gap-1">
          <div className="font-bold pl-1">Color</div>
          <button
            className="w-6 h-6 rounded-full border-2 border-slate-300"
            style={{
              backgroundColor: (type === "gridIcon" ? getGridIconColor() : getTileAttribute("color")) ?? "black",
            }}
            onClick={() => {
              setIsColorPickerOn((s) => !s);
            }}
          ></button>
          <AnimatePresence>
            {isColorPickerOn && (
              <motion.div
                className="absolute top-16 z-[100] origin-top-left"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0, transition: { duration: 0.2 } }}
              >
                <ColorPicker
                  width={300}
                  color={color}
                  hideHSV
                  onChange={(e) => {
                    setColor(e);
                    applyStyle({ color: e.hex });
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="font-bold pl-1">
          Link<small className="font-normal"> (optional)</small>
        </div>
        <input
          className="input input-bordered input-xs w-full min-w-[10rem]"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <div className="border-x-transparent border-x-8 border-t-8 border-t-white absolute -bottom-1 left-4 w-0 h-0" />
    </motion.div>
  );
}
