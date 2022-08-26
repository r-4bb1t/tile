import { useEffect, useRef, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DragUpdate,
  Droppable,
  ResponderProvided,
} from "react-beautiful-dnd";
import { Resizable, ResizableBox } from "react-resizable";
import cc from "classcat";

interface TileProps {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  item: any;
  close: Function;
  width: number;
  setWidth: Function;
}

const getTileWidth = (width: number) => {
  return Math.round(width / 160) * 160 + (Math.round(width / 160) - 1) * 16;
};

export default function Tile({ item, provided, snapshot, close, width, setWidth }: TileProps) {
  const [dragging, setDragging] = useState(false);
  return (
    <>
      <div ref={provided.innerRef} {...provided.draggableProps}>
        <ResizableBox
          height={160}
          width={dragging ? width : getTileWidth(width)}
          minConstraints={[160, 160]}
          maxConstraints={[512, 160]}
          onResize={(_, { size }) => setWidth(size.width)}
          axis="x"
          onResizeStart={() => setDragging(true)}
          onResizeStop={() => {
            setDragging(false);
            setWidth(getTileWidth(width));
          }}
        >
          <div
            className={cc([
              "flex flex-col justify-between h-40 w-[512px] overflow-auto",
              !dragging && "transition-all",
            ])}
            style={{
              maxWidth: dragging ? width : getTileWidth(width) + "px",
              background: item.background,
            }}
          >
            <div className="flex justify-between p-2" {...provided.dragHandleProps}>
              {item.type}
              <button type="button" className="ui-only" onClick={() => close()}>
                ×
              </button>
            </div>
            <div
              className={cc([
                "absolute h-full bg-slate-400 opacity-0 transition-all pointer-events-none w-[512px]",
                dragging && "opacity-20",
              ])}
              style={{ maxWidth: getTileWidth(width) + "px" }}
            />
          </div>
        </ResizableBox>
      </div>
    </>
  );
}
