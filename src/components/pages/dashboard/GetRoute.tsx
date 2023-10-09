"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { GoHomeFill } from "react-icons/go";

const GetRoute = () => {
    const pathnames = usePathname();

    const paths = pathnames.split("/dashboard")[1].split("/");

    console.log("This is the path", paths);
    console.log("This is the path2", paths.slice(0, 3).join("/"));

    return (
        <div className='hidden lg:flex gap-[8px] mb-[4px]'>
            <Link href={"/dashboard"} className='flex items-center gap-[4px]'>
                <GoHomeFill className='text-base-primary-green' />
                <span className='text-[14px] text-gray-iron-500 font-[400] leading-[20px] font-inter'>
                    Home
                </span>
            </Link>

            {paths.map(
                (path, id) =>
                    path !== "" && (
                        <div
                            key={id}
                            className='flex gap-[8px] text-[14px] capitalize
                                 leading-[20px] font-inter font-[400] text-gray-iron-500'
                        >
                            <span>/</span>
                            <Link
                                className={` ${
                                    path == paths[paths.length - 1]
                                        ? "font-[500] text-gray-true-600"
                                        : ""
                                }`}
                                href={`/dashboard${paths
                                    .slice(0, id + 1)
                                    .join("/")}`}
                            >
                                {path.replace(/-/g, " ")}
                            </Link>
                        </div>
                    )
            )}
        </div>
    );
};

export default GetRoute;
