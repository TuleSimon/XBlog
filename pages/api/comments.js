// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient,gql } from "graphql-request";


export default async function comments(req, res) {
    const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
        {
            headers: {
                authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2Mzk5NTE1NzYsImF1ZCI6WyJodHRwczovL2FwaS11cy13ZXN0LTIuZ3JhcGhjbXMuY29tL3YyL2NreGJ1Y2VldjNhMzUwMXl6ZzhnZjFkcjEvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMzFkMTlmMzktNDcxYy00OThjLWExZjEtNTUwZTk5NzYwOWRlIiwianRpIjoiY2t4ZHN0cXFkNGRxMjAxeGljeHdyMHQ5eiJ9.lWRU3PFkDzqKFeVhYp_Jvq8z15Ar08aurddhlx2wTpBmAB7eua7NOlOlp-ZpCL0KiTF8oF5C161C2yACDHQemmzSpIZnb-neS48t5cd1YsU-KvUi1vqC18R8bLRKIwem8dS4LZPy1jgohMFSfMAVUG-TonSMyg9B8lkqcLPcdsVhXHUmdCzB-qZEZ-6T2YuoGhV37WElC1vudtgB9jrB_tgqBw9VvYywceBGiquvV8bMy3bQxQ96wQITqYlK_40h3xMfajiCjSvQaThAwigauEVJ7bPRSvq0Y0Eeo5nTJQwWqkjhurN_brMubkpQ4Xq8f7-qdtlHaEDjybqFyWXCzKPUxtgcEKYh2lr1uXlVRP_WQb85QjDYqb7zSgMsLDlt35xoe4iaJ6esC8hUfsLyb533zLwJ3pUJAGsLFEedZeQNbh1i7hxKJI-hK5UnzWdAC7yJh5WSRvLQWoOuSjBUnFzuiq5G09L8591Yj3APFHVknJq4TQuHn20IAec_26rjrGtY699hGnqeSiZLn9XokvHZfSeGUq_o8095hS2cSQzdvdnCr-bA-oYgamkxzhGD1KaQNxcPhA16Cl-o1NvXJqh7rDLuAn32IWqMnlG8iZ9-CFYTBNEwqr3iWqaG2knyyudYly0V5eHCjUiOg0xMuiEX5f_eAIU7VvScEaS5VsM`
            }
        });

        const query = gql`
          mutation CreateComment($name:String!, $email:String!, $comment:String!, $slug:String!){
            createComment(data:{name:$name,email:$email, comment:$comment, post:{connect:{slug:$slug}}}) {
              id
            }
          }
        `
        const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
          },
        });
        const result = await client.request(query, {
          name: req.body.name,
          email: req.body.email,
          comment: req.body.comment,
          slug: req.body.slug,
        })
        return res.status(200).send(result)
}