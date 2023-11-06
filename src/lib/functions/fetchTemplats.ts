import axios from "axios";

export default async function fetchTemplate(templateId: string, jwt: string)
{
    console.log(jwt);
    try {
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/templates/${templateId}?populate=template.coverLetter.sections,template.coverLetter.previewImage,template.resume.sections,template.resume.previewImage`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        }
        );

        console.log(data);

        console.log(data?.data?.attributes?.template);

        return {
            resume: data?.data?.attributes?.template?.resume,
            coverLetter: data.data?.attributes?.template?.coverLetter,
            error: null,
        };
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            return {
                error: error.response?.data?.error?.message
            };
        } else {
            return {
                error: "Something went wrong"
            };
        }
    }
}
