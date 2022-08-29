/* eslint-disable @next/next/no-img-element */
import React, { forwardRef, useEffect, useRef, useState } from "react";
import cc from "classcat";
import { TileInterface, TileAssetType, IconType, SolvedacType, ImageType, GridType, ListType } from "constants/tile";
import { useUI } from "hooks/useUIContext";
import Commits from "./Commits";
import Solvedac from "./Solvedac";
import { PlusIcon } from "./Icons";
import StyleFloat from "./StyleFloat";
import { AnimatePresence, motion } from "framer-motion";
import { useTile } from "hooks/useTileContext";
import AddGridItem from "./AddGridItem";

const getMinColumn = (length: number, floor: number, ceil: number) => {
  if (Math.ceil(length / floor) * floor >= Math.ceil(length / ceil) * ceil) return ceil;
  return floor;
};

const AssetToComponent = (asset: TileAssetType, index: number, size: number[], isUIList: boolean, id: string) => {
  const [value, setValue] = useState("");
  const { uiMode, borderRadius } = useUI();
  const textRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { setTiles } = useTile();
  const ulRef = useRef<HTMLUListElement>(null);
  const [isGridModalOpen, setIsGridModalOpen] = useState(false);

  useEffect(() => {
    if (asset.type === "string") setValue(asset.str);
  }, [asset]);

  switch (asset.type) {
    case "image":
      return (
        <img
          src={asset.url}
          className="w-full h-full object-cover"
          alt="image"
          key={"image" + index}
          style={{
            borderRadius: `${borderRadius}px`,
          }}
        />
      );
    case "string":
      return (
        <div className="relative p-2 flex items-center" key={"string" + index} style={asset.style}>
          <div
            className={cc([
              "w-full h-min outline-none py-1 px-2 resize-none overflow-hidden transition-all peer",
              uiMode && !isUIList && "bg-white bg-opacity-20 focus:bg-opacity-50",
            ])}
            contentEditable={uiMode && !isUIList}
            suppressContentEditableWarning
            onChange={() => setValue(textRef.current!.innerText)}
            ref={textRef}
            onFocus={() => setIsFocused(true)}
          >
            {value}
          </div>
          <AnimatePresence>
            {isFocused && <StyleFloat type="string" close={() => setIsFocused(false)} id={id} index={index} />}
          </AnimatePresence>
        </div>
      );
    case "commit":
      return <Commits id="r-4bb1t" size={size} key={"commit" + index} />;
    case "solvedac":
      return (
        <div className="w-full h-full flex items-center justify-center p-10" key={"solvedac" + index}>
          <Solvedac id="r4bb1t" key={"solvedac" + index} itemType={asset.itemType} isUiList={isUIList} />
        </div>
      );
    case "list":
      return (
        <ul className="pl-8 pr-1 h-full overflow-auto mr-1 mb-1" style={asset.style} ref={ulRef} key={"list" + index}>
          {asset.items.map((item, itemIndex) => (
            <li
              key={itemIndex}
              className={cc([
                "relative transition-all pl-1 pr-2 m-1",
                uiMode && !isUIList && "bg-white bg-opacity-20 child-focus:bg-opacity-50",
              ])}
            >
              <div
                contentEditable={uiMode && typeof item === "string" && !isUIList}
                suppressContentEditableWarning
                className="w-full outline-none"
                onFocus={() => setIsFocused(true)}
              >
                {item}
              </div>
              {uiMode && !isUIList && (
                <button
                  className="absolute top-0 right-1"
                  onClick={() => {
                    setTiles((tiles) =>
                      tiles.map((tile) => {
                        if (tile.i === id) {
                          return {
                            ...tile,
                            assets: tile.assets.map((asset: ListType, i) => {
                              if (i === index)
                                return { ...asset, items: asset.items.filter((item, i) => i !== itemIndex) };
                              return asset;
                            }),
                          };
                        }
                        return tile;
                      }),
                    );
                    setTimeout(() => ulRef.current!.scrollTo({ top: 3000, behavior: "smooth" }), 200);
                  }}
                >
                  ×
                </button>
              )}
            </li>
          ))}

          {uiMode && !isUIList && (
            <div className="absolute bottom-2 inset-x-0 pointer-events-none flex items-center justify-center hover:opacity-50 transition-all">
              <button
                className="w-6 h-6 pointer-events-auto"
                onClick={() =>
                  setTiles((tiles) =>
                    tiles.map((tile) => {
                      if (tile.i === id) {
                        return {
                          ...tile,
                          assets: tile.assets.map((asset: ListType, i) => {
                            if (i === index) return { ...asset, items: [...asset.items, ""] };
                            return asset;
                          }),
                        };
                      }
                      return tile;
                    }),
                  )
                }
              >
                <PlusIcon />
              </button>
            </div>
          )}

          <AnimatePresence>
            {isFocused && <StyleFloat type="string" close={() => setIsFocused(false)} id={id} index={index} />}
          </AnimatePresence>
        </ul>
      );
    case "grid":
      return (
        <div className="w-full h-full flex items-center justify-center" key={"grid" + index}>
          <div
            className="grid w-fit h-full justify-center justify-items-center items-center gap-2 p-2 flex-grow-0"
            style={{
              ...asset.style,
              gridTemplateColumns: `repeat(${getMinColumn(
                asset.items.length,
                Math.floor(Math.sqrt((asset.items.length * (size[0] ?? 1)) / (size[1] ?? 1))),
                Math.ceil(Math.sqrt((asset.items.length * (size[0] ?? 1)) / (size[1] ?? 1))),
              )}, 1fr)`,
            }}
          >
            {asset.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                contentEditable={uiMode && typeof item === "string" && !isUIList}
                suppressContentEditableWarning
                className={cc([
                  "relative transition-all flex items-center min-h-0 min-w-0 w-full h-full",
                  uiMode && !isUIList && "bg-white bg-opacity-20 focus:bg-opacity-50",
                ])}
                style={{
                  padding: `${Math.max(size[0], size[1]) * 8}px`,
                }}
              >
                {
                  {
                    icon: (item as IconType).icon,
                    solvedac: (
                      <Solvedac
                        id="r4bb1t"
                        key={"solvedac" + index + itemIndex}
                        itemType={(item as SolvedacType).itemType}
                        isUiList={isUIList}
                      />
                    ),
                    commit: "",
                    list: "",
                    string: "",
                    grid: null,
                    image: (
                      <img
                        src={(item as ImageType).url}
                        className="w-full h-full object-cover"
                        alt="image"
                        key={"image" + index}
                        style={{
                          borderRadius: `${borderRadius}px`,
                        }}
                      />
                    ),
                  }[item.type]
                }

                {uiMode && !isUIList && (
                  <button
                    className="absolute top-0 right-1"
                    onClick={() =>
                      setTiles((tiles) =>
                        tiles.map((tile) => {
                          if (tile.i === id)
                            return {
                              ...tile,
                              assets: tile.assets.map((asset: GridType, i) => {
                                if (i === index) {
                                  return { ...asset, items: asset.items.filter((item, ii) => ii !== itemIndex) };
                                }
                                return asset;
                              }),
                            };
                          return tile;
                        }),
                      )
                    }
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          {uiMode && !isUIList && (
            <div className="relative flex items-center justify-center px-2">
              <button className="w-8 h-8 hover:opacity-50 transition-all" onClick={() => setIsGridModalOpen(true)}>
                <PlusIcon />
              </button>
              <AnimatePresence>
                {isGridModalOpen && <AddGridItem close={() => setIsGridModalOpen(false)} />}
              </AnimatePresence>
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
};

const Tile = ({
  item,
  close = () => {},
  isUIList = false,
}: {
  item: TileInterface;
  close?: Function;
  isUIList?: boolean;
}) => {
  const { borderRadius, backdropFilter, shadow, theme } = useUI();
  const { setTiles } = useTile();
  const [isBackgroundModalOn, setIsBackgroundModalOn] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (backgroundRef.current && !backgroundRef.current.contains(e.target as Node)) setIsBackgroundModalOn(false);
    });
  }, []);

  return (
    <div
      className={cc([
        "relative flex flex-col justify-center w-full h-full overflow-visible select-none",
        isUIList && "w-28 h-28 group",
      ])}
      style={{
        background: item.background,
        borderRadius: `${borderRadius}px`,
        boxShadow: shadow,
      }}
    >
      <div className="absolute inset-0 tile-mask" style={{ backdropFilter, borderRadius: `${borderRadius}px` }}></div>
      <div className="absolute inset-0 flex flex-col justify-center">
        {item.assets.map((asset, index) => AssetToComponent(asset, index, [item.w, item.h], isUIList, item.i))}
      </div>
      {isUIList ? (
        <>
          <div className="opacity-0 transition-opacity group-hover:opacity-80 absolute inset-0 bg-black bg-opacity-40 p-8">
            <PlusIcon />
          </div>
          <div className="flex justify-center text-xs px-2 py-1 absolute inset-x-0 top-0 text-white ui-only drop-shadow-md">
            {item.type}
          </div>
        </>
      ) : (
        <div
          className="draggable text-sm cursor-move flex justify-between px-2 py-1 absolute inset-x-0 top-0 text-white ui-only hover:bg-black hover:bg-opacity-20 transition-all"
          style={{ borderRadius: `${borderRadius}px ${borderRadius}px 0 0` }}
        >
          <div className="flex items-center gap-2">
            {item.type}

            <div className="h-4 flex justify-center" ref={backgroundRef}>
              <button
                className="w-4 h-4 rounded-full border-[1px] border-white"
                style={{ backgroundColor: item.background }}
                onClick={() => setIsBackgroundModalOn((s) => !s)}
              />
              <AnimatePresence>
                {isBackgroundModalOn && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                    className="pretendard absolute bottom-full text-black text-left z-[100] -translate-y-3 origin-bottom bg-white p-2 drop-shadow-lg rounded flex justify-center text-sm gap-2"
                  >
                    <button
                      className={cc([
                        "w-4 h-4 rounded-full bg-cover",
                        item.background === "#ffffff00" && "border-2 border-black ",
                      ])}
                      style={{
                        backgroundImage:
                          "url(https://user-images.githubusercontent.com/52532871/187133850-784b2a79-3a8e-446c-9b41-bab58ef052c2.png)",
                      }}
                      onClick={() => {
                        setTiles((tiles) =>
                          tiles.map((tile) => {
                            if (tile.i === item.i) return { ...tile, background: "#ffffff00" };
                            return tile;
                          }),
                        );
                      }}
                    ></button>
                    {theme.map((t) => (
                      <button
                        className={cc(["w-4 h-4 rounded-full", item.background === t && "border-2 border-black"])}
                        style={{ backgroundColor: t }}
                        key={t}
                        onClick={() => {
                          setTiles((tiles) =>
                            tiles.map((tile) => {
                              if (tile.i === item.i) return { ...tile, background: t };
                              return tile;
                            }),
                          );
                        }}
                      ></button>
                    ))}
                    <div className="border-x-transparent border-x-8 border-t-8 border-t-white absolute -bottom-1 w-0 h-0" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <button type="button" className="" onClick={() => close()}>
            ×
          </button>
        </div>
      )}
    </div>
  );
};
export default Tile;
