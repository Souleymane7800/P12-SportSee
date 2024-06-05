import React from "react";
import DailyActivities from "../data/DailyActivities";
import Goals from "../data/Goals";
import Radar from "../data/Radar";
import Kpi from "../data/Kpi";
import Calories from "../data/Calories";
import Glucides from "../data/Glucides";
import Proteines from "../data/Proteines";
import Lipides from "../data/Lipides";

export default function PageContent() {
  return (
    <div className="h-[calc(100vh-91px w-[]calc(100vh-117px)] flex-grow pl-[107px]">
      <div className="space-y-[41px] pt-[68px]">
        <h1 className="text-5xl font-medium text-black">
          Bonjour
          <span className="text-red-500"> Miguel</span>
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
