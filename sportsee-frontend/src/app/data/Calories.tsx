import Image from "next/image";
import React, { useEffect, useState } from "react";
import { DataFormatter } from "../utils/dataFormatter";
import { getCalorieCount } from "../API/GetData";
import { useUser } from "../providers/UserContext";

export default function Calories() {
  const {userId} = useUser();
  const [calorieCount, setCalorieCount] = useState<number | null>(null);
console.log(calorieCount);

  useEffect(() => {
    const fetchCalorieCount = async () => {
      if (userId) {
        try {
          const calorieData = await getCalorieCount(userId);
          console.log(calorieData);
          
          setCalorieCount(calorieData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchCalorieCount();
  }, [userId]);

  const caloriesCountDataFormatted = calorieCount !== null ? DataFormatter.CaloriesDataFormatter(calorieCount) + "kCal" : "Données non disponibles"
  console.log(caloriesCountDataFormatted);
  
  return (
    <div className="dropshadow2 flex h-[124px] w-[258px] items-center bg-[#FBFBFB] pl-8">
      <div className="flex space-x-[24px]">
        <Image
          src="/assets/calories-icon.svg"
          alt="calories"
          width={60}
          height={60}
        />
        <div className="flex-row space-y-[2px] pt-[7px]">
          <h1 className="text-xl font-bold text-[#282D30]">{caloriesCountDataFormatted}</h1>
          <h2 className="text-sm font-medium text-[#74798C]">Calories</h2>
        </div>
      </div>
    </div>
  );
}
