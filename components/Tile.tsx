import React, { forwardRef } from "react";
import cc from "classcat";

const Tile = ({ item, close }: any) => {
  return (
    <div
      className={cc(["flex flex-col justify-between w-full h-full overflow-auto select-none"])}
      style={{
        background: item.background,
      }}
    >
      <div className="flex justify-between p-2">
        <button type="button" className="ui-only" onClick={() => close()}>
          ×
        </button>
      </div>
    </div>
  );
};
export default Tile;
