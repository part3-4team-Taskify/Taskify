import { useState } from "react";
import Footer from "@/components/landing/Footer";
import LandingMain from "@/components/landing/LandingMain";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <LandingMain setIsLoading={setIsLoading} />
      <Footer />
    </>
  );
}
