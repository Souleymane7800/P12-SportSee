import Image from "next/image";
import React from "react";

export default function Calories() {
  return (
    <div className="dropshadow2 flex h-[124px] w-[258px] items-center bg-[#FBFBFB] pl-8">
      <div className="flex space-x-[24px]">
        <Image
          src="/assets/calories-icon.svg"
          alt="calories"
          width={60}
          height={60}
        />
        <div className="flex-row space-y-[2px] pt-[7px]">
          <h1 className="text-xl font-bold text-[#282D30]">1,930kCal</h1>
          <h2 className="text-sm font-medium text-[#74798C]">Calories</h2>
        </div>
      </div>
    </div>
  );
}
