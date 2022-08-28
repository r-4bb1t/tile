import { SolvedacResponse } from "constants/etc";
import { useCallback, useEffect, useState } from "react";

export default function Solvedac({ id }: { id: string }) {
  const [solvedac, setSolvedac] = useState(null as unknown as SolvedacResponse);
  const fetchData = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-10">
      <img src={`https://static.solved.ac/tier_small/${solvedac?.tier}.svg`} className="w-full h-full object-contain" />
    </div>
  );
}
