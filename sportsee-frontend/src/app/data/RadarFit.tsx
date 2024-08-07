import React, { useEffect, useState } from "react";
import { DataFormatter } from "../utils/dataFormatter";
import { useUser } from "../providers/UserContext";
import { getUserPerformance } from "../API/GetData";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import mockedData from "../../../public/mockData/mockedData.json";

/**
 * Props for the RadarFit component.
 * @interface RadarFitProps
 */
interface RadarFitProps {
  useMockedData: boolean;
}

/**
 * RadarFit component - Displays user performance data in a radar chart.
 *
 * This component:
 * - Fetches user performance data (real or mocked based on the prop)
 * - Formats the data using DataFormatter
 * - Renders a radar chart using Recharts library
 *
 * @component
 * @param {RadarFitProps} props - The component props
 * @returns {JSX.Element} The rendered RadarFit component
 */
export default function RadarFit({ useMockedData }: RadarFitProps) {
  const { userId } = useUser();
  const [userPerformance, setUserPerformance] = useState<any>(null);

  useEffect(() => {
    /**
     * Fetches user performance data.
     * @async
     * @function
     */
    const fetchUserPerformance = async () => {
      if (userId) {
        if (useMockedData) {
          const mockedPerformance = mockedData.USER_PERFORMANCE.find(
            (user: { userId: number }) => user.userId === userId,
          );
          setUserPerformance(mockedPerformance);
        } else {
          try {
            const data = await getUserPerformance(userId);
            setUserPerformance(data);
          } catch (error) {
            // Error handling is done silently
          }
        }
      }
    };

    fetchUserPerformance();
  }, [userId, useMockedData]);

  let formattedData: { value: number; kind: string }[] = [];
  if (userPerformance) {
    formattedData = DataFormatter.performanceDataFormatter(userPerformance);
  }

  return (
    <div className="dropshadow2 relative h-[263px] w-[258px] place-items-center rounded-sm bg-[#FBFBFB]">
      {!userPerformance && (
        <p className="pt-[100px] text-center text-base font-medium text-[#F04438]">
          Une erreur est survenue lors de la récupération des données. Veuillez
          réessayer plus tard.
        </p>
      )}
      {userPerformance && (
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="rounded-md bg-[#282D30]"
        >
          <RadarChart innerRadius="0" outerRadius="69%" data={formattedData}>
            <PolarGrid radialLines={false} />
            <PolarAngleAxis
              dataKey="kind"
              className="text-[12px] text-white"
              stroke="white"
              tickLine={false}
              dy={4}
              tickSize={15}
            />
            <PolarRadiusAxis tick={false} axisLine={false} />
            <Radar
              dataKey="value"
              fill="#FF0101B2"
              fillOpacity={1}
              stroke="#FF0101B2"
            />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
