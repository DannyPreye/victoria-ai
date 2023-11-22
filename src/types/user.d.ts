export interface UpdateUserProps
{
    values: {
        first_name: string,
        last_name: string;
    }, jwt: string,
    user_id: string,
    file?: any;
}

export interface DeleteUserProps
{
    user_id: string;
    jwt: string;
}
