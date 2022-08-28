import { CommitsResponse } from "constants/etc";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";

const getColsBySize = (width: number) => {
  switch (width) {
    case 1:
      return 8;
    case 2:
      return 22;
    case 3:
      return 36;
    case 4:
      return 53;
    default:
      return 53;
  }
};

export default function Commits({ id, size }: { id: string; size: number[] }) {
  const [commits, setCommits] = useState(
    null as unknown as {
      contributionDays: {
        contributionCount: number;
      }[];
    }[],
  );
  const fetchCommits = useCallback(async () => {
    const result = (await (
      await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
        body: JSON.stringify({
          query: `query($id: String!) {
                user(login: $id) {
                  contributionsCollection {
                    contributionCalendar {
                      totalContributions
                      weeks {
                        contributionDays {
                          contributionCount
                          weekday
                          date
                        }
                      }
                    }
                  }
                }
              }`,
          variables: { id },
        }),
      })
    ).json()) as CommitsResponse;

    setCommits(result.data.user.contributionsCollection.contributionCalendar.weeks);
  }, []);

  useEffect(() => {
    fetchCommits();
  }, []);

  return (
    <div className="w-full p-1 h-full">
      <div className="w-full h-full flex items-center justify-center overflow-x-auto">
        <div
          className="w-min grid grid-rows-[repeat(7,1fr)] grid-flow-col px-2 gap-[0.25rem] pl-3"
          style={{
            gridTemplateColumns: `(${53 - getColsBySize(size[0])},1fr)`,
          }}
        >
          {commits &&
            commits.slice(53 - getColsBySize(size[0]), 53).map((week, ii) =>
              week.contributionDays.map((days, i) => (
                <div
                  className="w-2 h-2 group relative flex justify-center rounded-sm bg-white bg-opacity-50"
                  key={ii * 10000 + i}
                >
                  <div
                    className="absolute inset-0 bg-white rounded-sm"
                    style={{
                      opacity: Math.min(1, Math.max(0, days.contributionCount / 10)),
                    }}
                  />
                  <div className="absolute z-50 bottom-2 px-2 py-1 text-xs text-white flex flex-col items-center font-bold w-max text-center group-hover:opacity-100 opacity-0 transition-all bg-black bg-opacity-50 pointer-events-none rounded">
                    <div className="text-2xs leading-3 font-normal">
                      {format(new Date(new Date().getTime() - (ii * 7 + i) * 86400000), "MM-dd")}
                    </div>
                    {days.contributionCount}
                    <div className="border-x-transparent border-x-4 border-t-4 border-t-black opacity-50 absolute -bottom-1 w-0 h-0" />
                  </div>
                </div>
              )),
            )}
        </div>
      </div>
    </div>
  );
}
