interface Session {
  data: {
    data: { value: number; kind: number }[]; // Array of session objects
  };
}

export class DataFormatter {
  static activityDataFormatter(session: {
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

  static performanceDataFormatter(session: Session): { value: number; kind: string }[] {
    const kindMap: { [key: number]: string } = {
      1: "Cardio",
      2: "Energie",
      3: "Endurance",
      4: "Force",
      5: "Vitesse",
      6: "Intensité",
    };

    const newOrder: string[] = [
      "Intensité",
      "Vitesse",
      "Force",
      "Endurance",
      "Energie",
      "Cardio",
    ];

    // Map session data to new format with kind as string
    const newData = session?.data.data.map(({ value, kind }) => ({
      value,
      kind: kindMap[kind],
    }));

    // Return the newData sorted according to newOrder
    return newOrder.map((kind) => newData?.find((obj) => obj.kind === kind)!);
  }

  static kpiDataFormatter(userData: any): {score: number; remaining:number} {
    const scores = userData?.data?.todayScore || userData?.data?.score;
      const score = scores * 100; // Format score
      const remaining = 100 - score;
      return { score, remaining };
  }
}
