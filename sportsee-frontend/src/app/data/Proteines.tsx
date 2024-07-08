import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "../providers/UserContext";
import { getProteineCount } from "../API/GetData";
import mockedData from '../../../public/mockData/mockedData.json';

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
            (user: { id: number }) => user.id === userId
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

  const proteineCountDisplay = typeof proteineCount === 'number' && !isNaN(proteineCount)
    ? `${proteineCount}g`
    : "Données non disponibles";

  return (
    <div className="dropshadow2 relative flex h-[124px] w-[258px] items-center bg-[#FBFBFB] pl-8 lg:pl-4 border-2 border-gray-300">
      <div className="flex space-x-[24px] lg:space-x-[12px]">
        <Image
          src="/assets/protein-icon.svg"
          alt="proteines"
          width={60}
          height={60}
        />
        <div className="flex-row space-y-[2px] pt-[7px]">
          <h1 className="text-xl font-bold text-[#282D30]">{proteineCountDisplay}</h1>
          <h2 className="text-sm font-medium text-[#74798C]">Proteines</h2>
        </div>
      </div>
    </div>
  );
}

// ====================
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useUser } from "../providers/UserContext";
// import { getProteineCount } from "../API/GetData";
// import mockedData from '../../../public/mockData/mockedData.json';

// interface ProteinesProps {
//   useMockedData: boolean;
// }

// export default function Proteines({ useMockedData }: ProteinesProps) {
//   const { userId } = useUser();
//   const [proteineCount, setProteineCount] = useState<number | null>(null);
//   const [dataSource, setDataSource] = useState<string>("");

//   useEffect(() => {
//     const fetchProteineCount = async () => {
//       if (userId) {
//         if (useMockedData) {
//           console.log("Utilisation des données mockées pour Proteines");
//           const mockedUser = mockedData.USER_MAIN_DATA.find(
//             (user: { id: number }) => user.id === (userId)
//           );
//           const mockedProteineCount = mockedUser?.keyData?.proteinCount;
//           console.log("Données mockées récupérées pour Proteines:", mockedProteineCount);
//           setProteineCount(mockedProteineCount || null);
//           setDataSource("Données mockées");
//         } else {
//           console.log("Utilisation de l'API pour Proteines");
//           try {
//             const proteineData = await getProteineCount(userId);
//             console.log("Données API récupérées pour Proteines:", proteineData);
//             setProteineCount(proteineData);
//             setDataSource("Données API");
//           } catch (error) {
//             console.error("Error fetching user data:", error);
//             setDataSource("Erreur de chargement");
//           }
//         }
//       }
//     };

//     fetchProteineCount();
//   }, [userId, useMockedData]);

//   const proteineCountDisplay = typeof proteineCount === 'number' && !isNaN(proteineCount)
//     ? `${proteineCount}g`
//     : "Données non disponibles";

//   return (
//     <div className="dropshadow2 relative flex h-[124px] w-[258px] items-center bg-[#FBFBFB] pl-8">
//       {/* Indicateur de source de données */}
//       <div className="absolute right-2 top-2 text-xs text-black bg-gray-200 px-2 py-1 rounded">
//         {dataSource}
//       </div>
//       <div className="flex space-x-[24px]">
//         <Image
//           src="/assets/protein-icon.svg"
//           alt="proteines"
//           width={60}
//           height={60}
//         />
//         <div className="flex-row space-y-[2px] pt-[7px]">
//           <h1 className="text-xl font-bold text-[#282D30]">{proteineCountDisplay}</h1>
//           <h2 className="text-sm font-medium text-[#74798C]">Proteines</h2>
//         </div>
//       </div>
//     </div>
//   );
// }
