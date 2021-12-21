import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories2 } from '../../services';
import { CategoriesCard } from '../../components';
import Head from 'next/head';


const index = ({categories}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 min-h-screen mx-auto container">
         <Head>
      <title>Categories</title>
    </Head>
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {categories?.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
            <CategoriesCard category={category}/>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default index;

export async function getStaticProps(){
    const {categories} = await getCategories2;
    
    return {
      props:{categories}
    }
  }
