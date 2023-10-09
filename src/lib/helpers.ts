import axios from "axios";
import { DeleteUserProps, UpdateUserProps } from "./types";

export const deleteUserAccount = async ({ user_id, jwt }: DeleteUserProps) =>
{
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/users/${user_id}`);
    return res;

};


export const updateUserAccount = async ({ values, jwt, file, user_id }: UpdateUserProps) =>
{
    let profile_picture: string = "";
    // If the user updated their profile picture
    if (file) {
        const formData = new FormData();
        formData.append("files", file);
        const res: any = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/upload/`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    // "Content-Type": "application/json",
                },
                body: formData,
                method: "POST",
            }
        );
        const data = await res.json();
        profile_picture = data[ 0 ].id;
    }

    const body = profile_picture
        ? {
            ...values,
            profile_picture,
        }
        : {
            ...values,
        };

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/users/${user_id}`,
        {
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            method: "PUT",
        }
    );
    if (res.ok) {
        const { data: parsed_user_data } = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/users/${user_id}?populate=*`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        if (parsed_user_data) {
            return {
                first_name: parsed_user_data?.first_name,
                last_name: parsed_user_data?.last_name,
                profile_picture:
                    parsed_user_data?.profile_picture?.url,
            };
        }

    } else {
        return false;
    }

};
