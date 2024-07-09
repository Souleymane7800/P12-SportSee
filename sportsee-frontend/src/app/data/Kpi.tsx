import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getUserInfos } from "../API/GetData";
import { useUser } from "../providers/UserContext";
import mockedData from "../../../public/mockData/mockedData.json";

interface KpiProps {
  useMockedData: boolean;
}

interface UserData {
  todayScore?: number;
  score?: number;
}

const Kpi: React.FC<KpiProps> = ({ useMockedData }) => {
  const { userId } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserInfos = async () => {
      if (userId) {
        if (useMockedData) {
          const mockedUser = mockedData.USER_MAIN_DATA.find(
            (user: { id: number }) => user.id === userId,
          );
          setUserData(mockedUser || null);
        } else {
          try {
            const data = await getUserInfos(userId);
            if (data && data.data) {
              setUserData(data.data);
            } else {
              throw new Error("Invalid data");
            }
          } catch (error) {
            setUserData(null);
          }
        }
      }
    };
    fetchUserInfos();
  }, [userId, useMockedData]);

  if (!userData) {
    return (
      <div className="relative h-[263px] w-[258px] rounded-md bg-[#FBFBFB]">
        <p className="pt-[100px] text-center text-base font-medium text-[#F04438]">
          Une erreur est survenue lors de la récupération des données. Veuillez
          réessayer plus tard.
        </p>
      </div>
    );
  }

  const score = (userData.todayScore || userData.score || 0) * 100;
  const kpiData = [
    { name: "score", value: score },
    { name: "remaining", value: 100 - score },
  ];

  const COLORS = ["#E60000", "#FBFBFB"];

  return (
    <div className="relative h-[263px] w-[258px] rounded-md bg-[#FBFBFB]">
      <p className="z-15 absolute left-[30px] top-[24px] text-[15px] font-medium text-[#20253A]">
        Score
      </p>
      <div className="absolute left-[41%] top-[33%] z-10 grid h-[74px] place-items-center">
        <span className="text-center text-[26px] font-bold text-[#282D30]">
          {score}%
        </span>
        <span className="text-center text-base font-medium text-[#78798C]">
          de votre <br /> objectif
        </span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={kpiData}
            cx="50%"
            cy="50%"
            innerRadius={72}
            outerRadius={84}
            startAngle={90}
            endAngle={450}
            dataKey="value"
          >
            {kpiData.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Kpi;
