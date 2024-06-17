"use client";
import React, { useEffect, useState } from "react";
import DailyActivities from "../data/DailyActivities";
import Goals from "../data/Goals";
import Radar from "../data/RadarFit";
import Kpi from "../data/Kpi";
import Calories from "../data/Calories";
import Glucides from "../data/Glucides";
import Proteines from "../data/Proteines";
import Lipides from "../data/Lipides";
import { getUserInfos } from "../API/GetData";
import { useUser } from "../providers/UserContext";
import { useRouter } from "next/navigation";

export default function PageContent() {
  const { userId, changeUser } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId) {
        try {
          const userData = await getUserInfos(userId);
          setUserData(userData?.data?.userInfos || {});
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    if (userId === null) {
      router.push("/"); // Redirige vers la page d'accueil si userId n'est pas défini
    }
  }, [userId, router]);

  if (userId === null) {
    return (
      <div className="flex h-[calc(100vh-91px)] flex-grow items-center justify-center pl-[107px]">
        <p className="text-2xl text-red-500">
         Aucun utilisateur n'est sélectionné, veuillez choisir un utilisateur.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-91px w-[]calc(100vh-117px)] flex-grow pl-[107px]">
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
          <DailyActivities />
          <div className="flex space-x-[30px]">
            <Goals />
            <Radar />
            <Kpi />
          </div>
        </div>
        <div className="flex-row space-y-[39px]">
          <Calories />
          <Proteines />
          <Glucides />
          <Lipides />
        </div>
      </div>
    </div>
  );
}
