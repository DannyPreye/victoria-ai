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
} from "@/utils/ai";
import { v4 as uuidv4 } from "uuid";
import { webCrawl } from "@/utils/crawler";

export async function POST(req) {
  const documents = [];
  const indexName = "my-index-123";
  const body = await req.json();
  const company_url = body.company_url;
  const job_listing_url = body.job_listing_url;

  // /*----------scrape company_url------------*/

  // if (validateURL(company_url)) {
  //   try {
  //     const limit = 3;
  //     const companyWebsiteContent = await webCrawl(
  //       validateURL(company_url),
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
  //     const jobDetail = await webCrawl(validateURL(job_listing_url), limit);

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

  // /*----------load resumes------------*/

  // const fileUrl =
  //   "https://drive.google.com/uc?export=download&id=17plAwqxhHNX2wI2JHkFMfTvcy2-MYpRC";

  // const blob = await fetch(fileUrl)
  //   .then((response) => response.blob())

  //   .catch((error) => {
  //     console.error("An error occurred:", error);
  //   });

  // const loader = new WebPDFLoader(blob);
  // const docs = await loader.load();
  // documents.push(docs);
  // console.log("resume docs are ", docs);

  try {
    // await createPineconeIndex(indexName);

    // for (const docs of documents) {
    //   try {
    //     await updatePinecone(indexName, docs);

    //     console.log(`updated pine cone for 1 doc of documents `);
    //   } catch (error) {
    //     console.error(`error updating pincone`, error);
    //   }
    // }

    const text = await queryPineconeVectorStoreAndQueryLLM(
      indexName,
      `create a cover letter for shamail abbas for role of fullstack developer at bbc. 
     
      Also mention something about bbc and how Shamail abbas is a best fit.
      
      make sure you give an answer
      
      dont say i dont know`
    );

    return NextResponse.json({
      data: text,
    });
  } catch (err) {
    console.log("error: ", err);
  }
}

function validateURL(url) {
  try {
    const parsedURL = new URL(url);

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
    console.log(`error validating the ${url} `, error);
    return false;
  }
}
