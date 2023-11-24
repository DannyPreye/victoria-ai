import { gqlQery } from "@/config/grapql/graphql.config";
import { CoverletterSectionType, ResumeSectionType } from "@/types/document";
import { singleUserPlan } from "@/utils/gql/plan.gql";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import axios from "axios";
import { Session } from "next-auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { convertObjectToArray } from "../converNumericObjectToArray";

interface GenerateDocumentProps
{
  handleCreateDocumentProps: {
    session: Session | null;
    templateTitle: string;
    coverLetterTemplate: CoverletterSectionType;
    resumeTemplate: ResumeSectionType;
    onOpen: () => void;
    setShouldEnterJobDetailsManually: (a: boolean) => void;
    toast: (options?: UseToastOptions | undefined) => ToastId;
    router: AppRouterInstance;
  };
  values: {
    job_listing_url: string;
    company_url: string;
    notes: string;
    what_describes_you: string;
    jobtitle: string;
    job_description: string;
  };
  document_url: string;
}
export const generateDocument = async ({
  handleCreateDocumentProps,
  values,
  document_url,
}: GenerateDocumentProps) =>
{
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/generate-document`,
      { ...values, document_url },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("data is ", data);

    if (data) {
      if (data.error && data.message == "Failed to scrape") {
        handleCreateDocumentProps.setShouldEnterJobDetailsManually(true);
        handleCreateDocumentProps.toast({
          title: "Error",
          description:
            "Unable to scrap the URL, please enter job details manually",
          status: "error",
          duration: 5000,
          isClosable: true,
        });

        throw Error();
      }
      const create = await handleCreate({ ...handleCreateDocumentProps, response: data });
    }
  } catch (error) {
    console.log("error is ", error);
    throw Error();
  }
};

interface HandleCreateProps
{
  response: any;
  session: Session | null;
  templateTitle: string;
  coverLetterTemplate: CoverletterSectionType;
  resumeTemplate: ResumeSectionType;
  onOpen: () => void;
  toast: (options?: UseToastOptions | undefined) => ToastId;
  router: AppRouterInstance;
}
const handleCreate = async ({
  response,
  session,
  router,
  toast,
  onOpen,
  templateTitle,
  coverLetterTemplate,
  resumeTemplate,
}: HandleCreateProps) =>
{
  if (response.status == 200) {
    try {
      const data: any = await gqlQery(
        singleUserPlan(session?.user.id as string),
        session?.jwt as string
      );



      if (data?.usersPermissionsUser?.data.attributes.plan?.data) {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/user-documents`,
          {
            data: {
              users_permissions_user: session?.user.id,
              templateType: templateTitle,
              template: {
                coverLetter: {
                  previewImage: coverLetterTemplate.previewImage.data?.id,
                  sections: {
                    ...coverLetterTemplate.sections,
                    heading: {
                      ...coverLetterTemplate.sections.heading,
                      username: response.coverletter?.find(
                        (item: any) => item.sectionTitle === "heading"
                      )?.username,
                      contact: {
                        ...coverLetterTemplate.sections?.heading.contact,
                        phone: response.coverletter?.find(
                          (item: any) => item.sectionTitle === "heading"
                        )?.phone,
                        email: response.coverletter?.find(
                          (item: any) => item.sectionTitle === "heading"
                        )?.email,
                      },
                      professionalTitle: response.coverletter?.find(
                        (item: any) => item.sectionTitle === "heading"
                      )?.professionalTitle,
                    },
                    opener: response.coverletter?.find(
                      (item: any) => item.sectionTitle === "Opener"
                    )?.content,

                    body_1: response.coverletter?.find(
                      (item: any) => item.sectionTitle === "Body 1"
                    )?.content,
                    body_2: response.coverletter?.find(
                      (item: any) => item.sectionTitle === "Body 2"
                    )?.content,
                    body_3: response.coverletter?.find(
                      (item: any) => item.sectionTitle === "Body 3"
                    )?.content,
                    conclusion: response.coverletter?.find(
                      (item: any) => item.sectionTitle === "Conclusion"
                    )?.content,
                    call_to_action: response.coverletter?.find(
                      (item: any) => item.sectionTitle === "Call To Action"
                    )?.content,
                  },
                },
                resume: {
                  sections: {
                    ...response.resume,
                    eduction: response.resume.education
                      ? convertObjectToArray(response.resume.education)
                      : [],
                    skills: response.resume.skills
                      ? convertObjectToArray(response.resume.skills)
                      : [],
                    reference: response.resume.reference
                      ? convertObjectToArray(response.resume.reference)
                      : [],
                    otherSections: [],
                    workExperience: response.resume.workExperience
                      ? convertObjectToArray(response.resume.workExperience)
                      : [],
                  },
                  previewImage: resumeTemplate.previewImage.data?.id,
                },
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${session?.jwt}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (data) {
          router.push(`/dashboard/documents/edit/${data?.data?.id}`);
        }
      } else {
        onOpen();
      }
    } catch (error) {
      console.log(error);

      toast({
        status: "error",
        title: "Error",
        description: "Something went wrong. Please try again",
        duration: 9000,
        isClosable: true,
      });

      throw new Error();
    }
  } else {
    console.log("response from ai is ", response);
    throw new Error();
  }
};
