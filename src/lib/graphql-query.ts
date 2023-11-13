export const queryHomePage = `query{
  landingPage {
    data{
     attributes{
      HeroSection{
        HeroImage{
          data{
            attributes{
              url
            }
          }
        }
        HeroTitle
        HeroParagraph
        HeroSmallImage{
          data{
            attributes{
              url
            }
          }
        }
        ActionButton{
          Variant
          Link
          Title
          Icon{
            data{
              attributes{
                url
              }
            }
          }
        }
      }
      JoinSection{
       firstHeading
        secondHeading
        MainHeading
        paragraph
        sectionImage{
          data{
            attributes{
              url
              alternativeText
            }
          }
        }
        companyLogos{
          logo{
            data{
              attributes{
                url
                alternativeText
              }
            }
          }
        }

      }
      whyInstaletterSection{
        heading
        paragraph
        subheading
        sectionImage{
          data{
            attributes{
              url
              alternativeText
            }
          }
        }
        listPoints{
          heading
          readMoreLink
          paragraph
        }
      }
      atAGlanceSection{
        heading
        subheading
        paragraph
        sectionItem{
          paragraph
          Image{
            data{
              attributes{
                url
                alternativeText
              }
            }
          }
          title
        }
      }
      CustomerStoriesSection{
        heading
        subheading
        sectionImage{
          data{
            attributes{
              url
              alternativeText
            }
          }
        }
        accomplishments{
          text
          number
        }
      }
      testimonialSection{
        heading
        paragraph
        sectionImage{
          data{
            attributes{
              url
              alternativeText
            }
          }
        }
        testimonials{
          username
          userDesignation
          rating
          content
        }
      }
      faqSection{
        heading
        subheading
        paragraph
        faq{
          answer
          question
        }
      }
      newsletterSection{
        heading
        sectionImage{
          data{
            attributes{
              url
              alternativeText
            }
          }
        }
        paragraph
        privacyParagraph
      }

    }
    }
}
}`;

export const footerSection = `
query{
  landingPage{
    data{
      attributes{
        footerSection{
          paragraph
          section{
            title
            links{
              title
              href
            }
          }
        }
      }
    }
  }
}
`;

export const queryPlans = `
query{
  plans{
    data{
      id
      attributes{
        Title
        Price
        subtitle
        benefits{
          text
        }
      }
    }
  }
}
`;


export const queryTemplates = `query{
  templates{
    data{
      id
      attributes{
        title
        template{
          coverLetter{
           previewImage{
            data{
              attributes{
                url
                alternativeText
              }
            }
          }
          }
          resume{
          previewImage{
            data{
              attributes{
                url
              }
            }
          }
          }
        }
      }
    }
  }
}
`;


export const singleUserPlan = (userId: string) => `query{
  usersPermissionsUser(id:${userId}){
    data{
      attributes{
        plan{
          data{
            attributes{
              benefits{
                text
              }
              Price
              Title
            }
          }
        }
      }
    }
  }
}`;


export const getSingleTemplate = (templateId: string) => `query{
  template(id:${templateId}){
    data{
      attributes{
        title,
        coverLetter{
          section{
            title
            content
          }
        }
        resume{
          sections{
            content
            title

          }
        }

      }
    }
  }
}`;

export const getUserDocumentById = (id: string) => `query{
userDocument(id:${IDBCursorWithValue}){
  data{
    id
    attributes{
      title
      template{
        coverLetter{
          section{
            title
            subtitle
            content
          }
        }
        resume{
          sections{
            title
            subtitle
            content

          }
          customSection{
            points
          }
        }
      }
    }
  }
}
}`;


export const getUserDocuments = (userId: string, page?: number) => `query{
  userDocuments(filters:{users_permissions_user:{id:{eq:${userId}}}} pagination:{page:1, pageSize:${page || 1}}){
    data{
      id
      attributes{
        companyName
        template{
          resume{
            previewImage{
              data{
                attributes{
                  url
                  alternativeText
                }
              }
            }
          }
          coverLetter{
            previewImage{
              data{
                attributes{
                  url
                  alternativeText
                }
              }
            }
          }
        }
      }
    }
    meta{
      pagination{
        page
        pageSize
        pageCount
        total
      }
    }
  }
}`;


export const getTemplates = (page: number) => `query{
  templates(pagination:{page:${page}, pageSize:10}){
    data{
      id
      attributes{
        title
        template{
          resume{
            previewImage{
              data{
                attributes{
                  url
                  alternativeText
                }
              }
            }
          }
          coverLetter{
            previewImage{
              data{
                attributes{
                  url
                  alternativeText
                }
              }
            }
          }
        }
      }
    }
    meta{
      pagination{
        page
        pageSize
        pageCount
        total
      }
    }
  }
}`;

export const getSingleUserDocument = (docId: string) => `query{
userDocument(id:${docId}){
  data{
    attributes{
      addProfilePicture
      companyName
      color
      profilePicture{
        data{
          attributes{
            url
            alternativeText
          }
        }
      }
      template{
        resume{
        sections{
          heading{
            username
            professionalTitle
            contact{
              email
              phone
              socialLinks
            }
          }
          professionalSummary
          education
          workExperience
          otherSections
          skills
          reference
        }
        }
        coverLetter{
          sections{
            heading{
              username
              contact{
                email
                phone
                socialLinks
              }
              professionalTitle

            }
            greetings
            opener
            body_1
            body_2
            body_3
            conclusion
            call_to_action
            signature
          }
        }
      }
    }
  }
}
}`;

export const getSingleTemplateWithId = (templateId: string) => `query{
template(id:${templateId}){
  data{
    attributes{
      title
      template{
        resume{
              previewImage{
            data{
              attributes{
                url
                alternativeText
                name
              }
            }
          }
              sections{
          heading{
            username
            professionalTitle
            contact{
              email
              phone
              socialLinks
            }
          }
          professionalSummary
          education
          workExperience
          otherSections
          skills
          reference
        }
        }
           coverLetter{
                previewImage{
            data{
              attributes{
                url
                alternativeText
                name
              }
            }
          }
          sections{
            heading{
              username
              contact{
                email
                phone
                socialLinks
              }
              professionalTitle
            }
            greetings
            opener
            body_1
            body_2
            body_3
            conclusion
            call_to_action
            signature
          }
        }
      }
    }
  }
}
}`;
