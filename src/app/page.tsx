"use client";

import Hero from "../components/minicomponents/home/Hero";
import AboutusPreview from "../components/minicomponents/home/Aboutus-preview";
import Messages from "../components/minicomponents/home/messages";
import News from "../components/minicomponents/home/News";
import UpcomingEvent from "../components/minicomponents/home/Upcoming-event";
import QuickLinks from "@/components/minicomponents/home/QuickLinks";
import LatestPublications from "@/components/minicomponents/home/Latest-Publications";
import Highlights from "@/components/minicomponents/home/Highlights";
import PastEvents from "@/components/minicomponents/home/PastEvents";
import Footer from "@/components/minicomponents/home/Footer";
import NotableAlumini from "@/components/minicomponents/home/Notable-Alumini";
import Gallery from "@/components/minicomponents/home/Gallery";
import IndustrialTourHome from "@/components/minicomponents/home/Industrial-Tour";


export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutusPreview />
      <Messages />
      <QuickLinks />
      {/* <News />
      <UpcomingEvent />
      <LatestPublications/> */}
      <PastEvents />
      <IndustrialTourHome />
      {/* <News /> */}
      <Gallery />
      <NotableAlumini />
      {/* <Footer/> */}
    </main>
  );
}
