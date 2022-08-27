import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import cc from "classcat";
import Tile from "components/Tile";
import Header from "components/Header";
import Panel from "components/Panel";
import { AnimatePresence } from "framer-motion";
import GridLayout, { Layout } from "react-grid-layout";

const getItems = (count: number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    type: `profile`,
    width: 160,
    minwidth: 160,
    background: "#f1f1f1",
  }));

interface CustomLayout extends Layout {
  background: string;
}

const Home: NextPage = () => {
  const [state, setState] = useState([getItems(1), []]);
  const [griditems, setGridItems] = useState([
    {
      i: "0",
      x: 0,
      y: 0,
      w: 1,
      h: 2,
      minW: 1,
      minH: 1,
      background: "#f1f1f1",
    },
    {
      i: "1",
      x: 1,
      y: 0,
      w: 1,
      h: 1,
      minW: 1,
      minH: 1,
      background: "#f1f1f1",
    },
  ] as CustomLayout[]);

  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  const [uiMode, setUIMode] = useState(true);

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col h-full">
      <Header uiMode={uiMode} setUIMode={setUIMode} />
      <button
        type="button"
        onClick={() => {
          setGridItems((g) => [
            ...g,
            {
              i: g.length.toString(),
              x: 1,
              y: 0,
              w: 1,
              h: 1,
              minW: 1,
              minH: 1,
              background: "#f1f1f1",
            },
          ]);
        }}
      >
        Add new item
      </button>
      <div className="flex w-full h-full flex-1 items-center">
        <div className="flex flex-col w-full h-full justify-center items-center overflow-x-auto flex-[2]">
          {winReady && (
            <GridLayout
              layout={griditems}
              className="layout"
              onLayoutChange={(newLayout) => {
                setGridItems(
                  griditems.map((item) => {
                    return { ...item, ...newLayout.filter((n) => n.i === item.i)[0] };
                  }),
                );
              }}
              width={720}
              cols={4}
              rowHeight={160}
              margin={[16, 16]}
              compactType="horizontal"
              containerPadding={[16, 16]}
              style={{ width: "720px" }}
            >
              {griditems.map((item) => (
                <div key={item.i}>
                  <Tile item={item} close={() => setGridItems((grid) => grid.filter((g) => g.i !== item.i))} />
                </div>
              ))}
            </GridLayout>
          )}
        </div>
        <AnimatePresence>{uiMode && <Panel />}</AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
