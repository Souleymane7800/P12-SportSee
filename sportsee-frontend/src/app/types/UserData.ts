export interface UserInfo {
  firstName: string;
  lastName: string;
  age: number;
}

export interface KeyData {
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;
}

export interface ActivitySession {
  day: string;
  kilogram: number;
  calories: number;
}

export interface AverageSession {
  day: number;
  sessionLength: number;
}

export interface Performance {
  kind: {
    [key: number]: string;
  };
  data: Array<{
    value: number;
    kind: number;
  }>;
}

export interface UserData {
  id: number;
  userInfos: UserInfo;
  todayScore?: number;
  score?: number;
  keyData: KeyData;
  activity: {
    userId: number;
    sessions: ActivitySession[];
  };
  averageSessions: {
    userId: number;
    sessions: AverageSession[];
  };
  performance: Performance;
}
