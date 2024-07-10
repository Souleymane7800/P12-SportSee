import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "../providers/UserContext";
import { getLipideCount } from "../API/GetData";
import mockedData from "../../../public/mockData/mockedData.json";

/**
 * Props for the Lipides component.
 * @interface LipidesProps
 */
interface LipidesProps {
  useMockedData: boolean;
}

/**
 * Lipides component - Displays the user's lipid intake.
 *
 * This component:
 * - Fetches the user's lipid count (real or mocked based on the prop)
 * - Displays the lipid count along with a fat icon
 * - Handles error states and displays 'N/A' if data is unavailable
 *
 * @component
 * @param {LipidesProps} props - The component props
 * @returns {JSX.Element} The rendered Lipides component
 */
export default function Lipides({ useMockedData }: LipidesProps) {
  const { userId } = useUser();
  const [lipideCount, setLipideCount] = useState<number | null>(null);

  useEffect(() => {
    /**
     * Fetches the user's lipid count.
     * @async
     * @function
     */
    const fetchLipideCount = async () => {
      if (userId) {
        if (useMockedData) {
          const mockedUser = mockedData.USER_MAIN_DATA.find(
            (user: { id: number }) => user.id === userId,
          );
          const mockedLipideCount = mockedUser?.keyData?.lipidCount;
          setLipideCount(mockedLipideCount || null);
        } else {
          try {
            const lipideData = await getLipideCount(userId);
            setLipideCount(lipideData);
          } catch (error) {
            setLipideCount(null);
          }
        }
      }
    };

    fetchLipideCount();
  }, [userId, useMockedData]);

  /**
   * Formats the lipid count for display.
   * @type {string}
   */
  const lipideCountDisplay =
    typeof lipideCount === "number" && !isNaN(lipideCount)
      ? `${lipideCount}g`
      : "N/A";

  return (
    <div className="dropshadow2 relative flex h-[124px] w-[258px] items-center bg-[#FBFBFB] pl-8 lg:pl-4">
      <div className="flex space-x-[24px]">
        <Image
          src="/assets/fat-icon.svg"
          alt="lipides"
          width={60}
          height={60}
        />
        <div className="flex-row space-y-[2px] pt-[7px]">
          <h1 className="text-xl font-bold text-[#282D30]">
            {lipideCountDisplay}
          </h1>
          <h2 className="text-sm font-medium text-[#74798C]">Lipides</h2>
        </div>
      </div>
    </div>
  );
}
