/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import DailyActivities from "../data/DailyActivities";
import Goals from "../data/Goals";
import RadarFit from "../data/RadarFit";
import Kpi from "../data/Kpi";
import Calories from "../data/Calories";
import Glucides from "../data/Glucides";
import Proteines from "../data/Proteines";
import Lipides from "../data/Lipides";
import { getUserInfos } from "../API/GetData";
import { useUser } from "../providers/UserContext";
import { useRouter } from "next/navigation";
import mockedData from "../../../public/mockData/mockedData.json";

const USE_MOCKED_DATA = true; // false pour utiliser l'API

export default function PageContent() {
  const { userId } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId) {
        if (USE_MOCKED_DATA) {
          const mockedUser = mockedData.USER_MAIN_DATA.find(
            (user: { id: number }) => user.id === userId,
          );
          setUserData(mockedUser?.userInfos || {});
        } else {
          try {
            const userData = await getUserInfos(userId);
            setUserData(userData?.data?.userInfos || {});
          } catch (error) {
            // Handle error silently
          }
        }
      }
    };

    fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    if (userId === null) {
      router.push("/");
    }
  }, [userId, router]);

  if (!userId) {
    return (
      <div className="flex h-[calc(100vh-91px)] flex-grow items-center justify-center pl-[107px]">
        <p className="text-2xl text-red-500">
          Aucun utilisateur n'est sélectionné, veuillez choisir un utilisateur.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-91px)] w-[calc(100vh-117px)] flex-grow pl-[107px]">
      {USE_MOCKED_DATA && (
        <div className="bg-yellow-200 text-yellow-800 p-2 mb-4 rounded">
          Attention : Données mockées en cours d'utilisation
        </div>
      )}
      <div className="space-y-[41px] pt-[68px]">
        <h1 className="text-5xl font-medium text-black">
          Bonjour
          <span className="text-red-500"> {userData?.firstName}</span>
        </h1>

        <h2 className="pb-[77px] text-[18px] font-normal">
          Félicitations ! Vous avez explosé vos objectifs hier 👏
        </h2>
      </div>
      <div className="flex space-x-[31px]">
        <div className="flex-row space-y-[28px]">
          <DailyActivities useMockedData={USE_MOCKED_DATA} />
          <div className="flex space-x-[30px]">
            <Goals useMockedData={USE_MOCKED_DATA} />
            <RadarFit useMockedData={USE_MOCKED_DATA} />
            <Kpi useMockedData={USE_MOCKED_DATA} />
          </div>
        </div>
        <div className="flex-row space-y-[39px]">
          <Calories useMockedData={USE_MOCKED_DATA} />
          <Proteines useMockedData={USE_MOCKED_DATA} />
          <Glucides useMockedData={USE_MOCKED_DATA} />
          <Lipides useMockedData={USE_MOCKED_DATA} />
        </div>
      </div>
    </div>
  );
}



// /* eslint-disable react/no-unescaped-entities */
// "use client";
// import React, { useEffect, useState } from "react";
// import DailyActivities from "../data/DailyActivities";
// import Goals from "../data/Goals";
// import RadarFit from "../data/RadarFit";
// import Kpi from "../data/Kpi";
// import Calories from "../data/Calories";
// import Glucides from "../data/Glucides";
// import Proteines from "../data/Proteines";
// import Lipides from "../data/Lipides";
// import { getUserInfos } from "../API/GetData";
// import { useUser } from "../providers/UserContext";
// import { useRouter } from "next/navigation";
// import mockedData from "../../../public/mockData/mockedData.json";

// const USE_MOCKED_DATA = false; // false pour utiliser l'API

// export default function PageContent() {
//   const { userId } = useUser();
//   const router = useRouter();
//   const [userData, setUserData] = useState<any>(null);

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       if (userId) {
//         if (USE_MOCKED_DATA) {
//           // Utilisez les données mockées
//           const mockedUser = mockedData.USER_MAIN_DATA.find(
//             (user: { id: number }) => user.id === userId,
//           );
//           console.log("MOCKEDUSER", mockedUser);
//           setUserData(mockedUser?.userInfos || {});
//         } else {
//           try {
//             // Utilisez l'API
//             const userData = await getUserInfos(userId);
//             setUserData(userData?.data?.userInfos || {});
//           } catch (error) {
//             console.error("Error fetching user data:", error);
//           }
//         }
//       }
//     };

//     fetchUserInfo();
//   }, [userId]);

//   useEffect(() => {
//     if (userId === null) {
//       router.push("/");
//     }
//   }, [userId, router]);

//   if (!userId) {
//     return (
//       <div className="flex h-[calc(100vh-91px)] flex-grow items-center justify-center pl-[107px]">
//         <p className="text-2xl text-red-500">
//           Aucun utilisateur n'est sélectionné, veuillez choisir un utilisateur.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="h-[calc(100vh-91px)] w-[calc(100vh-117px)] flex-grow pl-[107px]">
//       <div className="space-y-[41px] pt-[68px]">
//         <h1 className="text-5xl font-medium text-black">
//           Bonjour
//           <span className="text-red-500"> {userData?.firstName}</span>
//         </h1>

//         <h2 className="pb-[77px] text-[18px] font-normal">
//           Félicitations ! Vous avez explosé vos objectifs hier 👏
//         </h2>
//       </div>
//       <div className="flex space-x-[31px]">
//         <div className="flex-row space-y-[28px]">
//           <DailyActivities useMockedData={USE_MOCKED_DATA} />
//           <div className="flex space-x-[30px]">
//             <Goals useMockedData={USE_MOCKED_DATA} />
//             <RadarFit useMockedData={USE_MOCKED_DATA} />
//             <Kpi useMockedData={USE_MOCKED_DATA} />
//           </div>
//         </div>
//         <div className="flex-row space-y-[39px]">
//           <Calories useMockedData={USE_MOCKED_DATA} />
//           <Proteines useMockedData={USE_MOCKED_DATA} />
//           <Glucides useMockedData={USE_MOCKED_DATA} />
//           <Lipides useMockedData={USE_MOCKED_DATA} />
//         </div>
//       </div>
//     </div>
//   );
// }
