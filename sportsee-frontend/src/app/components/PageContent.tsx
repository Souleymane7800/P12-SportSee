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

const USE_MOCKED_DATA = false; // false pour utiliser l'API

export default function PageContent() {
  const { userId } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId) {
        if (USE_MOCKED_DATA) {
          const mockedUser = mockedData.USER_MAIN_DATA.find(
            (user: { id: number }) => user.id === userId,
          );
          if (mockedUser?.userInfos) {
            setUserData(mockedUser.userInfos);
          } else {
            setError(
              "Une erreur s'est produite lors de la récupération des données.\nVeuillez réessayer plus tard.",
            );
          }
        } else {
          try {
            const userData = await getUserInfos(userId);
            if (userData?.data?.userInfos) {
              setUserData(userData.data.userInfos);
            } else {
              setError(
                "Une erreur s'est produite lors de la récupération des données.\nVeuillez réessayer plus tard.",
              );
            }
          } catch (error) {
            setError(
              "Une erreur s'est produite lors de la récupération des données.\nVeuillez réessayer plus tard.",
            );
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

  if (error) {
    return (
      <div className="flex h-[calc(100vh-91px)] flex-grow items-center justify-center pl-[107px]">
        <p className="text-center text-2xl text-red-500 lg:pr-20">
          {error.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < error.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(50vh-45.5px)] w-[calc(50vw-58.5px)] flex-grow lg:h-[calc(100vh-91px)] lg:w-[calc(100vw-117px)] lg:pl-[47px] lg:pr-[30px] xl:pl-[107px] xl:pr-0">
      {USE_MOCKED_DATA && (
        <div className="mb-4 rounded bg-yellow-200 p-2 text-yellow-800">
          Attention : Données mockées en cours d'utilisation
        </div>
      )}
      <div className="space-y-[41px] lg:pt-[48px] xl:pt-[68px]">
        <h1 className="text-5xl font-medium text-black lg:text-4xl">
          Bonjour
          <span className="text-red-500"> {userData?.firstName}</span>
        </h1>

        <h2 className="pb-[77px] text-[18px] font-normal">
          Félicitations ! Vous avez explosé vos objectifs hier 👏
        </h2>
      </div>
      <div className="main-container flex space-x-[31px] lg:gap-8 lg:space-x-0 xl:gap-16">
        <div className="left-section flex-row space-y-[28px]">
          <DailyActivities useMockedData={USE_MOCKED_DATA} />
          <div className="flex space-x-[30px]">
            <Goals useMockedData={USE_MOCKED_DATA} />
            <RadarFit useMockedData={USE_MOCKED_DATA} />
            <Kpi useMockedData={USE_MOCKED_DATA} />
          </div>
        </div>
        <div className="right-section flex-row lg:gap-4 lg:space-y-0 xl:space-y-[39px]">
          <Calories useMockedData={USE_MOCKED_DATA} />
          <Proteines useMockedData={USE_MOCKED_DATA} />
          <Glucides useMockedData={USE_MOCKED_DATA} />
          <Lipides useMockedData={USE_MOCKED_DATA} />
        </div>
      </div>
    </div>
  );
}
