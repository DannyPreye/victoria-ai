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
