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
      : "Données non disponibles";

  return (
    <div className="dropshadow2 relative flex h-[124px] w-[258px] items-center bg-[#FBFBFB] pl-8 lg:pl-4 border-2 border-gray-300">
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

// =======================================
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { DataFormatter } from "../utils/dataFormatter";
// import { getCalorieCount } from "../API/GetData";
// import { useUser } from "../providers/UserContext";
// import mockedData from '../../../public/mockData/mockedData.json';

// interface CaloriesProps {
//   useMockedData: boolean;
// }

// export default function Calories({ useMockedData }: CaloriesProps) {
//   const { userId } = useUser();
//   const [calorieCount, setCalorieCount] = useState<number | null>(null);
//   const [dataSource, setDataSource] = useState<string>("");

//   useEffect(() => {
//     const fetchCalorieCount = async () => {
//       if (userId) {
//         if (useMockedData) {
//           console.log("Utilisation des données mockées pour Calories");
//           const mockedUser = mockedData.USER_MAIN_DATA.find(
//             (user: { id: number }) => user.id === (userId)
//           );
//           const mockedCalorieCount = mockedUser?.keyData?.calorieCount;
//           console.log("Données mockées récupérées pour Calories:", mockedCalorieCount);
//           setCalorieCount(mockedCalorieCount || null);
//           setDataSource("Données mockées");
//         } else {
//           console.log("Utilisation de l'API pour Calories");
//           try {
//             const calorieData = await getCalorieCount(userId);
//             console.log("Données API récupérées pour Calories:", calorieData);
//             setCalorieCount(calorieData);
//             setDataSource("Données API");
//           } catch (error) {
//             console.error("Error fetching user data:", error);
//             setDataSource("Erreur de chargement");
//           }
//         }
//       }
//     };

//     fetchCalorieCount();
//   }, [userId, useMockedData]);

//   const caloriesCountDataFormatted = typeof calorieCount === 'number' && !isNaN(calorieCount)
//     ? `${DataFormatter.CaloriesDataFormatter(calorieCount)}kCal`
//     : "Données non disponibles";

//   return (
//     <div className="dropshadow2 relative flex h-[124px] w-[258px] items-center bg-[#FBFBFB] pl-8">
//       {/* Indicateur de source de données */}
//       <div className="absolute right-2 top-2 text-xs text-black bg-gray-200 px-2 py-1 rounded">
//         {dataSource}
//       </div>
//       <div className="flex space-x-[24px]">
//         <Image
//           src="/assets/calories-icon.svg"
//           alt="calories"
//           width={60}
//           height={60}
//         />
//         <div className="flex-row space-y-[2px] pt-[7px]">
//           <h1 className="text-xl font-bold text-[#282D30]">{caloriesCountDataFormatted}</h1>
//           <h2 className="text-sm font-medium text-[#74798C]">Calories</h2>
//         </div>
//       </div>
//     </div>
//   );
// }
