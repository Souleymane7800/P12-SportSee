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

export default function RadarFit() {
  const { userId } = useUser();
  console.log(userId);

  const [userPerformance, setUserPerformance] = useState<any>(null);
  console.log(userPerformance);

  useEffect(() => {
    const fetchUserPerformance = async () => {
      if (userId) {
        try {
          const data = await getUserPerformance(userId);
          setUserPerformance(data);
        } catch (error) {
          console.error("Error fetching user performance:", error);
        }
      }
    };

    fetchUserPerformance();
  }, [userId]);

  let formattedData: { value: number; kind: string }[] = [];
  if (userPerformance) {
    formattedData = DataFormatter.performanceDataFormatter(userPerformance);

    console.log(formattedData);
  }

  return (
    <div className="dropshadow2 h-[263px] w-[258px] place-items-center rounded-sm border bg-[#FBFBFB]">
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
