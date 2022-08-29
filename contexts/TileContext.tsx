import { createContext, Dispatch, FC, SetStateAction, useState } from "react";
import { TileInterface, TileAssetType } from "constants/tile";
import { Layout } from "react-grid-layout";
import { useUI } from "hooks/useUIContext";

interface TileContextProps {
  tiles: TileInterface[];
  addTile: (assets: TileInterface) => void;
  removeTile: (id: string) => void;
  onLayoutChange: (newLayout: Layout[]) => void;
  setTiles: Dispatch<SetStateAction<TileInterface[]>>;
}

export const TileContext = createContext<TileContextProps>({
  tiles: [] as TileInterface[],
  addTile: () => {},
  removeTile: () => {},
  onLayoutChange: () => {},
  setTiles: () => {},
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
      assets: [{ type: "string", str: "John Doe", style: { fontWeight: 900, fontSize: "2.25rem" } }],
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
      x: 3,
      y: 0,
      w: 1,
      h: 1,
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "SolvedAC",
      maxH: 1,
      assets: [{ type: "solvedac", id: "r4bb1t", itemType: "tier" }],
    },
    {
      i: `i${new Date().getTime()}-4`,
      x: 2,
      y: 2,
      w: 2,
      h: 1,
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "List",
      assets: [
        { type: "string", str: "List", style: { fontWeight: 700, fontSize: "1.25rem" } },
        { type: "list", items: ["item1", "item2", "item3"], style: { listStyleType: "disc" } },
      ],
    },
    {
      i: `i${new Date().getTime()}-5`,
      x: 2,
      y: 3,
      w: 2,
      h: 1,
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "Grid",
      assets: [
        {
          type: "grid",
          items: [
            {
              type: "icon",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" key="0">
                  <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
                </svg>
              ),
            },
          ],
          style: { display: "flex" },
        },
      ],
    },
  ] as TileInterface[]);

  const addTile = (item: TileInterface) => {
    setTiles((g) => [
      ...g,
      {
        i: g.length.toString(),
        x: 0,
        y:
          g.length > 0
            ? g.reduce((max, obj) => (max.y + max.h < obj.y + obj.h ? obj : max)).y +
              g.reduce((max, obj) => (max.y + max.h < obj.y + obj.h ? obj : max)).h
            : 0,
        w: item.minW ?? 1,
        h: item.minH ?? 1,
        minW: item.minW,
        minH: item.minH,
        type: item.type,
        background: item.background,
        assets: item.assets,
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

  return (
    <TileContext.Provider value={{ tiles, addTile, removeTile, onLayoutChange, setTiles }}>
      {children}
    </TileContext.Provider>
  );
};

export default TileContextProvider;
