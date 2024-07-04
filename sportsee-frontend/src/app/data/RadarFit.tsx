import React, { useEffect, useState } from "react";
import { DataFormatter } from "../utils/dataFormatter";
import { useUser } from "../providers/UserContext";
import { getUserPerformance } from "../API/GetData";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import mockedData from '../../../public/mockData/mockedData.json';

interface RadarFitProps {
  useMockedData: boolean;
}

export default function RadarFit({ useMockedData }: RadarFitProps) {
  const { userId } = useUser();
  const [userPerformance, setUserPerformance] = useState<any>(null);

  useEffect(() => {
    const fetchUserPerformance = async () => {
      if (userId) {
        if (useMockedData) {
          const mockedPerformance = mockedData.USER_PERFORMANCE.find(
            (user: { userId: number }) => user.userId === userId
          );
          setUserPerformance(mockedPerformance);
        } else {
          try {
            const data = await getUserPerformance(userId);
            setUserPerformance(data);
          } catch (error) {
            // Error handling is done silently
          }
        }
      }
    };

    fetchUserPerformance();
  }, [userId, useMockedData]);

  let formattedData: { value: number; kind: string }[] = [];
  if (userPerformance) {
    formattedData = DataFormatter.performanceDataFormatter(userPerformance);
  }

  return (
    <div className="dropshadow2 relative h-[263px] w-[258px] place-items-center rounded-sm bg-[#FBFBFB]">
      {!userPerformance && (
        <p className="pt-[100px] text-center text-base font-medium text-[#F04438]">
          Une erreur est survenue lors de la récupération des données. Veuillez
          réessayer plus tard.
        </p>
      )}
      {userPerformance && (
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="rounded-md bg-[#282D30]"
        >
          <RadarChart innerRadius="0" outerRadius="69%" data={formattedData}>
            <PolarGrid radialLines={false} />
            <PolarAngleAxis
              dataKey="kind"
              className="text-[12px] text-white"
              stroke="white"
              tickLine={false}
              dy={4}
              tickSize={15}
            />
            <PolarRadiusAxis tick={false} axisLine={false} />
            <Radar
              dataKey="value"
              fill="#FF0101B2"
              fillOpacity={1}
              stroke="#FF0101B2"
            />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}


// ==================================================
// import React, { useEffect, useState } from "react";
// import { DataFormatter } from "../utils/dataFormatter";
// import { useUser } from "../providers/UserContext";
// import { getUserPerformance } from "../API/GetData";
// import {
//   Radar,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   ResponsiveContainer,
// } from "recharts";
// import mockedData from '../../../public/mockData/mockedData.json';

// interface RadarFitProps {
//   useMockedData: boolean;
// }

// export default function RadarFit({ useMockedData }: RadarFitProps) {
//   const { userId } = useUser();
//   const [userPerformance, setUserPerformance] = useState<any>(null);
//   const [dataSource, setDataSource] = useState<string>("");

//   useEffect(() => {
//     const fetchUserPerformance = async () => {
//       if (userId) {
//         if (useMockedData) {
//           console.log("Utilisation des données mockées pour RadarFit");
//           const mockedPerformance = mockedData.USER_PERFORMANCE.find(
//             (user: { userId: number }) => user.userId === (userId)
//           );
//           console.log("Données mockées récupérées pour RadarFit:", mockedPerformance);
//           setUserPerformance(mockedPerformance);
//           setDataSource("Données mockées");
//         } else {
//           console.log("Utilisation de l'API pour RadarFit");
//           try {
//             const data = await getUserPerformance(userId);
//             console.log("Données API récupérées pour RadarFit:", data);
//             setUserPerformance(data);
//             setDataSource("Données API");
//           } catch (error) {
//             console.error("Error fetching user performance:", error);
//             setDataSource("Erreur de chargement");
//           }
//         }
//       }
//     };

//     fetchUserPerformance();
//   }, [userId, useMockedData]);

//   let formattedData: { value: number; kind: string }[] = [];
//   if (userPerformance) {
//     formattedData = DataFormatter.performanceDataFormatter(userPerformance);
//   }

//   return (
//     <div className="dropshadow2 relative h-[263px] w-[258px] place-items-center rounded-sm bg-[#FBFBFB]">
//       {/* Indicateur de source de données */}
//       <div className="absolute right-2 top-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded z-10">
//         {dataSource}
//       </div>
//       {!userPerformance && (
//         <p className="pt-[100px] text-center text-base font-medium text-[#F04438]">
//           Une erreur est survenue lors de la récupération des données. Veuillez
//           réessayer plus tard.
//         </p>
//       )}
//       {userPerformance && (
//         <ResponsiveContainer
//           width="100%"
//           height="100%"
//           className="rounded-md bg-[#282D30]"
//         >
//           <RadarChart innerRadius="0" outerRadius="69%" data={formattedData}>
//             <PolarGrid radialLines={false} />
//             <PolarAngleAxis
//               dataKey="kind"
//               className="text-[12px] text-white"
//               stroke="white"
//               tickLine={false}
//               dy={4}
//               tickSize={15}
//             />
//             <PolarRadiusAxis tick={false} axisLine={false} />
//             <Radar
//               dataKey="value"
//               fill="#FF0101B2"
//               fillOpacity={1}
//               stroke="#FF0101B2"
//             />
//           </RadarChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// }

