import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "../providers/UserContext";
import { getProteineCount } from "../API/GetData";
import mockedData from "../../../public/mockData/mockedData.json";

/**
 * Props for the Proteines component.
 * @interface ProteinesProps
 */
interface ProteinesProps {
  useMockedData: boolean;
}

/**
 * Proteines component - Displays the user's protein intake.
 *
 * This component:
 * - Fetches the user's protein count (real or mocked based on the prop)
 * - Displays the protein count along with a protein icon
 * - Handles error states and displays 'N/A' if data is unavailable
 *
 * @component
 * @param {ProteinesProps} props - The component props
 * @returns {JSX.Element} The rendered Proteines component
 */
export default function Proteines({ useMockedData }: ProteinesProps) {
  const { userId } = useUser();
  const [proteineCount, setProteineCount] = useState<number | null>(null);

  useEffect(() => {
    /**
     * Fetches the user's protein count.
     * @async
     * @function
     */
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

  /**
   * Formats the protein count for display.
   * @type {string}
   */
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
