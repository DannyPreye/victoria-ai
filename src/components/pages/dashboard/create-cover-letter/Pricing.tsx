"use client";
import Modal from "@/components/shared/Modal";
import React, { useEffect, useState } from "react";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { EachPricing } from "./EachPricing";
import { useSession } from "next-auth/react";
import { Plans } from "@/lib/types";
import { gqlQery } from "@/config/graphql.config";
import { queryPlans } from "@/lib/graphql-query";
import { Circles } from "react-loader-spinner";

interface PricingProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    callbackURL: string;
    templateId?: string;
}

const Pricing = ({
    isModalOpen,
    setIsModalOpen,
    // plans,
    callbackURL,
    templateId,
}: PricingProps) => {
    const { data: session } = useSession();
    const subcriptionPlan = async () => await getUserSubscriptionPlan();
    const [plans, setPlans] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPlans = async () => {
        setIsLoading(true);
        try {
            const plans = await gqlQery(queryPlans);
            setPlans(plans);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const sortPlans = (a: any, b: any) => {
        return a.id - b.id;
    };

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
                    {isLoading ? (
                        <div className=' grid place-items-center py-5'>
                            <Circles
                                height='80'
                                width='80'
                                color='#07397D'
                                ariaLabel='circles-loading'
                                visible={true}
                            />
                        </div>
                    ) : (
                        <div className='flex lg:flex-nowrap flex-wrap justify-center gap-[32px]'>
                            {plans?.plans?.data
                                .slice() //This makes a shallow copy of the array to prevent error when sorting
                                .sort(sortPlans)
                                ?.map((item: any, id: any) => (
                                    <EachPricing
                                        plan={item}
                                        index={id}
                                        callbackURL={callbackURL}
                                        user={session?.user}
                                        templateId={templateId as string}
                                        subscriptionPlan={subcriptionPlan}
                                        key={`pricing_${id}`}
                                    />
                                ))}
                        </div>
                    )}
                    <div className='text-[20px] text-center text-gray-600 font-[400] my-4 leading-[30px]'>
                        {/* <p className=' '>
                            <span className='text-bold r'> IMPORTANT:</span>
                            Each cover letter stays on your account for 72 hours
                            post-creation. Please edit and publish within this
                            period!
                        </p> */}
                        <p>All documents are deleted after 60 days.</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default Pricing;
