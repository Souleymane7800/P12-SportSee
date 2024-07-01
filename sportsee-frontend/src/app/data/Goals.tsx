import React, { useEffect, useState } from "react";
import { getUserSessions } from "../API/GetData";
import { useUser } from "../providers/UserContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import mockedData from '../../../public/mockData/mockedData.json';

interface Session {
  day: number;
  sessionLength: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-2">
        <p className="label">{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

interface GoalsProps {
  useMockedData: boolean;
}

const Goals: React.FC<GoalsProps> = ({ useMockedData }) => {
  const { userId } = useUser();
  const [sessionsData, setSessionsData] = useState<Session[]>([]);
  const [dataSource, setDataSource] = useState<string>("");

  useEffect(() => {
    const fetchSessionsData = async () => {
      if (userId) {
        if (useMockedData) {
          console.log("Utilisation des données mockées pour Goals");
          const mockedUser = mockedData.USER_AVERAGE_SESSIONS.find(
            (user: { userId: number }) => user.userId === (userId)
          );
          console.log("Données mockées récupérées pour Goals:", mockedUser?.sessions);
          setSessionsData(mockedUser?.sessions || []);
          setDataSource("Données mockées");
        } else {
          console.log("Utilisation de l'API pour Goals");
          try {
            const userData = await getUserSessions(userId);
            console.log("Données API récupérées pour Goals:", userData?.data?.sessions);
            setSessionsData(userData?.data?.sessions || []);
            setDataSource("Données API");
          } catch (error) {
            console.error("Erreur lors de la récupération des données API pour Goals:", error);
            setDataSource("Erreur de chargement");
          }
        }
      }
    };
    fetchSessionsData();
  }, [userId, useMockedData]);

  useEffect(() => {
    console.log("Données de sessions mises à jour pour Goals:", sessionsData);
  }, [sessionsData]);

  const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <div className="relative h-[263px] w-[258px] rounded-md bg-[#FF0000]">
      <h2 className="absolute left-[34px] top-[29px] w-[147px] text-[15px] font-medium leading-[24px] text-[#FFFFFF] opacity-50">
        Durée moyenne des sessions
      </h2>
      {/* Indicateur de source de données */}
      <div className="absolute right-2 top-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
        {dataSource}
      </div>
      {sessionsData.length === 0 ? (
        <p className="pt-[100px] text-center text-base font-medium text-white">
          Une erreur est survenue lors de la récupération des données. Veuillez
          réessayer plus tard.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={258}
            height={263}
            data={sessionsData}
            margin={{ top: 80, right: 15, left: 15, bottom: 20 }}
          >
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#FFFFFF", opacity: 0.5 }}
              tickFormatter={(value) => dayLabels[value - 1]}
            />
            <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="natural"
              dataKey="sessionLength"
              stroke="#FFFFFF"
              strokeWidth={2}
              dot={false}
              activeDot={{
                stroke: "rgba(255, 255, 255, 0.5)",
                strokeWidth: 10,
                r: 5,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Goals;

