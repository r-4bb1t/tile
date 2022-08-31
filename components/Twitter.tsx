import { SolvedacResponse } from "constants/etc";
import { useCallback, useEffect, useState } from "react";

export default function Solvedac({
  id,
  itemType,
  isUiList = false,
}: {
  id: string | null;
  itemType: string;
  isUiList?: boolean;
}) {
  const [solvedac, setSolvedac] = useState(null as unknown as SolvedacResponse);
  const fetchData = useCallback(async () => {
    if (!id) return;
    try {
      const result = (await (
        await fetch(`https://solved.ac/api/v3/user/show?handle=${id}`, {
          headers: {
            Authorization: `bearer ${process.env.NEXT_PUBLIC_SOLVEDAC_TOKEN}`,
          },
        })
      ).json()) as SolvedacResponse;

      setSolvedac(result);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id]);

  switch (itemType) {
    case "tier":
      return (
        <div className="relative flex items-center justify-center group w-full h-full">
          {id ? (
            <img
              src={`https://static.solved.ac/tier_small/${solvedac?.tier}.svg`}
              className="w-full h-full object-contain"
            />
          ) : (
            <img src="https://static.solved.ac/tier_small/0.svg" className="w-full h-full object-contain" />
          )}

          {!isUiList && (
            <div className="absolute z-50 -top-6 px-2 py-1 text-xs text-white flex flex-col items-center w-max text-center group-hover:opacity-100 opacity-0 transition-all bg-black bg-opacity-50 pointer-events-none rounded">
              <div className="font-bold">SolvedAC Tier</div>
              {["Bronze", "Silver", "Gold", "Platinum", "Diamond"][Math.floor(solvedac?.tier / 5)]}{" "}
              {["Ⅴ", "Ⅳ", "Ⅲ", "Ⅱ", "Ⅰ"][Math.floor((solvedac?.tier % 5) - 1)]}
              <div className="border-x-transparent border-x-4 border-t-4 border-t-black opacity-50 absolute -bottom-1 w-0 h-0" />
            </div>
          )}
        </div>
      );
    case "badge":
      return (
        <div className="relative flex items-center justify-center group w-full h-full">
          {id ? (
            <img src={`${solvedac?.badge.badgeImageUrl}`} className="w-full h-full object-contain" />
          ) : (
            <img
              src="https://static.solved.ac/profile_badge/120x120/grass_01.png"
              className="w-full h-full object-contain"
            />
          )}

          {!isUiList && (
            <div className="absolute z-50 -top-6 px-2 py-1 text-xs text-white flex flex-col items-center w-max text-center group-hover:opacity-100 opacity-0 transition-all bg-black bg-opacity-50 pointer-events-none rounded">
              <div className="font-bold">SolvedAC Badge</div>
              {solvedac?.badge.displayName}
              <div className="border-x-transparent border-x-4 border-t-4 border-t-black opacity-50 absolute -bottom-1 w-0 h-0" />
            </div>
          )}
        </div>
      );
    case "class":
      return (
        <div className="relative flex items-center justify-center group w-full h-full">
          {id ? (
            <img
              src={`https://static.solved.ac/class/c${solvedac?.class}${solvedac?.classDecoration
                .slice(0, 1)
                .replace("n", "")}.svg`}
              className="w-full h-full object-contain"
            />
          ) : (
            <img src="https://static.solved.ac/class/c0.svg" className="w-full h-full object-contain" />
          )}

          {!isUiList && (
            <div className="absolute z-50 -top-6 px-2 py-1 text-xs text-white flex flex-col items-center w-max text-center group-hover:opacity-100 opacity-0 transition-all bg-black bg-opacity-50 pointer-events-none rounded">
              <div className="font-bold">SolvedAC Class</div>
              Class {solvedac?.class} ({solvedac?.classDecoration})
              <div className="border-x-transparent border-x-4 border-t-4 border-t-black opacity-50 absolute -bottom-1 w-0 h-0" />
            </div>
          )}
        </div>
      );
    case "profile":
      return (
        <div className="relative flex items-center justify-center group w-full h-full">
          {id ? (
            <img src={solvedac?.profileImageUrl} className="w-full h-full object-contain" />
          ) : (
            <img
              src="https://static.solved.ac/misc/64x64/default_profile.png"
              className="w-full h-full object-contain"
            />
          )}

          {!isUiList && (
            <div className="absolute z-50 -top-6 px-2 py-1 text-xs text-white flex flex-col items-center w-max text-center group-hover:opacity-100 opacity-0 transition-all bg-black bg-opacity-50 pointer-events-none rounded">
              <div className="font-bold">SolvedAC Profile</div>
              {solvedac?.handle}
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
}
