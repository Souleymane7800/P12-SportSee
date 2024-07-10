import React, { useEffect, useState } from "react";
import { getUserActivities } from "../API/GetData";
import { useUser } from "../providers/UserContext";
import { DataFormatter } from "../utils/dataFormatter";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import mockedData from "../../../public/mockData/mockedData.json";

/**
 * Represents a single activity session.
 * @interface Session
 */
interface Session {
  day: string;
  kilogram: number;
  calories: number;
}

/**
 * Props for the CustomTooltip component.
 * @interface CustomTooltipProps
 */
interface CustomTooltipProps {
  payload: { value: number }[];
}

/**
 * CustomTooltip component - Renders a custom tooltip for the bar chart.
 * @component
 * @param {CustomTooltipProps} props - The component props
 * @returns {JSX.Element | null} The rendered CustomTooltip component or null
 */
const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload }) => {
  if (payload && payload.length) {
    return (
      <div
        className="custom-tooltip grid h-[63px] w-[46px] place-items-center bg-[#E60000] text-[10px] font-medium text-white"
        style={{
          transform: "translateY(-100%)",
          marginTop: "-60px",
          position: "relative",
          left: "5px",
        }}
      >
        <p>{payload[0].value}kg</p>
        <p>{payload[1].value}Kcal</p>
      </div>
    );
  }
  return null;
};

/**
 * CustomLegend component - Renders a custom legend for the bar chart.
 * @component
 * @param {Object} props - The component props
 * @param {Array} props.payload - The legend payload
 * @returns {JSX.Element} The rendered CustomLegend component
 */
const CustomLegend = (props: any) => {
  const { payload } = props;
  const labels = ["Poids (kg)", "Calories brûlées (kCal)"];
  return (
    <div className="pt-[24px flex flex-row items-center justify-between pl-[32px]">
      <h1 className="font-medium">Activité quotidienne</h1>
      <ul className="custom-legend flex flex-row items-start">
        {payload.map((entry: any, index: number) => (
          <li
            key={`item-${index}`}
            className="mr-4 flex items-center text-sm font-medium text-[#74798C]"
          >
            <span
              className="mr-3"
              style={{
                display: "inline-block",
                marginRight: 10,
                borderRadius: "50%",
                width: 10,
                height: 10,
                backgroundColor: entry.color,
              }}
            ></span>
            {labels[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * Props for the DailyActivities component.
 * @interface DailyActivitiesProps
 */
interface DailyActivitiesProps {
  useMockedData: boolean;
}

/**
 * DailyActivities component - Displays the user's daily activity data in a bar chart.
 *
 * This component:
 * - Fetches the user's activity data (real or mocked based on the prop)
 * - Formats the data using DataFormatter
 * - Renders a bar chart using Recharts library
 * - Implements custom tooltips and legends
 * - Handles error states and displays an error message if data is unavailable
 *
 * @component
 * @param {DailyActivitiesProps} props - The component props
 * @returns {JSX.Element} The rendered DailyActivities component
 */
const DailyActivities: React.FC<DailyActivitiesProps> = ({ useMockedData }) => {
  const { userId } = useUser();
  const [activityData, setActivityData] = useState<any>(null);

  useEffect(() => {
    /**
     * Fetches the user's activity data.
     * @async
     * @function
     */
    const fetchActivityData = async () => {
      if (userId) {
        if (useMockedData) {
          const mockedUser = mockedData.USER_ACTIVITY.find(
            (user: { userId: number }) => user.userId === userId,
          );
          setActivityData(mockedUser?.sessions || []);
        } else {
          try {
            const userData = await getUserActivities(userId);
            setActivityData(userData?.data?.sessions || []);
          } catch (error) {
            setActivityData([]);
          }
        }
      }
    };
    fetchActivityData();
  }, [userId, useMockedData]);

  /**
   * Formatted activity data for the chart.
   * @type {Array}
   */
  const activityDataFormatted =
    activityData?.map((session: Session) =>
      DataFormatter.activityDataFormatter(session),
    ) || [];

  return (
    <div className="mx-auto flex h-[320px] w-[835px] items-center justify-center bg-gray-50 lg:w-[817px]">
      {activityData === null || activityData.length === 0 ? (
        <p className="pt-[50px] text-center text-base font-bold text-[#F04438]">
          Une erreur est survenue lors de la récupération des données. Veuillez
          réessayer plus tard.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={770}
            height={184}
            barGap={5}
            barCategoryGap={56}
            data={activityDataFormatted}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="2 2" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickSize={15}
              tickLine={false}
              tick={{ fill: "#9B9EAC" }}
            />
            <YAxis
              dataKey="Poids"
              orientation="right"
              domain={[0, 520]}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip payload={[]} />} />
            <Legend
              content={<CustomLegend />}
              verticalAlign="top"
              align="right"
              wrapperStyle={{
                lineHeight: "60px",
              }}
            />
            <Bar
              dataKey="Poids"
              fill="#282D30"
              barSize={7}
              radius={[20, 20, 0, 0]}
            />
            <Bar
              dataKey="Calories"
              fill="#E60000"
              barSize={7}
              radius={[20, 20, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DailyActivities;
