import cc from "classcat";
import { useMessage } from "hooks/useMessageContext";
import { useTile } from "hooks/useTileContext";
import { useAlert } from "hooks/useAlertContext";
import Tile from "components/Tile";
import { useUI } from "hooks/useUIContext";
import { TileInterface } from "constants/tile";

export default function Image() {
  const { addTile } = useTile();
  const { message } = useMessage();
  const { push } = useAlert();
  const { theme } = useUI();

  const ItemList = [
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "Plain Image",
      assets: [
        {
          type: "image",
          url: "http://www.proedsolutions.com/wp-content/themes/micron/images/placeholders/placeholder_large_dark.jpg",
          style: {},
        },
      ],
    },
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "Image with Text",
      assets: [
        {
          type: "image",
          url: "http://www.proedsolutions.com/wp-content/themes/micron/images/placeholders/placeholder_large_dark.jpg",
          style: {},
        },
        {
          type: "string",
          str: "sample text",
          style: {
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
            fontWeight: 700,
            color: "#ffffff",
          },
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
