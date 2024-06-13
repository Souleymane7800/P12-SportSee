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

interface Session {
  day: string;
  kilogram: number;
  calories: number;
}

interface CustomTooltipProps {
  payload: { value: number }[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload }) => {
  if (payload && payload.length) {
    return (
      <div className="custom-tooltip grid h-[63px] w-[46px] place-items-center bg-[#E60000] text-[10px] font-medium text-white">
        <p>{payload[0].value}kg</p>
        <p>{payload[1].value}Kcal</p>
      </div>
    );
  }
  return null;
};

// Composant de légende personnalisé
const CustomLegend = (props: any) => {
  const { payload } = props;
  // Define custom labels based on data series
  const labels = ["Poids (kg)", "Calories brûlées (kCal)"];
  return (
    <div className="flex flex-row items-center justify-between pl-[32px] pt-[24px">
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
            {labels[index]} {/* Use labels based on index */}
          </li>
        ))}
      </ul>
    </div>
  );
};

const DailyActivities = () => {
  const { userId } = useUser();
  const [activityData, setActivityData] = useState<any>(null);

  useEffect(() => {
    const fetchActivityData = async () => {
      if (userId) {
        const userData = await getUserActivities(userId);
        setActivityData(userData?.data?.sessions || []);
      }
    };
    fetchActivityData();
  }, [userId]);

  const activityDataFormatted =
    activityData?.map((session: Session) =>
      DataFormatter.activityDataFormatter(session),
    ) || [];

  // const options = {
  //   barThickness: 10, // Set global bar width
  // };

  return (
    <div className="mx-auto flex h-[320px] w-[835px] items-center justify-center border bg-gray-50">
      {activityDataFormatted.length > 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={770}
            height={184}
            barGap={10}
            // barCategoryGap={10}
            data={activityDataFormatted}
            // margin={{
            //   top: 0,
            //   right: 30,
            //   left: 0,
            //   bottom: 5,
            // }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickSize={15}
              tickLine={false}
              className="text-[#9B9EAC]"
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
