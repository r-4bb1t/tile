import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import cc from "classcat";
import Tile from "components/Tile";
import Header from "components/Header";
import Panel from "components/panel";
import { AnimatePresence } from "framer-motion";
import GridLayout, { Layout } from "react-grid-layout";
import { TileInterface } from "constants/tile";
import { useTile } from "hooks/useTileContext";
import { useUI } from "hooks/useUIContext";

const Home: NextPage = () => {
  const { tiles, removeTile, onLayoutChange } = useTile();
  const { uiMode, margin } = useUI();

  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col h-full">
      <Header />
      <div className="flex w-full h-full flex-1 items-center">
        <div className="flex flex-col w-full h-full justify-center items-center overflow-visible flex-[2]">
          {winReady && (
            <GridLayout
              layout={tiles}
              className="layout"
              onLayoutChange={onLayoutChange}
              width={(160 + margin) * 4 + margin}
              cols={4}
              maxRows={4}
              rowHeight={160}
              margin={[margin, margin]}
              compactType="vertical"
              containerPadding={[margin, margin]}
              isResizable={uiMode}
              isDraggable={uiMode}
              style={{
                width: `${4 * (margin + 160) + margin}px`,
                background: uiMode ? "#f0f0f0" : "transparent",
                overflow: "visible",
              }}
              useCSSTransforms={true}
            >
              {tiles.map((item) => (
                <div key={item.i}>
                  <Tile item={item} close={() => removeTile(item.i)} />
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
