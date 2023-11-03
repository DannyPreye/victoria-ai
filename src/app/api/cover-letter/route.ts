import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { JSONLoader } from "langchain/document_loaders/fs/json";

import {
  createPineconeIndex,
  updatePinecone,
  queryPineconeVectorStoreAndQueryLLM,
  queryOpenAiToRefineResume,
} from "@/utils/ai";
import { v4 as uuidv4 } from "uuid";
import { webCrawl } from "@/utils/crawler";

export async function POST(req: NextRequest) {
  const documents = [];
  const indexName = "my-index-123";
  const body = await req.json();

  const company_url = body?.company_url;
  const job_listing_url = body?.job_listing_url;
  const document_url = body?.document_url;

  try {
    /*----------scrape company_url------------*/

    // if (validateURL(company_url)) {
    //   try {
    //     const limit = 3;
    //     const companyWebsiteContent = await webCrawl(
    //       validateURL(company_url) as string,
    //       limit
    //     );

    //     const jsonString = JSON.stringify(companyWebsiteContent);
    //     const blob = new Blob([jsonString], { type: "application/json" });
    //     const loader = new JSONLoader(blob);
    //     const docs = await loader.load();
    //     documents.push(docs);
    //     console.log(
    //       "------------- companyWebsiteContent docs are ----------------- ",
    //       docs
    //     );
    //   } catch (error) {
    //     console.log("error occured while sraping company_url", error);
    //   }
    // }

    // /*----------scrape job_listing_url------------*/

    // if (validateURL(job_listing_url)) {
    //   try {
    //     const limit = 1;
    //     const jobDetail = await webCrawl(
    //       validateURL(job_listing_url) as string,
    //       limit
    //     );

    //     const jsonString = JSON.stringify(jobDetail);
    //     const blob = new Blob([jsonString], { type: "application/json" });
    //     const loader = new JSONLoader(blob);
    //     const docs = await loader.load();
    //     documents.push(docs);
    //     console.log("------------- jobDetail docs are ----------------- ", docs);
    //   } catch (error) {
    //     console.log("error occured while sraping job_listing_url", error);
    //   }
    // }

    /*----------load resumes------------*/

    // const fileUrl =
    //   "https://drive.google.com/uc?export=download&id=17plAwqxhHNX2wI2JHkFMfTvcy2-MYpRC";

    console.log("document_url is ", document_url);
    const blob = await fetch(document_url)
      .then(async (response) => await response.blob())

      .catch((error) => {
        console.error("An error occurred while fetching the document:", error);
      });
    console.log("blob is ", blob);

    if (blob instanceof Blob) {
      const loader = new WebPDFLoader(blob);
      const docs = await loader.load();
      documents.push(docs);
      //console.log("resume docs are ", docs);
    }

    // const contact = await getFormatedResponse(
    //   "Extract about  contact section for a cover letter from this document",
    //   documents[0],
    //   contactSchema
    // );
    // const about = await getFormatedResponse(
    //   "Extract about section for a cover letter from this document",
    //   documents[0],
    //   aboutSchema
    // );
    // const education = await getFormatedResponse(
    //   "Extract about  education section for a cover letter from this document",
    //   documents[0],
    //   educationSchema
    // );
    // const skills = await getFormatedResponse(
    //   "Extract about  skills section for a cover letter from this document",
    //   documents[0],
    //   skillSchema
    // );
    // const experience = await getFormatedResponse(
    //   "Extract about  experience section for a cover letter from this document",
    //   documents[0],
    //   experienceSchema
    // );

    // const conclusion = await getFormatedResponse(
    //   "Extract about  conclusion section for a cover letter from this document",
    //   documents[0],
    //   conclusionSchema
    // );

    // const bio = await queryOpenAiToRefineResume(prompt(" bio "), documents[0]);
    const about = await queryOpenAiToRefineResume(
      `Extract   about section from this document. Dont use he , use I. dont say i dont now.`,
      documents[0]
    );
    const education = await queryOpenAiToRefineResume(
      `Extract   education section in bullets with course name and course duration from this document. Don't include my name or I. dont say i dont now.`,
      documents[0]
    );
    const skills = await queryOpenAiToRefineResume(
      `Extract   skill section from this document. each skill should be separated by | dont say i dont now.`,
      documents[0]
    );
    const experience = await queryOpenAiToRefineResume(
      `Extract   work experience section in bullets with job name and course duration from this document. Don't include my name or I.  dont say i dont now.`,
      documents[0]
    );
    const contact = await queryOpenAiToRefineResume(
      `Extract contact section from this document. give name , phone and email in a json format. dont say i dont now.`,
      documents[0]
    );
    const conclusion = await queryOpenAiToRefineResume(
      `Extract   conclusion section from this document. Dont use name , use I. dont say i dont now.`,
      documents[0]
    );

    // console.log({ bio, middle, bottom });
    //await createPineconeIndex(indexName);
    // for (const docs of documents) {
    //   try {
    //     await updatePinecone(indexName, docs);
    //     console.log(`updated pine cone for 1 doc of documents `);
    //   } catch (error) {
    //     console.error(`error updating pincone`, error);
    //   }
    // }
    // const text = await queryPineconeVectorStoreAndQueryLLM(
    //   indexName,
    //   `Refine Shamail Abbas's resume.
    //   emphasize relevant experience and skills for the
    //   job without fabricating anything.
    //   Keep all changes minor
    //   and subtle.
    //   Write professional summary in a brief paragraph form.
    //   include years of experience
    //   include achievements
    //   include Professional career goals,
    //   and keywords used in the job posting.
    //   Provide 2 to 4 bullet points for
    //   each job experience.
    //   Keep skills as simple bullet points. Provide
    //   maximum 12 skills.
    //   Do not change job titles.
    //   Avoid directly mentioning
    //   the company's name and ensure the inclusion of relevant keywords,
    //   when appropriate, for optimal ATS system performance.
    //   Dont say i dont know.`
    // );
    const data = {
      about: about,
      education: education,
      skills: skills,
      experience: experience,
      contact: contact,
      conclusion: conclusion,
    };
    console.log(" data is ", data);
    return NextResponse.json(data);
  } catch (err) {
    console.log("error: ", err);
    return NextResponse.json({ error: err });
  }
}

function validateURL(url: string) {
  try {
    const parsedURL = new URL(url);
    console.log("parsed url is ", parsedURL);
    // Check if the URL has a valid domain (hostname)
    if (!parsedURL.hostname) {
      return false;
    }
    // Check if the URL has a valid scheme (http, https,)
    if (["http:", "https:"].includes(parsedURL.protocol) === false) {
      return `https:${parsedURL}`;
    }

    return parsedURL.href;
  } catch (error) {
    console.log(`error validating the ${url} `);
    return false;
  }
}

function parseJson(input: any) {
  try {
    if (input instanceof Object) {
      return input;
    }
    return JSON.parse(input);
  } catch (error) {
    console.log("error occured for this ", input);
    return {};
  }
}
