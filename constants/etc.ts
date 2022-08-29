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
