import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { getUserInfos } from "../API/GetData";
import { DataFormatter } from "../utils/dataFormatter";
import { useUser } from "../providers/UserContext";

export default function Kpi() {
  const { userId } = useUser();
  console.log(userId);

  const [userData, setUserData] = useState<any>(null);
  console.log(userData);

  useEffect(() => {
    const fetchUserInfos = async () => {
      try {
        const data = await getUserInfos(userId);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user infos:", error);
      }
    };
    fetchUserInfos();
  }, [userId]);

  const kpiData = DataFormatter.kpiDataFormatter(userData || {});
  const COLORS = ["#E60000", "#FBFBFB"];

  return (
    <div className="relative h-[263px] w-[258px] rounded-md border bg-[#FBFBFB]">
      <p className="absolute left-[30px] top-[24px] z-15 text-[15px] font-medium text-[#20253A]">
        Score
      </p>
      {!userData && (
        <p className="pt-[100px] text-center text-base font-medium text-[#F04438]">
          Une erreur est survenue lors de la récupération des données. Veuillez
          réessayer plus tard.
        </p>
      )}
      {userData && (
        <>
          <div className="absolute left-[41%] top-[33%] z-10 grid h-[74px] place-items-center">
            <span className="text-center text-[26px] font-bold text-[#282D30]">
              {kpiData.score}%
            </span>
            <span className="text-center text-base font-medium text-[#78798C]">
              de votre <br /> objectif
            </span>
          </div>
          {kpiData.score !== undefined && kpiData.remaining !== undefined && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  data={[
                    { name: "score", value: kpiData.score },
                    { name: "remaining", value: kpiData.remaining },
                  ]}
                  innerRadius={72}
                  outerRadius={84}
                  startAngle={90}
                  endAngle={480}
                  width={200}
                  height={200}
                >
                  <Cell key="score" fill={COLORS[0]} />
                  <Cell key="remaining" fill={COLORS[1]} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </>
      )}
    </div>
  );
}
