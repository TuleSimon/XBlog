import React, { useState, useEffect } from 'react';

import { AdjacentPostCard } from '../components';
import {  getNextPosts, getPrevPosts } from '../services';

const AdjacentPosts = ({ id }) => {
  const [next, setNextPost] = useState(null);
  const [prev, setPrevPost] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getPrevPosts(id).then((result) => {
      console.log(result)
      setPrevPost(result.posts.length>0?result.posts[0]:null);
      getNextPosts(id).then((result) => {
        console.log(result)
        setNextPost(result.posts.length>0?result.posts[0]:null);
        setDataLoaded(true);
      })
    });
  }, [id]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 mb-8">
      {dataLoaded && (
        <>
          {prev && (
            <div className={`${next ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'} adjacent-post rounded-lg relative h-72`}>
              <AdjacentPostCard post={prev} position="LEFT" />
            </div>
          )}
          {next && (
            <div className={`${prev ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'} adjacent-post rounded-lg relative h-72`}>
              <AdjacentPostCard post={next} position="RIGHT" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdjacentPosts;
