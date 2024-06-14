import React, { useEffect, useState } from "react";
import { useUser } from "../providers/UserContext";
import { getUserSessions } from "../API/GetData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

interface Session {
  day: number;
  sessionLength: number;
}

interface CustomTooltipProps {
  payload?: any;
}

export default function Goals() {
  const { userId } = useUser();
  console.log(userId);

  const [sessionData, setSessionData] = useState<any>(null);
  console.log(sessionData);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        if (userId) {
          const sessionData = await getUserSessions(userId);
          setSessionData(sessionData?.data?.sessions || []);
        }
      } catch (error) {
        console.error("Error fetching user average sessions:", error);
      }
    };
    fetchSessionData();
  }, [userId]);

  let LineChartData: { day: number; sessionLength: number }[] = [];
  if (sessionData) {
    LineChartData = sessionData?.data?.sessions.map((session: Session) => ({
      day: session.day,
      sessionLength: session.sessionLength,
    }));
  }

  const CustomCursor = (props: any) => {
    const { points, width, height } = props;
    const { x, y } = points[0];
    const left = x - width;

    return (
      <Rectangle
        x={left}
        y={y - 5}
        width={width}
        height={height + 10}
        stroke="transparent"
        fill="black"
        fillOpacity="0.18"
      />
    );
  };

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload }) => {
    if (payload && payload.length) {
      return (
        <div className="h-[34px] w-[50px] p-0">
          <div className="flex">
            <p className="bg-white p-2 text-center text-[10px] font-medium">
              {`${payload[0].value} min`}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomXAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const days = ["L", "M", "M", "J", "V", "S", "D"];
    return (
      <g
        transform={`translate(${x},${y})`}
        className="absolute bottom-4 left-[14px] flex w-[229px] justify-between text-[12px] uppercase text-white opacity-50"
      >
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="#FFFFFF"
          opacity="0.5"
        >
          {days[payload.value - 1]}
        </text>
      </g>
    );
  };

  return (
    <div className="dropshadow2 relative h-[263px] w-[258px] rounded-md border bg-red-600">
      <h2 className="absolute pl-[34px] pt-[29px] text-[15px] font-medium leading-6 text-white">
        Durée moyenne des <br /> sessions
      </h2>
      {!sessionData?.length && (
        <p className="pt-[100px] text-center text-base font-medium text-white">
          Une erreur est survenue lors de la récupération des données. Veuillez
          réessayer plus tard.
        </p>
      )}
      {sessionData?.length && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sessionData}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={<CustomXAxisTick />}
            />
            <YAxis domain={["dataMin - 20", "dataMax + 45"]} hide={true} />
            <Tooltip
              content={<CustomTooltip />}
              offset={-10}
              cursor={<CustomCursor />}
              position={{ y: 50 }}
            />

            <Line
              type="monotone"
              dataKey="sessionLength"
              stroke="#fff"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
