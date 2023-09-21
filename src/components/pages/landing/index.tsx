import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import WhyUs from "./WhyUs";
import AtAGlance from "./AtAGlance";
import CustomerStories from "./CustomerStories";
import Testimonial from "./Testimonial";
import Support from "./Support";
import Newsletter from "./Newsletter";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <WhyUs />
            <AtAGlance />
            <CustomerStories />
            <Testimonial />
            <Support />
            <Newsletter />
        </>
    );
};

export default HomePage;
