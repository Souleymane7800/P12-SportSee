import Calories from "../data/Calories";
import Glucides from "../data/Glucides";
import Lipides from "../data/Lipides";
import Proteines from "../data/Proteines";

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
      <div className="flex-row space-y-[39px]">
        <Calories />
        <Proteines />
        <Glucides />
        <Lipides />
      </div>
    </div>
  );
}
