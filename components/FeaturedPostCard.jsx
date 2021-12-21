import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const click = () =>{
  alert('click')
}
const FeaturedPostCard = ({ post }) => (
  <div className="relative h-72 transition duration-500 ease transform hover:-translate-y-2 shadow-lg shadow-gray-700">
    <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72" style={{ backgroundImage: `url('${post.featuredimage.url}')` }} />
    <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
    <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
      <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center text-ellipsis max-h-56">{post.title}</p>
      <div className="flex items-center absolute gap-1 left-0 bottom-5 w-full justify-center  bg-pearl p-1 shadow-lg shadow-gray-700 w-11/12 rounded-r-full">
        <Image
          unoptimized
          alt={post.author.name}
          height="40px"
          width="40px"
          className="align-middle mx-8 drop-shadow-lg rounded-full object-cover"
          src={post.author.photo.url}
        />
          <div className="flex w-8/12 flex-col p-1 text-center">
            <p style={{maxWidth:'100%', textOverflow:'hidden'}} className=" align-middle text-white text-shadow truncate  font-medium">{post.author.name}</p>
            <p className=" align-middle w-full text-white mb-4 text-shadow font-semibold truncate w-full text-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
          </div>
      </div>
    </div>
    <Link href={`/post/${post.slug}`}><span className="cursor-pointer absolute w-full h-full" /></Link>
  </div>
);

export default FeaturedPostCard;
