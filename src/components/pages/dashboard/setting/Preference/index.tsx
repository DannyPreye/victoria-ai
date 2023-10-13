"use client";
import { PlanEntity, Plans } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { BiSolidCheckCircle } from "react-icons/bi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { ImPencil } from "react-icons/im";
import Pricing from "../../create-cover-letter/Pricing";
import { useSession } from "next-auth/react";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

interface Props {
    plans: Plans;
}
const PreferencesPage = ({ plans }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: session } = useSession();
    // const [userPlanId, setUserPlanId] = useState("");
    const [currentPlan, setCurrentPlan] = useState<any>();

    // const currentPlan = plans.plans.data.find((plan) => plan.id == userPlanId);

    const fetchUserPlan = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/users/${session?.user.id}?populate=plan`,
            {
                headers: {
                    Authorization: `Bearer ${session?.jwt}`,
                },
            }
        );

        const data = await res.json();
        setCurrentPlan(data.plan);
    };

    useEffect(() => {
        fetchUserPlan();
    }, [session?.user.id]);

    return (
        <div>
            <div className='flex flex-col gap-[24px] lg:flex-row lg:justify-between'>
                <div className='text-base-secondary-text'>
                    <h1 className='font-[600] text-[30px] leading-[42px]  '>
                        Preferences
                    </h1>
                    <p className='font-inter text-[14px] leading-[20px] font-[400]'>
                        Lorem ipsum dolor sit ametis ipsum dolor sit ametis
                    </p>
                </div>
                <button
                    style={{
                        boxShadow: "0px 1px 2px 0px rgba(43, 37, 17, 0.05)",
                    }}
                    onClick={() => setIsModalOpen(true)}
                    className=' px-[16px] py-[10px] w-fit rounded-[8px] border-neutrals-500
                flex gap-[8px] text-[14px] font-[500] leading-[120% border-[1px] bg-white items-center '
                >
                    <ImPencil />
                    <span>{!currentPlan ? "Select Plan" : "Change Plan"}</span>
                </button>
            </div>

            {currentPlan ? (
                <div className='mt-[48px] border-[2px] rounded-[8px] border-gray-200 overflow-hidden'>
                    <div
                        className='px-[20px] bg-gray-50 py-[16px] flex items-center justify-between
                 border-b-[2px] border-gray-200 '
                    >
                        <div className='flex items-center gap-[12px]'>
                            <div className='h-[40px] w-[40px] text-white bg-base-secondary-text rounded-full grid place-items-center'>
                                <HiOutlineCheckCircle size={20} />
                            </div>
                            <span className='text-base-secondary-text font-[600] text-[18px] leading-[120%]'>
                                {currentPlan?.Title}
                            </span>
                        </div>
                        <BiSolidCheckCircle
                            size={24}
                            className='text-base-secondary-text'
                        />
                    </div>

                    <div className='p-[16px]'>
                        <h3>
                            <span className='text-base-secondary-text text-[40px] font-[600] leading-[120%] font-plus-jakarta'>
                                ${currentPlan?.Price}
                            </span>
                        </h3>

                        {/* <div className='mt-[19px] grid gap-[16px]'>
                        {currentPlan?.attributes.benefits?.map((plan:any, id:any) => (
                            <div
                                key={id}
                                className='flex gap-[12px] items-center'
                            >
                                <HiOutlineCheckCircle
                                    size={24}
                                    className='text-success-600'
                                />
                                <span className='font-inter text-[16px] font-[400] leading-[24px] text-gray-600'>
                                    {plan.text}
                                </span>
                            </div>
                        ))}
                    </div> */}
                    </div>
                    <Pricing
                        plans={plans}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>
            ) : (
                <div className='mt-[48px] border-[2px] rounded-[8px] border-gray-200 overflow-hidden'>
                    <p>You not on any plan yet. Please select a plan </p>
                </div>
            )}
        </div>
    );
};

export default PreferencesPage;
