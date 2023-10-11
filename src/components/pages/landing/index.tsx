import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import WhyUs from "./WhyUs";
import AtAGlance from "./AtAGlance";
import CustomerStories from "./CustomerStories";
import Testimonial from "./Testimonial";
import Support from "./Support";
import Newsletter from "./Newsletter";

interface Props {
    pageData: any;
}
const HomePage = ({ pageData }: Props) => {
    console.log(pageData);
    return (
        <>
            <HeroSection
                heroData={pageData.landingPage.data.attributes?.HeroSection[0]}
            />
            <AboutSection
                sectionData={pageData.landingPage.data.attributes?.JoinSection}
            />
            <WhyUs
                sectionData={
                    pageData.landingPage.data.attributes
                        ?.whyInstaletterSection[0]
                }
            />
            <AtAGlance
                sectionData={
                    pageData.landingPage.data.attributes?.atAGlanceSection
                }
            />
            <CustomerStories
                sectionData={
                    pageData?.landingPage?.data?.attributes
                        ?.CustomerStoriesSection
                }
            />
            <Testimonial
                sectionData={
                    pageData?.landingPage?.data?.attributes?.testimonialSection
                }
            />
            <Support
                sectionData={
                    pageData?.landingPage?.data?.attributes?.faqSection
                }
            />
            <Newsletter
                sectionData={
                    pageData?.landingPage?.data?.attributes?.newsletterSection
                }
            />
        </>
    );
};

export default HomePage;
