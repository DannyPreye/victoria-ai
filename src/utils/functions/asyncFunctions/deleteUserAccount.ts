import { DeleteUserProps } from "@/types/user";
import axios from "axios";

export const deleteUserAccount = async ({ user_id, jwt }: DeleteUserProps) =>
{
    const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/users/${user_id}`, {
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    });
    return data;

};