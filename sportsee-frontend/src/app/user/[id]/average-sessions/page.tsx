"use client";
import React, { useEffect } from "react";
import { useUser } from "@/app/providers/UserContext";
import { useParams } from "next/navigation";
import Goals from "@/app/data/Goals";

const UserAverageSession = () => {
  const { userId, setUserId } = useUser();
  const { id } = useParams<{ id: string }>();
  const userIdNumber = parseInt(id);

  useEffect(() => {
    setUserId(userIdNumber);
  }, [userIdNumber, setUserId]);

  return (
    <div className="grid place-items-center gap-4 pt-48">
      <Goals />
    </div>
  );
};

export default UserAverageSession;
