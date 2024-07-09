import Image from "next/image";
import React, { useEffect, useState } from "react";
import { DataFormatter } from "../utils/dataFormatter";
import { getCalorieCount } from "../API/GetData";
import { useUser } from "../providers/UserContext";
import mockedData from "../../../public/mockData/mockedData.json";

interface CaloriesProps {
  useMockedData: boolean;
}

export default function Calories({ useMockedData }: CaloriesProps) {
  const { userId } = useUser();
  const [calorieCount, setCalorieCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCalorieCount = async () => {
      if (userId) {
        if (useMockedData) {
          const mockedUser = mockedData.USER_MAIN_DATA.find(
            (user: { id: number }) => user.id === userId,
          );
          const mockedCalorieCount = mockedUser?.keyData?.calorieCount;
          setCalorieCount(mockedCalorieCount || null);
        } else {
          try {
            const calorieData = await getCalorieCount(userId);
            setCalorieCount(calorieData);
          } catch (error) {
            setCalorieCount(null);
          }
        }
      }
    };

    fetchCalorieCount();
  }, [userId, useMockedData]);

  const caloriesCountDataFormatted =
    typeof calorieCount === "number" && !isNaN(calorieCount)
      ? `${DataFormatter.CaloriesDataFormatter(calorieCount)}kCal`
      : "N/A";

  return (
    <div className="dropshadow2 relative flex h-[124px] w-[258px] items-center bg-[#FBFBFB] pl-8 lg:pl-4">
      <div className="flex space-x-[24px] lg:space-x-[12px]">
        <Image
          src="/assets/calories-icon.svg"
          alt="calories"
          width={60}
          height={60}
        />
        <div className="flex-row space-y-[2px] pt-[7px]">
          <h1 className="text-xl font-bold text-[#282D30]">
            {caloriesCountDataFormatted}
          </h1>
          <h2 className="text-sm font-medium text-[#74798C]">Calories</h2>
        </div>
      </div>
    </div>
  );
}
