type TemplateSection = {
    sectionTitle: string;
    heading: string;
    content: string;
    subheading: string;
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
    resume: ComponentTemplate[];
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


export type DisplayTemplate = {
    attributes: {
        addProfilePicture: boolean,
        createdAt: string,
        updatedAt: string,
        publishedAt: string,
        companyName: string | undefined,
        color: '#0000',
        templateType: string,
        template: Template,
        profilePicture: {
            data: {
                attributes: {
                    url: string;
                };
            };
        };
    };

};
