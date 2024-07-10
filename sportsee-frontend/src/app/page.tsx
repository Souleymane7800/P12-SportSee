import Leftbar from "./components/Leftbar";
import Navbar from "./components/Navbar";
import PageContent from "./components/PageContent";

/**
 * Home component - The main layout component for the home page.
 * 
 * This component structures the main layout of the home page, including:
 * - A header with a navigation bar
 * - A main content area with a left sidebar and main page content
 * 
 * The main content area uses responsive width classes to adjust its maximum width
 * based on the viewport size.
 * 
 * @component
 * @returns {JSX.Element} The rendered Home component
 */

export default function Home() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="mx-auto flex w-full max-w-[768px] md:max-w-[1024px] lg:max-w-[1200px] xl:max-w-[1280px] 2xl:max-w-[1440px]">
        <Leftbar />
        <PageContent />
      </main>
    </div>
  );
}
