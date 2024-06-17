import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "../providers/UserContext";
import { getGlucideCount } from "../API/GetData";

export default function Glucides() {
  const { userId } = useUser();
  const [glucideCount, setGlucideCount] = useState<number | null>(null);
  console.log(glucideCount);

  useEffect(() => {
    const fetchGlucideCount = async () => {
      if (userId) {
        try {
          const glucideData = await getGlucideCount(userId);
          console.log(glucideData);

          setGlucideCount(glucideData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchGlucideCount();
  }, [userId]);

  return (
    <div className="dropshadow2 flex h-[124px] w-[258px] items-center bg-[#FBFBFB] pl-8">
      <div className="flex space-x-[24px]">
        <Image
          src="/assets/carbs-icon.svg"
          alt="calories"
          width={60}
          height={60}
        />
        <div className="flex-row space-y-[2px] pt-[7px]">
          <h1 className="text-xl font-bold text-[#282D30]">
            {glucideCount !== null
              ? glucideCount + "g"
              : "Données non disponibles"}
          </h1>
          <h2 className="text-sm font-medium text-[#74798C]">Glucides</h2>
        </div>
      </div>
    </div>
  );
}
