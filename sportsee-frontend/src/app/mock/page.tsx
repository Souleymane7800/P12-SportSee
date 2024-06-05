"use client";

import React, { useState } from "react";
import {
  getUserActivities,
  getUserInfos,
  getUserSessions,
  getUserPerformance,
} from "../API/GetData";

interface Session {
  day: string;
  calories?: number;
  kilogram?: number;
  sessionLength?: number;
}

const MyComponent = () => {
  const [userId, setUserId] = useState<number>(12);
  const [userData, setUserData] = useState<any>(null);
  const [userActivity, setUserActivity] = useState<any>(null);
  const [sessionData, setSessionData] = useState<any>(null);
  const [userPerformance, setUserPerformance] = useState<any>(null);

  const handleUserInfos = async () => {
    const fetchData = await getUserInfos(userId);
    console.log(fetchData);
    setUserData(fetchData);
  };

  const handleUserActivities = async () => {
    const fetchData = await getUserActivities(userId);
    console.log(fetchData);
    setUserActivity(fetchData);
  };

  const handleUserSessionData = async () => {
    const fetchData = await getUserSessions(userId);
    console.log(fetchData);
    setSessionData(fetchData);
  };

  const handleUserPerformance = async () => {
    const fetchData = await getUserPerformance(userId);
    console.log(fetchData);
    setUserPerformance(fetchData);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex justify-between">
          <h2 className="text-2xl font-semibold">
            User Information & Activity
          </h2>
          <input
            type="number"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            placeholder="Enter User ID"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <button
            onClick={handleUserInfos}
            className="rounded-md bg-blue-700 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Get User Information
          </button>
          <button
            onClick={handleUserActivities}
            className="rounded-md bg-cyan-700 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Get User Activities
          </button>
          <button
            onClick={handleUserSessionData}
            className="rounded-md bg-purple-700 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Get User Average Session
          </button>
          <button
            onClick={handleUserPerformance}
            className="rounded-md bg-red-700 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Get User Performance
          </button>
        </div>
      </div>
      <div className="container mx-auto px-4">
        {userData?.data?.userInfos && (
          <>
            <div>
              <div className="mb-2 border-2 border-solid border-indigo-600 ps-4 text-lg font-medium">
                User Details
                <h2 className="flex flex-col">
                  <li>Name: {userData?.data?.userInfos?.firstName} </li>
                  <li>Last name: {userData?.data?.userInfos?.lastName}</li>
                  <li>Age: {userData?.data?.userInfos?.age}</li>
                </h2>
              </div>
              <div className="mb-2 border-2 border-solid border-indigo-600 px-4 ps-4 pt-2">
                <h3 className="mb-2 text-lg font-medium">Key Data</h3>
                <li>Calories: {userData.data?.keyData?.calorieCount}</li>
                <li>Proteins: {userData.data?.keyData?.proteinCount}</li>
                <li>
                  Carbohydrates: {userData.data?.keyData?.carbohydrateCount}
                </li>
                <li>Lipids: {userData.data?.keyData?.lipidCount}</li>
                <li>
                  Todays Score:{" "}
                  {userData.data?.todayScore || userData.data?.score}
                </li>
              </div>
            </div>
          </>
        )}
        {userActivity?.data?.sessions && (
          <div className="mx-auto mb-2 border-2 border-solid border-indigo-600 px-4 ps-4 pt-2">
            <h3 className="mb-2 text-lg font-medium">User Activity</h3>
            {userActivity?.data?.sessions.map((session: Session) => (
              <p key={session.day}>
                Date: {session.day}, Calories: {session.calories}, Poids:{" "}
                {session.kilogram}
              </p>
            ))}
          </div>
        )}
        {sessionData?.data?.sessions && (
          <div className="mx-auto mb-2 border-2 border-solid border-indigo-600 px-4 ps-4 pt-2">
            <h3 className="mb-2 text-lg font-medium">User Average Session</h3>
            {sessionData?.data?.sessions?.map((session: Session) => (
              <p key={session.day}>
                Day: {session.day}, Session Lenght: {session.sessionLength}
              </p>
            ))}
          </div>
        )}
        {userPerformance?.data?.data && (
          <div className="mx-auto mb-2 border-2 border-solid border-indigo-600 px-4 ps-4 pt-2">
            <h3 className="mb-2 text-lg font-medium">User Performance</h3>
            <ul>
              <li>cardio: {userPerformance?.data?.data[0].value}</li>
              <li>energy: {userPerformance?.data?.data[1].value}</li>
              <li>endurance: {userPerformance?.data?.data[2].value}</li>
              <li>strength: {userPerformance?.data?.data[3].value}</li>
              <li>speed: {userPerformance?.data?.data[4].value}</li>
              <li>intensity: {userPerformance?.data?.data[5].value}</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default MyComponent;
