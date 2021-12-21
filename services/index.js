import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT);

export const getPosts = graphcms.request(
    `
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            categories {
              name
              slug
            }
            featuredimage {
                url(transformation: {image: {resize: {height: 400, width: 400}}})
              }
          }
        }
      }
    }  
  `
);

export const getRecentPosts = graphcms.request(
    `
    query MyQuery {
        posts(orderBy: createdAt_ASC, last: 3) {
          slug
          title
          createdAt
          
          featuredimage {
            url
          }
        }
      }
  `
);

export const getFeaturedPosts = graphcms.request(
    `
    query MyQuery {
        posts(where:{featured:true}) {
          slug
          title
          author {
            id
            name
            photo {
              url
            }
          }
          createdAt
          featuredimage {
            url
          }
        }
      }
  `
);

export const getPost = (slugs) =>
    graphcms.request(
        `query MyQuery($slugs: String) {
        post(where: {slug: $slugs}) {
          author {
            name
            bio
            photo {
              url
            }
          }
          categories {
            slug
            name
          }
          createdAt
          featuredimage {
            url
          }
          slug
          id
          title
          excerpt
          content {
            raw
          }
        }
      }
      `, { slugs }
    );

export const getPostsWithTitle = (slugs) =>
    graphcms.request(
        `query MyQuery($slugs: String) {
        posts(where: { OR: [{ excerpt_contains: $slugs }, { title_contains: $slugs }] })  {
          author {
            name
            bio
            photo {
              url
            }
          }
          categories {
            slug
            name
          }
          createdAt
          featuredimage {
            url
          }
          slug
          id
          title
          excerpt
        }
      }
      `, { slugs }
    );

export const getSimilarPosts = (slug, categories) =>
    graphcms.request(
        `
    query MyQuery($slug:String!, $categories: [String!]) {
        posts(where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}, last: 3) {
          createdAt
          featuredimage {
            url
          }
          slug
          title
        }
      }
      `, { slug, categories }
    );
export const getNextPosts = (id) =>
    graphcms.request(
        `
query MyQuery($id:String!) {
    posts(after: $id, first: 1) {
        author {
            id
            name
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          categories {
            name
            slug
          }
          featuredimage {
            url
          }

    }
}
`, { id }
    );

export const getPrevPosts = (id) =>
    graphcms.request(
        `
query MyQuery($id:String!) {

    posts(before: $id, first: 1) {
        author {
            id
            name
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          categories {
            name
            slug
          }
          featuredimage {
            url
          }

    }
}
`, { id }
    );



export const getPostsInCategory = (categories) =>
    graphcms.request(
        `
    query MyQuery($categories: String!) {
        posts(where: {categories_some: {slug: $categories}}) {
            author {
                id
                name
                photo {
                    url
                }
            }
            createdAt
            slug
            title
            excerpt
            categories {
                name
                slug
            }
            featuredimage {
                url
            }
              
        }
      }
      `, { categories }
    );

export const getCategories = graphcms.request(
    ` query MyQuery {
        categories {
          name
          slug
        }
      }
      `
);

export const getCategories2 = graphcms.request(
    ` query MyQuery {
        categories {
          image {
            url(transformation: {image: {resize: {height: 600, width: 600}}})
          }
          slug
          name
          description
        }
      }
      
      `
);

export const getComments = (slug) =>
    graphcms.request(
        ` query MyQuery($slug:String!) {
            comments(where: {post: {slug: $slug}}) {
              createdAt
              email
              name
              comment
            }         
      }
      `, { slug }
    );

export const submitComment = async(obj) => {
    const result = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return result.json();
};