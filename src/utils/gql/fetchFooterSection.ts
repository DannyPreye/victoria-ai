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
                            title;
                            href;
                        }
                    }
                }
            }
        }
    }
}
`;

