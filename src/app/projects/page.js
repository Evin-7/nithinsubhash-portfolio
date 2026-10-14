import AtmosphereCanvas from "../../components/AtmosphereCanvas";
import CursorFollower from "../../components/CursorFollower";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Works from "../../views/Works";

export const metadata = {
  title: "Projects | Nithin Subhash",
  description: "Explore selected web, platform, and mobile product design projects by Nithin Subhash.",
};

export default function ProjectsPage() {
  return (
    <div className="app">
      <AtmosphereCanvas />
      <CursorFollower />
      <div className="page-shell">
        <Navbar />
        <main className="content-shell">
          <div id="works">
            <Works allProjectsPage />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
