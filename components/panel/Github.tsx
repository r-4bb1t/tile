import cc from "classcat";
import { useTile } from "hooks/useTileContext";
import Tile from "components/Tile";
import { useUI } from "hooks/useUIContext";
import { TileInterface } from "constants/tile";
import { useAuth } from "hooks/useAuthContext";
import { signIn } from "next-auth/react";
import { GithubIconColored } from "components/Icons";

export default function Github() {
  const { addTile } = useTile();
  const { theme } = useUI();
  const { session } = useAuth();

  const ItemList = [
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "Github Commits",
      maxH: 1,
      assets: [
        {
          type: "constant",
          item: (
            <div className="text-xs h-8 font-bold w-full flex items-center justify-center gap-1">
              <GithubIconColored />@{session?.user?.name || "-"}
            </div>
          ),
        },
        {
          type: "commit",
          id: session?.user?.name || "r-4bb1t",
          style: {},
        },
      ],
    },
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "Github Commits (green)",
      maxH: 1,
      assets: [
        {
          type: "constant",
          item: (
            <div className="text-xs h-8 font-bold w-full flex items-center justify-center gap-1">
              <GithubIconColored />@{session?.user?.name || "-"}
            </div>
          ),
        },
        {
          type: "commit",
          id: session?.user?.name || "r-4bb1t",
          style: { backgroundColor: "#59c423" },
        },
      ],
    },
    {
      background: theme[Math.floor(Math.random() * theme.length)],
      type: "Github Commits (black)",
      maxH: 1,
      assets: [
        {
          type: "constant",
          item: (
            <div className="text-xs h-8 font-bold w-full flex items-center justify-center gap-1">
              <GithubIconColored />@{session?.user?.name || "-"}
            </div>
          ),
        },
        {
          type: "commit",
          id: session?.user?.name || "r-4bb1t",
          style: { backgroundColor: "black" },
        },
      ],
    },
  ] as TileInterface[];

  return (
    <>
      <div className="panel-title">
        Github {session && <small className="font-normal">{`logined as ${session?.user?.name}`}</small>}
      </div>
      {session ? (
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
      ) : (
        <button onClick={() => signIn()}>Github Login</button>
      )}
    </>
  );
}
