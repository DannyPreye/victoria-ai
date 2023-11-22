type PlanBenefit = {
    __typename: 'ComponentPlanPlanBenefit';
    text: string;
};

type PlanAttributes = {
    __typename: 'Plan';
    Title: string;
    Price: number;
    subtitle: string;
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
