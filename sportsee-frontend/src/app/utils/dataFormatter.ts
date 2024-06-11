interface Session {
  data: {
    data: { value: number; kind: number }[]; // Array of session objects
  };
}

export class DataFormatter {
  static ActivityDataFormatter(session: {
    day: string;
    kilogram: number;
    calories: number;
  }): { day: string; Poids: number; Calories: number } {
    return {
      day: this.formatSessionDate(session.day),
      Poids: session.kilogram,
      Calories: session.calories,
    };
  }

  static formatSessionDate(dayString: string): string {
    return dayString.toString(); // Extract date portion assuming YYYY-MM-DD format
  }
}
