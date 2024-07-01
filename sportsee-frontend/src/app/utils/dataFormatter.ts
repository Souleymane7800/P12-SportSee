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
    if (!dayString) return "";
    
    const parts = dayString.split("-");
    if (parts.length !== 3) return "";
    
    // Parse the day and remove leading zero if present
    const day = parseInt(parts[2], 10);
    return day.toString();
  }
  static performanceDataFormatter(session: any): { value: number; kind: string }[] {
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
  
    // Déterminer la source des données (API ou mockées)
    let performanceData: Array<{ value: number; kind: number }>;
    if (session?.data?.data) {
      // Structure de l'API
      performanceData = session.data.data;
    } else if (session?.data) {
      // Structure possible des données mockées
      performanceData = session.data;
    } else if (Array.isArray(session)) {
      // Autre structure possible des données mockées
      performanceData = session;
    } else {
      console.error("Format de données non reconnu");
      return [];
    }
  
    // Map session data to new format with kind as string
    const newData = performanceData.map(({ value, kind }: { value: number; kind: number }) => ({
      value,
      kind: kindMap[kind] || `Unknown (${kind})`,
    }));
  
    // Return the newData sorted according to newOrder
    return newOrder.map((kind) => 
      newData.find((obj) => obj.kind === kind) || { value: 0, kind }
    );
  }

  static kpiDataFormatter(userData: any): { score: number; remaining: number } {
    const scores = userData?.data?.todayScore || userData?.data?.score;
    const score = scores * 100; // Format score
    const remaining = 100 - score;
    return { score, remaining };
  }

  // A refactoriser
  static CaloriesDataFormatter(count: number): string {
    if (count.toString().length < 4) return count.toString();
    return count.toLocaleString("en-US", { minimumFractionDigits: 0 });
  }
}
