import { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { TileInterface, TileAssetType } from "constants/tile";
import { Layout } from "react-grid-layout";
import { useUI } from "hooks/useUIContext";
import { PLACEHOLDER } from "constants/etc";

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
      assets: [{ type: "image", url: PLACEHOLDER, style: {} }],
    },
  ] as TileInterface[]);

  const addTile = (item: TileInterface) => {
    setTiles((g) => [
      ...g,
      {
        i: new Date().toString() + g.length.toString() + Math.random().toString(),
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

  useEffect(() => {
    if (localStorage.getItem("data") !== null) {
      if (JSON.parse(localStorage.getItem("data")!).tiles as TileInterface[])
        setTiles(JSON.parse(localStorage.getItem("data")!).tiles);
    }
  }, []);

  return (
    <TileContext.Provider value={{ tiles, addTile, removeTile, onLayoutChange, setTiles }}>
      {children}
    </TileContext.Provider>
  );
};

export default TileContextProvider;
