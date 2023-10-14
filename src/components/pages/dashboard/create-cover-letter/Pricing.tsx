"use client";
import Modal from "@/components/shared/Modal";
import { pricing } from "@/config/subscription";
import React from "react";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { EachPricing } from "./EachPricing";
import { useSession } from "next-auth/react";
import { Plans } from "@/lib/types";

interface PricingProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    plans: Plans;
    callbackURL: string;
}

const Pricing = ({
    isModalOpen,
    setIsModalOpen,
    plans,
    callbackURL,
}: PricingProps) => {
    const { data: session } = useSession();
    const subcriptionPlan = async () => await getUserSubscriptionPlan();

    return (
        <Modal>
            <div
                onClick={() => setIsModalOpen(false)}
                className={`fixed top-0 left-0 lg:px-[58px] flex-col flex justify-center
                h-screen w-screen bg-[rgba(141,172,216,0.25)] ${
                    isModalOpen ? "block" : "hidden"
                }`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className='bg-white overflow-auto py-[16px]
                     lg:py-[48px] px-[16px] lg:px-[32px]'
                >
                    <div className='text-center grid gap-[16px]'>
                        <h3
                            className='text-gray-900
                         font-[600] text-[36px] leading-[50.4px]'
                        >
                            Simple, transparent pricing
                        </h3>
                        <p className='text-[20px] text-center text-gray-600 font-[400] mb-4 leading-[30px] '>
                            Seeking the best value? It is estimated that the
                            average job seeker applies to 20-25 positions before
                            landing an interview! Opt for the Executive Edition
                            and invest wisely in your job hunt!
                        </p>
                    </div>
                    <div className='flex lg:flex-nowrap flex-wrap justify-center gap-[32px]'>
                        {plans.plans.data?.map((item, id) => (
                            <EachPricing
                                plan={item}
                                index={id}
                                // isCurrentPlan={
                                //     plan.stripeSubscriptionId ==
                                //     item.stripePriceId
                                // }
                                callbackURL={callbackURL}
                                user={session?.user}
                                subscriptionPlan={subcriptionPlan}
                                key={`pricing_${id}`}
                            />
                        ))}
                    </div>
                    <p className='text-[20px] text-center text-gray-600 font-[400] my-4 leading-[30px] '>
                        <span className='text-bold r'> IMPORTANT:</span>
                        Each cover letter stays on your account for 72 hours
                        post-creation. Please edit and publish within this
                        period!
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default Pricing;
