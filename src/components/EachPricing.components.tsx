"use client";
import React, { useState, useTransition } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi";
import axios from "axios";

import { useSession } from "next-auth/react";
import { Spinner, useToast } from "@chakra-ui/react";
import { PlanEntity } from "@/types/plan";

interface EachPricingProps {
    plan: PlanEntity;
    user: any;
    index: number;
    callbackURL: string;
    templateId: string;
}
export const EachPricing = ({
    plan,
    index,
    user,
    callbackURL,
    templateId,
}: EachPricingProps) => {
    const { data: session } = useSession();
    const [isPending, setIsPending] = useState(false);
    const colors = ["#07397D", "#139DBC", "#E2BB53"];
    const toast = useToast();

    const handleSubscribe = async () => {
        setIsPending(true);
        let docId: string = "";
        try {
            if (templateId) {
                const { data } = await axios.post(
                    `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/create-document`,
                    {
                        templateId,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${session?.jwt}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                docId = data?.data?.id;
            }
            const { data } = await axios.post("/api/stripe-subscription", {
                userId: user.id,
                amount: (plan.attributes.Price * 100).toFixed(2),
                productName: plan.attributes.Title,
                customerEmail: user.email,
                planId: plan.id,
                callbackURL: templateId
                    ? `/dashboard/create-cover-letter/edit/${docId}`
                    : callbackURL,
                templateId,
            });
            setIsPending(false);
            if (data?.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.log(error);
            setIsPending(false);

            toast({
                status: "error",
                description: "Something went wrong. Please try again",
                duration: 9000,
                title: "Error",
                isClosable: true,
            });
        }
    };
    return (
        <div
            className='w-full max-w-[384px] py-[40px]
         px-[32px] border-[1px] flex flex-col items-center shadow-md rounded-[8px]'
        >
            <button
                style={{
                    background: colors[index || 0],
                }}
                className={`w-fit  leading-[20px]
             font-inter text-white rounded-[16px]
             text-[14px] font-[500] px-[12px] py-[4px]`}
            >
                {plan.attributes.Title}
            </button>
            <p className='text-[20px] font-[600] leading-[140%] my-[16px]'>
                {plan?.attributes?.subtitle || (
                    <span className='opacity-0'>fill space</span>
                )}
            </p>
            <h3
                className='text-[48px] mt-[16px] font-[600] leading-[140%]
             text-gray-900'
            >
                ${plan.attributes.Price?.toFixed(2)}
            </h3>

            <button
                onClick={handleSubscribe}
                disabled={isPending}
                style={{
                    background: colors[index || 0],
                }}
                className='mt-[16px] text-[16px] leading-[24px] font-inter
                font-[600] text-white h-[48px] rounded-[8px] w-full py-[12px] gap-2 flex justify-center items-center'
            >
                <span>Get Started</span>
                {isPending && (
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='#E1AE25'
                        size='xl'
                    />
                )}
            </button>
            <div className='mt-[32px] grid gap-[16px] border-t-[1px] border-gray-[200] py-[32px]'>
                {plan.attributes.benefits.map((benefit, id) => (
                    <div key={id} className='flex gap-[12px] items-start'>
                        <HiOutlineCheckCircle
                            size={24}
                            className='text-success-600 flex-shrink-0'
                        />
                        <span className='text-gray-600 leading-[24px] font-inter text-[16px]'>
                            {benefit.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
