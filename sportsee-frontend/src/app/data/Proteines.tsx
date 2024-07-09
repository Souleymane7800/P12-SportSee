import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "../providers/UserContext";
import { getProteineCount } from "../API/GetData";
import mockedData from "../../../public/mockData/mockedData.json";

interface ProteinesProps {
  useMockedData: boolean;
}

export default function Proteines({ useMockedData }: ProteinesProps) {
  const { userId } = useUser();
  const [proteineCount, setProteineCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchProteineCount = async () => {
      if (userId) {
        if (useMockedData) {
          const mockedUser = mockedData.USER_MAIN_DATA.find(
            (user: { id: number }) => user.id === userId,
          );
          const mockedProteineCount = mockedUser?.keyData?.proteinCount;
          setProteineCount(mockedProteineCount || null);
        } else {
          try {
            const proteineData = await getProteineCount(userId);
            setProteineCount(proteineData);
          } catch (error) {
            setProteineCount(null);
          }
        }
      }
    };

    fetchProteineCount();
  }, [userId, useMockedData]);

  const proteineCountDisplay =
    typeof proteineCount === "number" && !isNaN(proteineCount)
      ? `${proteineCount}g`
      : "N/A";

  return (
    <div className="dropshadow2 relative flex h-[124px] w-[258px] items-center bg-[#FBFBFB] pl-8 lg:pl-4">
      <div className="flex space-x-[24px] lg:space-x-[12px]">
        <Image
          src="/assets/protein-icon.svg"
          alt="proteines"
          width={60}
          height={60}
        />
        <div className="flex-row space-y-[2px] pt-[7px]">
          <h1 className="text-xl font-bold text-[#282D30]">
            {proteineCountDisplay}
          </h1>
          <h2 className="text-sm font-medium text-[#74798C]">Proteines</h2>
        </div>
      </div>
    </div>
  );
}
