import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable, DropResult, DragUpdate, ResponderProvided } from "react-beautiful-dnd";
import { NextPage } from "next";
import cc from "classcat";
import Tile from "components/Tile";
import Header from "components/Header";
import Panel from "components/Panel";
import { AnimatePresence } from "framer-motion";

const getItems = (count: number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    type: `profile`,
    width: 160,
    minwidth: 160,
    background: "#f1f1f1",
  }));

const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (
  source: Array<any>,
  destination: Array<any>,
  droppableSource: { index: number; droppableId: any },
  droppableDestination: { index: number; droppableId: any },
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {} as any;
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const Home: NextPage = () => {
  const [state, setState] = useState([getItems(1), []]);

  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  useEffect(() => {
    if (state.length === 0 || state[state.length - 1].length > 0) {
      setState((s) => [...s, []]);
    }
  }, [state]);

  function onDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (draggableId.startsWith("resize")) {
      return;
    }

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items as any;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }

  const [uiMode, setUIMode] = useState(true);

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col h-full">
      <Header uiMode={uiMode} setUIMode={setUIMode} />
      <button
        type="button"
        onClick={() => {
          setState((s) =>
            s.map((ss, i) => {
              if (i === 0) return [...ss, getItems(1)[0]];
              return ss;
            }),
          );
        }}
      >
        Add new item
      </button>
      <div className="flex w-full h-full items-center justify-center flex-1">
        <div className="flex flex-col w-full">
          {winReady && (
            <DragDropContext onDragEnd={onDragEnd}>
              {state.map((el, ind) => (
                <Droppable key={ind} droppableId={`${ind}`} direction="horizontal" isDropDisabled={!uiMode}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      className={cc(["flex p-2 gap-2 transition-all", snapshot.isDraggingOver && "bg-slate-200"])}
                      {...provided.droppableProps}
                    >
                      {el.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={!uiMode}>
                          {(provided, snapshot) => (
                            <Tile
                              item={item}
                              provided={provided}
                              snapshot={snapshot}
                              width={item.width}
                              setWidth={(h: number) =>
                                setState((s) =>
                                  s.map((ss) =>
                                    ss.map((sss) => {
                                      if (sss.id === item.id) return { ...item, width: h };
                                      return sss;
                                    }),
                                  ),
                                )
                              }
                              close={() => {
                                const newState = [...state];
                                newState[ind].splice(index, 1);
                                setState(newState.filter((group) => group.length));
                              }}
                            />
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          )}
        </div>
        <AnimatePresence>{uiMode && <Panel />}</AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
