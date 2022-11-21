export interface ITeam {
  country: string;
  name: string;
  goals?: number;
  penalties?: number;
}


export interface IMatch {
  id: number;
  venue: string;
  location: string;
  status: string;
  attendance: string;
  stage_name: string;
  home_team_country: string;
  away_team_country: string;
  datetime: string;
  winner: string;
  winner_code: string;
  home_team: ITeam;
  away_team: ITeam;
  last_checked_at: string
  last_changed_at: string;
}


