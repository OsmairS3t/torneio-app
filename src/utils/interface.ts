export interface ISelect {
  key: string;
  value: string;
}

export interface ITournament {
  id: number;
  name: string;
  modality: string;
  amount_groups: number;
  amount_team: number;
  kind: string;
}

export interface IGroup {
  id: number;
  name: string;
  team_id: number;
  tournament_id: number;
}

export interface ITeam {
  id: number;
  tournament_id: number;
  name: string;
  colors: string;
  players: string;
}

export interface IPlayer {
  id: number;
  name: string;
  age: number;
  number_position: string;
  team_id: number;
}

export interface IGame {
  id: number;
  stage: string;
  data_game: Date;
  time_game: string;
  duration: number;
  team_one: string;
  team_two: string;
  goal_team_one: number;
  goal_team_two: number;
  goal_penalty_one: number;
  goal_penalty_two: number;
  yellow_cards: number;
  red_cards: number;
  winner: string;
  tournament_id: number;
  status_game: boolean;
  group_team: string;
}

export interface IStatusGame {
  game_id: number;
  player_id: number;
  goal: number;
  yellow_card: number;
  red_card: number;
  fault: number;
  group_team: string;
  defeat: number;
  team_name: string;
}

export interface IStatusTeam {
  id: number;
  tournament_id: number;
  team_name: string;
  points: number;
  wins: number;
  defeats: number;
  draws: number;
  goal_scored: number;
  goal_conceded: number;
  goal_difference: number;
  group_team: string;
}

export interface IGameSet {
  id: number;
  id_game: number;
  actual_set: number;
  set_point_one: number;
  set_point_two: number;
}

export interface IPoint {
  totalPointOne: number;
  totalPointTwo: number;
  playedSetOne: {
    gameSet: number;
    setPoint: number;
    totalSet: number;
  }
  playedSetTwo: {
    gameSet: number;
    setPoint: number;
    totalSet: number;
  }
}