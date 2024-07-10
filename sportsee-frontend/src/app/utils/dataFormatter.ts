/**
 * Represents the structure of a session object.
 * @interface
 */
interface Session {
  data: {
    data: { value: number; kind: number }[]; // Array of session objects
  };
}

/**
 * Utility class for formatting various types of data.
 */
export class DataFormatter {
  /**
   * Formats activity data.
   * @param {Object} session - The activity session data.
   * @param {string} session.day - The day of the activity.
   * @param {number} session.kilogram - The weight in kilograms.
   * @param {number} session.calories - The calories burned.
   * @returns {Object} Formatted activity data.
   */
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

  /**
   * Formats a session date.
   * @param {string} dayString - The date string to format.
   * @returns {string} Formatted date string.
   */
  static formatSessionDate(dayString: string): string {
    if (!dayString) return "";

    const parts = dayString.split("-");
    if (parts.length !== 3) return "";

    // Parse the day and remove leading zero if present
    const day = parseInt(parts[2], 10);
    return day.toString();
  }

  /**
   * Formats performance data.
   * @param {any} session - The performance session data.
   * @returns {Array<Object>} Formatted performance data.
   */
  static performanceDataFormatter(
    session: any,
  ): { value: number; kind: string }[] {
    const kindMap: { [key: number]: string } = {
      1: "Cardio",
      2: "Energy",
      3: "Endurance",
      4: "Strength",
      5: "Speed",
      6: "Intensity",
    };

    const newOrder: string[] = [
      "Intensity",
      "Speed",
      "Strength",
      "Endurance",
      "Energy",
      "Cardio",
    ];

    // Determine the data source (API or mocked)
    let performanceData: Array<{ value: number; kind: number }>;
    if (session?.data?.data) {
      // API structure
      performanceData = session.data.data;
    } else if (session?.data) {
      // Possible structure of mocked data
      performanceData = session.data;
    } else if (Array.isArray(session)) {
      // Another possible structure of mocked data
      performanceData = session;
    } else {
      console.error("Unrecognized data format");
      return [];
    }

    // Map session data to new format with kind as string
    const newData = performanceData.map(
      ({ value, kind }: { value: number; kind: number }) => ({
        value,
        kind: kindMap[kind] || `Unknown (${kind})`,
      }),
    );

    // Return the newData sorted according to newOrder
    return newOrder.map(
      (kind) => newData.find((obj) => obj.kind === kind) || { value: 0, kind },
    );
  }

  /**
   * Formats KPI data.
   * @param {any} userData - The user data containing KPI information.
   * @returns {Object} Formatted KPI data.
   */
  static kpiDataFormatter(userData: any): { score: number; remaining: number } {
    const scores = userData?.data?.todayScore || userData?.data?.score;
    const score = scores * 100; // Format score
    const remaining = 100 - score;
    return { score, remaining };
  }

  /**
   * Formats calorie count data.
   * @param {number} count - The calorie count to format.
   * @returns {string} Formatted calorie count.
   */
  static CaloriesDataFormatter(count: number): string {
    if (count.toString().length < 4) return count.toString();
    return count.toLocaleString("en-US", { minimumFractionDigits: 0 });
  }
}
