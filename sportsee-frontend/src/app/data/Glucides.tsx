import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "../providers/UserContext";
import { getGlucideCount } from "../API/GetData";
import mockedData from "../../../public/mockData/mockedData.json";

interface GlucidesProps {
  useMockedData: boolean;
}

export default function Glucides({ useMockedData }: GlucidesProps) {
  const { userId } = useUser();
  const [glucideCount, setGlucideCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchGlucideCount = async () => {
      if (userId) {
        if (useMockedData) {
          const mockedUser = mockedData.USER_MAIN_DATA.find(
            (user: { id: number }) => user.id === userId,
          );
          const mockedGlucideCount = mockedUser?.keyData?.carbohydrateCount;
          setGlucideCount(mockedGlucideCount || null);
        } else {
          try {
            const glucideData = await getGlucideCount(userId);
            setGlucideCount(glucideData);
          } catch (error) {
            setGlucideCount(null);
          }
        }
      }
    };

    fetchGlucideCount();
  }, [userId, useMockedData]);

  const glucideCountDisplay =
    typeof glucideCount === "number" && !isNaN(glucideCount)
      ? `${glucideCount}g`
      : "N/A";

  return (
    <div className="dropshadow2 relative flex h-[124px] w-[258px] items-center bg-[#FBFBFB] pl-8 lg:pl-4">
      <div className="flex space-x-[24px]">
        <Image
          src="/assets/carbs-icon.svg"
          alt="glucides"
          width={60}
          height={60}
        />
        <div className="flex-row space-y-[2px] pt-[7px]">
          <h1 className="text-xl font-bold text-[#282D30]">
            {glucideCountDisplay}
          </h1>
          <h2 className="text-sm font-medium text-[#74798C]">Glucides</h2>
        </div>
      </div>
    </div>
  );
}
