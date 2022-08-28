import { createContext, FC, useState } from "react";
import { TileInterface, TileType } from "constants/tile";
import { Layout } from "react-grid-layout";
import { useUI } from "hooks/useUIContext";

interface TileContextProps {
  tiles: TileInterface[];
  addTile: (type: string, assets: TileType[]) => void;
  removeTile: (id: string) => void;
  onLayoutChange: (newLayout: Layout[]) => void;
}

export const TileContext = createContext<TileContextProps>({
  tiles: [] as TileInterface[],
  addTile: () => {},
  removeTile: () => {},
  onLayoutChange: () => {},
});

const TileContextProvider: FC = ({ children }) => {
  const { theme } = useUI();
  const [tiles, setTiles] = useState([
    {
      i: `i${new Date().getTime()}-0`,
      x: 0,
      y: 0,
      w: 2,
      h: 1,
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "Name",
      assets: [{ type: "string", str: "John Doe", style: { fontWeight: 900, fontSize: "2rem" } }],
    },
    {
      i: `i${new Date().getTime()}-1`,
      x: 0,
      y: 1,
      w: 2,
      h: 2,
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "Profile Image",
      assets: [{ type: "image", url: "https://avatars.githubusercontent.com/u/52532871?v=4" }],
    },
    {
      i: `i${new Date().getTime()}-2`,
      x: 2,
      y: 0,
      w: 1,
      h: 1,
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "Github Commits",
      maxH: 1,
      assets: [{ type: "commit", id: "r-4bb1t" }],
    },
    {
      i: `i${new Date().getTime()}-3`,
      x: 2,
      y: 1,
      w: 1,
      h: 1,
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "SolvedAC",
      maxH: 1,
      assets: [{ type: "solvedac", id: "r4bb1t" }],
    },
    {
      i: `i${new Date().getTime()}-4`,
      x: 2,
      y: 2,
      w: 1,
      h: 1,
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "List",
      assets: [
        { type: "string", str: "Awards", style: { fontWeight: 800, fontSize: "1.2rem" } },
        { type: "list", items: ["item1", "item2", "item3"], style: { listStyle: "disc" } },
      ],
    },
  ] as TileInterface[]);

  const addTile = (type: string, assets: TileType[]) => {
    setTiles((g) => [
      ...g,
      {
        i: g.length.toString(),
        x: 0,
        y:
          g.reduce((max, obj) => (max.y + max.h < obj.y + obj.h ? obj : max)).y +
          g.reduce((max, obj) => (max.y + max.h < obj.y + obj.h ? obj : max)).h,
        w: 1,
        h: 1,
        minW: 1,
        minH: 1,
        type: type,
        background: "#f1f1f1",
        assets: assets,
      },
    ]);
  };

  const onLayoutChange = (newLayout: Layout[]) => {
    setTiles((g) =>
      g.map((item) => {
        return { ...item, ...newLayout.filter((n) => n.i === item.i)[0] };
      }),
    );
  };

  const removeTile = (id: string) => {
    setTiles((g) => g.filter((g) => g.i !== id));
  };

  return <TileContext.Provider value={{ tiles, addTile, removeTile, onLayoutChange }}>{children}</TileContext.Provider>;
};

export default TileContextProvider;
