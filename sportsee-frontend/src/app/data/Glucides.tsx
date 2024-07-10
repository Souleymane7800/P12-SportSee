import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "../providers/UserContext";
import { getGlucideCount } from "../API/GetData";
import mockedData from "../../../public/mockData/mockedData.json";

/**
 * Props for the Glucides component.
 * @interface GlucidesProps
 */
interface GlucidesProps {
  useMockedData: boolean;
}

/**
 * Glucides component - Displays the user's carbohydrate intake.
 *
 * This component:
 * - Fetches the user's carbohydrate count (real or mocked based on the prop)
 * - Displays the carbohydrate count along with a carbs icon
 * - Handles error states and displays 'N/A' if data is unavailable
 *
 * @component
 * @param {GlucidesProps} props - The component props
 * @returns {JSX.Element} The rendered Glucides component
 */
export default function Glucides({ useMockedData }: GlucidesProps) {
  const { userId } = useUser();
  const [glucideCount, setGlucideCount] = useState<number | null>(null);

  useEffect(() => {
    /**
     * Fetches the user's carbohydrate count.
     * @async
     * @function
     */
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

  /**
   * Formats the carbohydrate count for display.
   * @type {string}
   */
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
