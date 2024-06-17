import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "../providers/UserContext";
import { getLipideCount } from "../API/GetData";

export default function Lipides() {
  const { userId } = useUser();
  const [lipideCount, setLipideCount] = useState<number | null>(null);
  console.log(lipideCount);

  useEffect(() => {
    const fetchLipideCount = async () => {
      if (userId) {
        try {
          const lipideData = await getLipideCount(userId);
          console.log(lipideData);

          setLipideCount(lipideData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchLipideCount();
  }, [userId]);

  return (
    <div className="dropshadow2 flex h-[124px] w-[258px] items-center bg-[#FBFBFB] pl-8">
      <div className="flex space-x-[24px]">
        <Image
          src="/assets/fat-icon.svg"
          alt="calories"
          width={60}
          height={60}
        />
        <div className="flex-row space-y-[2px] pt-[7px]">
          <h1 className="text-xl font-bold text-[#282D30]">
            {" "}
            {lipideCount !== null
              ? lipideCount + "g"
              : "Données non disponibles"}
          </h1>
          <h2 className="text-sm font-medium text-[#74798C]">Lipides</h2>
        </div>
      </div>
    </div>
  );
}
