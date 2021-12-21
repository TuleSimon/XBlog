import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components';
import { getPosts, getPost } from '../../services';
import { AdjacentPosts } from '../../sections';
import { closeBackdrop, toggleBackdrop } from '../../services/Redux';
import Head from 'next/head';

const PostDetails = ({ post }) => {
 const dispatch = useDispatch()
  const router = useRouter();
  useEffect
  (() => {
    router.events.on("routeChangeStart", () => {
      dispatch(toggleBackdrop())
    });

      return () => {
        console.log('unmounting component...');
        dispatch(closeBackdrop())
        
    };
  });

  if (process.browser) {
    window.onbeforeunload = () => {
        dispatch(closeBackdrop())
    }
  }

  dispatch(closeBackdrop())
if(router.isFallback){
    return <Loader/>
}

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
      <Head>
      <title>{post.title}</title>
    </Head>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            <AdjacentPosts id={post.id}  />
            <CommentsForm slug={post.slug}/>
            <Comments slug={post.slug}/> 
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;


export async function getStaticProps({ params }) {
    
    const {post} = await getPost(params.slug);
  
    if(post==undefined || post==null){
        return {
            notFound:true,
        }
    }
    return {
      props: {
        post: post,
      },
    };
  }
  
  export async function getStaticPaths() {
    const posts = await getPosts;
    return {
      paths: posts.postsConnection.edges?.map(({ node: { slug } }) => ({ params: { slug } })),
      fallback: true,
    };
  }
  