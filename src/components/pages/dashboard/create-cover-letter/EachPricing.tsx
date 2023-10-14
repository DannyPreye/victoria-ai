"use client";
import React, { useState, useTransition } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { PlanEntity } from "@/lib/types";

interface EachPricingProps {
    plan: PlanEntity;
    subscriptionPlan: any;
    user: any;
    index: number;
    callbackURL: string;
}
export const EachPricing = ({
    plan,
    index,
    user,
    callbackURL,
}: EachPricingProps) => {
    const [isPending, setIsPending] = useState(false);
    const colors = ["#07397D", "#139DBC", "#E2BB53"];

    const handleSubscribe = async () => {
        setIsPending(true);
        try {
            const { data } = await axios.post("/api/stripe-subscription", {
                userId: user.id,
                amount: (plan.attributes.Price * 100).toFixed(2),
                productName: plan.attributes.Title,
                customerEmail: user.email,
                planId: plan.id,
                callbackURL,
            });
            setIsPending(false);
            if (data?.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            setIsPending(false);
            toast.error("An error occured");
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
            <h3
                className='text-[48px] mt-[16px] font-[600] leading-[140%]
             text-gray-900'
            >
                ${plan.attributes.Price}
            </h3>
            {/* <p
                className='font-inter leading-[24px] text-center
             font-[400] text-[16px] text-gray-600'
            >
                {plan.subTitle}
            </p> */}
            <button
                onClick={handleSubscribe}
                disabled={isPending}
                style={{
                    background: colors[index || 0],
                }}
                className='mt-[16px] text-[16px] leading-[24px] font-inter
                font-[600] text-white h-[48px] rounded-[8px] w-full py-[12px] gap-2 flex justify-center items-center'
            >
                {/* <span>
                    {plan.stripePriceId == subscriptionPlan.stripeSubscriptionId
                        ? "Manage Plan"
                        : "Get Started"}
                </span>{" "} */}
                <span>Get Started</span>
                {isPending && (
                    <Oval
                        height={24}
                        width={24}
                        color='#4fa94d'
                        wrapperStyle={{}}
                        wrapperClass=''
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor='#E1AE25'
                        strokeWidth={5}
                        strokeWidthSecondary={2}
                    />
                )}
            </button>
            <div className='mt-[32px] grid gap-[16px] border-t-[1px] border-gray-[200] py-[32px]'>
                {plan.attributes.benefits.map((benefit, id) => (
                    <div key={id} className='flex gap-[12px] items-center'>
                        <HiOutlineCheckCircle
                            size={24}
                            className='text-success-600'
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
