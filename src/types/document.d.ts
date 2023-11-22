import { CoverterSectionType, ResumeSection } from './document.d';
export type TemplateType = {

    title: string;
    coverLetter: CoverterSectionType;
    resume: ResumeSectionType;


};

export type CoverletterSectionType = {
    sections: {
        heading: {
            username: string,
            contact: {
                email: string,
                phone: string,
                socialLinks: any;
            },
            professionalTitle: string;
        },

        greetings: string,
        opener: string;
        address: string;
        body_1: string;
        body_2: string,
        body_3: string;
        conclusion: string;
        call_to_action: string;
        signature: string;
    };
    previewImage: {
        data: {
            id: string;
            attributes: {
                url: string;
                altenativeText: string | undefined;
            };
        } | null;
    },
};

export type ResumeSectionType = {
    sections: {
        heading: {
            username: string,
            professionalTitle: string,
            contact: {
                email: string,
                phone: string,
                socialLinks: any;
            };
        },

        professionalSummary: string,
        education: any,
        workExperience: any,
        otherSections: {},
        skills: any,
        reference: any;
    };
    previewImage: {
        data: {
            id: string;
            attributes: {
                url: string;
                altenativeText: string | undefined;
            };
        } | null;
    },
};


export type TemplateDocumentType = {
    addProfilePicture: boolean,
    companyName: string | null | undefined,
    color: string,
    templateType: string,
    profilePicture: {
        data: {
            attributes: {
                url: string;
                altenativeText: string | undefined;
            };
        } | null;
    },
    template: TemplateType;
};

export type ContactType = {
    email: string,
    phone: string,
    socialLinks: any;
};


export type ContactType = {
    email: string,
    phone: string,
    socialLinks: any;
};
