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

/* PLANS */
type PlanBenefit = {
    __typename: 'ComponentPlanPlanBenefit';
    text: string;
};

type PlanAttributes = {
    __typename: 'Plan';
    Title: string;
    Price: number;
    benefits: PlanBenefit[];
};

export type PlanEntity = {
    __typename: 'PlanEntity';
    id: string;
    attributes: PlanAttributes;
};

type PlanEntityResponseCollection = {
    __typename: 'PlanEntityResponseCollection';
    data: PlanEntity[];
};

export type Plans = {
    plans: PlanEntityResponseCollection;
};






// ******************* TEMPLATE TYPE ****************
type TemplateSection = {
    title: string;
    content: string;
};

type UploadFileAttributes = {
    url: string;
    alternativeText: string | null;
};

type ComponentTemplate = {
    section: TemplateSection[];
    previewImage: {
        data: {
            attributes: UploadFileAttributes;
        };
    };
};

type TemplateAttributes = {
    coverLetter: ComponentTemplate;
    resune: ComponentTemplate[];
    title: string;
};

export type TemplateData = {
    id: string;
    attributes: TemplateAttributes;
};

export type Template = {
    data: TemplateData[];
};

export type TemplatesData = {
    templates: Template;
};

type ResponseStructureTemplate = {
    data: TemplatesData;
};
//********************************************

