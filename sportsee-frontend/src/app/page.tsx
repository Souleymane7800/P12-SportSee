import Leftbar from "./components/Leftbar";
import Navbar from "./components/Navbar";
import PageContent from "./components/PageContent";

export default function Home() {
  return (
    <div >
      <header>
        <Navbar />
      </header>
      <main className="mx-auto flex max-w-[1024px] xl:max-w-[1440px]">
        <Leftbar />
        <PageContent />
      </main>
    </div>
  );
}
