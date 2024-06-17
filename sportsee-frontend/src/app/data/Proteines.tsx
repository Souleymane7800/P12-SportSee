import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "../providers/UserContext";
import { getProteineCount } from "../API/GetData";

export default function Proteines() {
  const { userId } = useUser();
  const [proteineCount, setProteineCount] = useState<number | null>(null);
  console.log(proteineCount);

  useEffect(() => {
    const fetchProteineCount = async () => {
      if (userId) {
        try {
          const calorieData = await getProteineCount(userId);
          console.log(calorieData);

          setProteineCount(calorieData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchProteineCount();
  }, [userId]);

  return (
    <div className="dropshadow2 flex h-[124px] w-[258px] items-center bg-[#FBFBFB] pl-8">
      <div className="flex space-x-[24px]">
        <Image
          src="/assets/protein-icon.svg"
          alt="calories"
          width={60}
          height={60}
        />
        <div className="flex-row space-y-[2px] pt-[7px]">
          <h1 className="text-xl font-bold text-[#282D30]">
            {proteineCount !== null
              ? proteineCount + "g"
              : "Données non disponibles"}
          </h1>
          <h2 className="text-sm font-medium text-[#74798C]">Proteines</h2>
        </div>
      </div>
    </div>
  );
}
