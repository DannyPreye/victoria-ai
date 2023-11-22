"use client";
import { Plans } from "@/types/plan";
import React, { useEffect, useState } from "react";
import { BiSolidCheckCircle } from "react-icons/bi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { ImPencil } from "react-icons/im";
import Pricing from "@/components/Pricing.components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { gqlQery } from "@/config/grapql/graphql.config";

import { singleUserPlan } from "@/utils/gql/plan.gql";
import { Spinner } from "@chakra-ui/react";

interface Props {
    plans: Plans;
}
const PreferencesPage = ({ plans }: Props) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: session } = useSession();
    const [currentPlan, setCurrentPlan] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserPlan = async () => {
        setIsLoading(true);
        try {
            if (session?.jwt) {
                const data: any = await gqlQery(
                    singleUserPlan(session.user.id as string),
                    session?.jwt as string
                );
                setIsLoading(false);
                setCurrentPlan(
                    data?.usersPermissionsUser?.data.attributes.plan?.data
                        ?.attributes
                );
            }
        } catch (error) {
            setIsLoading(false);

            console.log(error);
        }
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
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                    className=' px-[16px] py-[10px] w-fit rounded-[8px] border-neutrals-500
                flex gap-[8px] text-[14px] font-[500] leading-[120% border-[1px] bg-white items-center '
                >
                    <ImPencil />
                    <span>{!currentPlan ? "Select Plan" : "Change Plan"}</span>
                </button>
            </div>

            {isLoading ? (
                <div className='mt-[48px] grid py-8 place-items-center border-[2px] rounded-[8px] border-gray-200 overflow-hidden'>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='#E1AE25'
                        size='xl'
                    />
                </div>
            ) : currentPlan ? (
                <div className='mt-[48px]  border-[2px] rounded-[8px] border-gray-200 overflow-hidden'>
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
                                ${currentPlan?.Price?.toFixed(2)}
                            </span>
                        </h3>

                        <div className='mt-[19px] grid gap-[16px]'>
                            {currentPlan?.benefits?.map(
                                (plan: any, id: any) => (
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
                                )
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className='mt-[48px] p-16 border-[2px] rounded-[8px] border-gray-200 overflow-hidden'>
                    <p>You are not on any active plan. Please select a plan </p>
                </div>
            )}

            <Pricing
                // plans={plans}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                callbackURL='/dashboard/settings/preferences'
            />
        </div>
    );
};

export default PreferencesPage;
