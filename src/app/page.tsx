import HomeNavbar from "@/components/home-navbar";
import HomeLandingPage from "@/contents/landing-page/home";
import FeatureLandingPage from "@/contents/landing-page/feature";
import HowItWorkLandingPage from "@/contents/landing-page/how-it-work";
import FooterLandingPage from "@/contents/landing-page/footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HomeNavbar />
      <HomeLandingPage />
      <FeatureLandingPage />
      <HowItWorkLandingPage />
      <FooterLandingPage />
    </div>
  );
}
