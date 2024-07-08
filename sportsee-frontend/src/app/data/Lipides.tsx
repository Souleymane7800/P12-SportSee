import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "../providers/UserContext";
import { getLipideCount } from "../API/GetData";
import mockedData from '../../../public/mockData/mockedData.json';

interface LipidesProps {
  useMockedData: boolean;
}

export default function Lipides({ useMockedData }: LipidesProps) {
  const { userId } = useUser();
  const [lipideCount, setLipideCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchLipideCount = async () => {
      if (userId) {
        if (useMockedData) {
          const mockedUser = mockedData.USER_MAIN_DATA.find(
            (user: { id: number }) => user.id === userId
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

  const lipideCountDisplay = typeof lipideCount === 'number' && !isNaN(lipideCount)
    ? `${lipideCount}g`
    : "Données non disponibles";

  return (
    <div className="dropshadow2 relative flex h-[124px] w-[258px] items-center bg-[#FBFBFB] pl-8 lg:pl-4 border-2 border-gray-300">
      <div className="flex space-x-[24px]">
        <Image
          src="/assets/fat-icon.svg"
          alt="lipides"
          width={60}
          height={60}
        />
        <div className="flex-row space-y-[2px] pt-[7px]">
          <h1 className="text-xl font-bold text-[#282D30]">{lipideCountDisplay}</h1>
          <h2 className="text-sm font-medium text-[#74798C]">Lipides</h2>
        </div>
      </div>
    </div>
  );
}


// ===========================================
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useUser } from "../providers/UserContext";
// import { getLipideCount } from "../API/GetData";
// import mockedData from '../../../public/mockData/mockedData.json';

// interface LipidesProps {
//   useMockedData: boolean;
// }

// export default function Lipides({ useMockedData }: LipidesProps) {
//   const { userId } = useUser();
//   const [lipideCount, setLipideCount] = useState<number | null>(null);
//   const [dataSource, setDataSource] = useState<string>("");

//   useEffect(() => {
//     const fetchLipideCount = async () => {
//       if (userId) {
//         if (useMockedData) {
//           console.log("Utilisation des données mockées pour Lipides");
//           const mockedUser = mockedData.USER_MAIN_DATA.find(
//             (user: { id: number }) => user.id === (userId)
//           );
//           const mockedLipideCount = mockedUser?.keyData?.lipidCount;
//           console.log("Données mockées récupérées pour Lipides:", mockedLipideCount);
//           setLipideCount(mockedLipideCount || null);
//           setDataSource("Données mockées");
//         } else {
//           console.log("Utilisation de l'API pour Lipides");
//           try {
//             const lipideData = await getLipideCount(userId);
//             console.log("Données API récupérées pour Lipides:", lipideData);
//             setLipideCount(lipideData);
//             setDataSource("Données API");
//           } catch (error) {
//             console.error("Error fetching user data:", error);
//             setDataSource("Erreur de chargement");
//           }
//         }
//       }
//     };

//     fetchLipideCount();
//   }, [userId, useMockedData]);

//   const lipideCountDisplay = typeof lipideCount === 'number' && !isNaN(lipideCount)
//     ? `${lipideCount}g`
//     : "Données non disponibles";

//   return (
//     <div className="dropshadow2 relative flex h-[124px] w-[258px] items-center bg-[#FBFBFB] pl-8">
//       {/* Indicateur de source de données */}
//       <div className="absolute right-2 top-2 text-xs text-black bg-gray-200 px-2 py-1 rounded">
//         {dataSource}
//       </div>
//       <div className="flex space-x-[24px]">
//         <Image
//           src="/assets/fat-icon.svg"
//           alt="lipides"
//           width={60}
//           height={60}
//         />
//         <div className="flex-row space-y-[2px] pt-[7px]">
//           <h1 className="text-xl font-bold text-[#282D30]">{lipideCountDisplay}</h1>
//           <h2 className="text-sm font-medium text-[#74798C]">Lipides</h2>
//         </div>
//       </div>
//     </div>
//   );
// }
