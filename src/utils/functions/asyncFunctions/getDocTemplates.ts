import { gqlQery } from "@/config/grapql/graphql.config";
import { Template } from "@/types/template";
import { getTemplates } from "@/utils/gql/template.gql";
import { Session } from "next-auth";

interface Props
{
    session: Session | null;
    setTemplates: React.Dispatch<React.SetStateAction<Template | undefined>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const getDocTemplates = async ({ session, setTemplates, setIsLoading, setError }: Props) =>
{
    console.log("You got me", session);
    try {
        if (session?.jwt) {

            setIsLoading(true);
            const data = await gqlQery(getTemplates(1), session?.jwt);
            setTemplates(data.templates);
            console.log(data);
        }
        setIsLoading(false);
    } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(true);
    }
};
