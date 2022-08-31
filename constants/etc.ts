export interface CommitsResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: {
            contributionDays: {
              contributionCount: number;
            }[];
          }[];
        };
      };
    };
  };
}

export interface SolvedacResponse {
  handle: string;
  badge: {
    badgeImageUrl: string;
    displayDescription: string;
    displayName: string;
  };
  class: number;
  classDecoration: string;
  exp: number;
  rating: number;
  tier: number;
  profileImageUrl: string;
}

export const PLACEHOLDER =
  "https://user-images.githubusercontent.com/52532871/187715154-2e44e469-18f5-42ba-8152-c782cfeac896.png";
