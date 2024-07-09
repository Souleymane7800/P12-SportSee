"use client";
import React, { useEffect } from "react";
import { useUser } from "@/app/providers/UserContext";
import { useParams } from "next/navigation";
import DailyActivities from "@/app/data/DailyActivities";
import Calories from "@/app/data/Calories";
import Proteines from "@/app/data/Proteines";
import Glucides from "@/app/data/Glucides";
import Lipides from "@/app/data/Lipides";

const UserActivity = () => {
  const { userId, setUserId } = useUser();
  const { id } = useParams<{ id: string }>();
  const userIdNumber = parseInt(id);

  useEffect(() => {
    setUserId(userIdNumber);
  }, [userIdNumber, setUserId]);

  return (
    <div className="grid place-items-center gap-4 pt-48">
      <Calories useMockedData={false} />
      <Proteines useMockedData={false} />
      <Glucides useMockedData={false} />
      <Lipides useMockedData={false} />
    </div>
  );
};

export default UserActivity;
