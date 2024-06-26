"use client";
import React, { useEffect } from "react";
import { useUser } from "@/app/providers/UserContext";
import { useParams } from "next/navigation";
import RadarFit from "@/app/data/RadarFit";

const UserFitness = () => {
  const { userId, setUserId } = useUser();
  const { id } = useParams<{ id: string }>();
  const userIdNumber = parseInt(id);

  useEffect(() => {
    setUserId(userIdNumber);
  }, [userIdNumber, setUserId]);
  return (
    <div className="grid place-items-center pt-48">
      <RadarFit />
    </div>
  );
};

export default UserFitness;
