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
}
