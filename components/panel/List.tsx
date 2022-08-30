import cc from "classcat";
import { useMessage } from "hooks/useMessageContext";
import { useTile } from "hooks/useTileContext";
import { useAlert } from "hooks/useAlertContext";
import Tile from "components/Tile";
import { useUI } from "hooks/useUIContext";
import { TileInterface } from "constants/tile";
import { AiFillHeart } from "react-icons/ai";
import { PLACEHOLDER } from "constants/etc";

export default function List() {
  const { addTile } = useTile();
  const { theme } = useUI();

  const ItemList = [
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "List",
      assets: [
        {
          type: "list",
          items: ["item1", "item2", "item3"],
          style: { listStyleType: "disc", paddingTop: "1rem", paddingBottom: "1rem" },
        },
      ],
    },
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "List (decimal)",
      assets: [
        {
          type: "list",
          items: ["item1", "item2", "item3"],
          style: { listStyleType: "decimal", paddingTop: "1rem", paddingBottom: "1rem" },
        },
      ],
    },
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "List (heart)",
      assets: [
        {
          type: "list",
          items: ["item1", "item2", "item3"],
          style: { listStyleType: "heart", paddingTop: "1rem", paddingBottom: "1rem" },
        },
      ],
    },
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "List with Title",
      assets: [
        { type: "string", str: "List", style: { fontWeight: 700, fontSize: "1.25rem" } },
        { type: "list", items: ["item1", "item2", "item3"], style: { listStyleType: "disc" } },
      ],
    },
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "List with Title (decimal)",
      assets: [
        { type: "string", str: "List", style: { fontWeight: 700, fontSize: "1.25rem" } },
        { type: "list", items: ["item1", "item2", "item3"], style: { listStyleType: "decimal" } },
      ],
    },
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "List with Title (heart)",
      assets: [
        { type: "string", str: "List", style: { fontWeight: 700, fontSize: "1.25rem" } },
        { type: "list", items: ["item1", "item2", "item3"], style: { listStyleType: "heart" } },
      ],
    },
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "List With Image",
      assets: [
        { type: "image", url: PLACEHOLDER, style: {} },
        {
          type: "list",
          items: ["item1", "item2", "item3"],
          style: {
            position: "absolute",
            inset: 0,
            fontWeight: 700,
            color: "#ffffff",
          },
        },
      ],
    },
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "Icon Grid",
      assets: [
        {
          type: "grid",
          items: [
            { type: "icon", icon: AiFillHeart, attributes: { classname: "p-2", size: "100%" } },
            { type: "icon", icon: AiFillHeart, attributes: { classname: "p-2", size: "100%" } },
            { type: "icon", icon: AiFillHeart, attributes: { classname: "p-2", size: "100%" } },
            { type: "icon", icon: AiFillHeart, attributes: { classname: "p-2", size: "100%" } },
          ],
          style: {},
        },
      ],
    },
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "Icon Grid with Title",
      assets: [
        { type: "string", str: "Grid", style: { fontWeight: 700, fontSize: "1.25rem" } },
        {
          type: "grid",
          items: [
            { type: "icon", icon: AiFillHeart, attributes: { classname: "p-2", size: "100%" } },
            { type: "icon", icon: AiFillHeart, attributes: { classname: "p-2", size: "100%" } },
            { type: "icon", icon: AiFillHeart, attributes: { classname: "p-2", size: "100%" } },
            { type: "icon", icon: AiFillHeart, attributes: { classname: "p-2", size: "100%" } },
          ],
          style: { paddingTop: "0px" },
        },
      ],
    },
  ] as TileInterface[];

  return (
    <>
      <div className="panel-title">Images</div>
      <div className="flex flex-wrap gap-2 justify-center">
        {ItemList.map((item) => (
          <button
            key={item.i}
            onClick={() => {
              addTile(item);
            }}
          >
            <Tile isUIList item={item} />
          </button>
        ))}
      </div>
    </>
  );
}
