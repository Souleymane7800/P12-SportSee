"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@/app/providers/UserContext";
import { getUserInfos } from "@/app/API/GetData";
import Home from "@/app/page";

const UserProfile = () => {
  const { id } = useParams<{ id: string }>(); // Utilisation de useParams pour obtenir l'id de l'URL
  const { changeUser } = useUser();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
      if (id) {
        const fetchUserInfo = async () => {
          try {
            const userData = await getUserInfos(parseInt(id, 10));
            setUserData(userData?.data?.userInfos || {});
            changeUser(parseInt(id, 10));
          } catch (error) {
            console.error("Error fetching user information:", error);
          }
        };
    
        fetchUserInfo();
      }
    }, [changeUser, id]);

  if (!id) return <p>Loading...</p>;

  return <Home />;
};

export default UserProfile;
