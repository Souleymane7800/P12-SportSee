import Leftbar from "./components/Leftbar";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="mx-auto flex max-w-[1440px]">
        <Leftbar />
      </main>
    </div>
  );
}
