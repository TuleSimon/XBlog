import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Loader,Categories, PostCard } from '../../components';
import { getCategories, getPostsInCategory, getPostsWithTitle } from '../../services';
import { closeBackdrop, toggleBackdrop } from '../../services/Redux';

function Search({posts}) {
  const router = useRouter();
  const dispatch = useDispatch()
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      dispatch(toggleBackdrop())
    });
    return () => {
      console.log('unmounting component...');
      dispatch(closeBackdrop())
      
  };
  });
  
    dispatch(closeBackdrop())
    if(router.isFallback){
        return <Loader/>
    }
   
  return (
    <div className="container mx-auto px-10 mb-8">
       <Head>
      <title>Search Results</title>
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories/>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Search;

export async function getStaticProps({params}){
    const posts = await getPostsWithTitle(params.slug);
      // if(posts==undefined || posts==null){
    //     return {
    //         notFound:true,
    //     }
    // }
    return {
      props:{posts},
    }
}
export async function getStaticPaths(){
    const categories =await getCategories;
    return{
        paths:categories.categories.map(({slug}) => ({ params: { slug } })),
        fallback: true,
    }
}