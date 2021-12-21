import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux'
 import { getCategories } from '../services';
import Router, { useRouter } from 'next/router';
import { toggleBackdrop } from '../services/Redux';

const Header = () => {
  const { asPath } = useRouter()

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(null)

  const [toggle, setToggle] = useState(false)

  const doSearch = (e) => {
    e.preventDefault()
   
    if(search && search.length>0){
     Router.push('/search/'+search)
    }

  }

  useEffect(() => {
     getCategories.then((newCategories) => {
      setCategories(newCategories.categories);
     });
  }, []);

  return (
    <div className='w-full  bg-pearl  sticky top-0 z-40'>
      <div className="container mx-auto  px-10 mb-2">
        <div className="w-full flex gap-2 py-3">
          <div className="float-left block">
            <Link href="/">
              <span className="cursor-pointer font-bold text-xl md:text-4xl text-white">XBLOG</span>
            </Link>
          </div>
          <div className='flex gap-2 mx-2 items-center rounded-lg px-2 py-0.5 bg-white grow'>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" class="h-4 w-4 text-gray-400 svg-inline--fa fa-magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"></path></svg>
          <form className='w-full grow' onSubmit={doSearch}>
            <input className='search w-full' value={search} onChange={e => setSearch(e.target.value)} type='search' placeholder='search'/>
           </form>
          </div>

          <svg aria-hidden="true" onClick={e=> setToggle(!toggle)} focusable="false" data-prefix="fas" data-icon="bars" className="float-right md:hidden h-8 w-8 text-white hover:bg-gray-200 p-1 svg-inline--fa fa-bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"></path></svg>
          
          <div className="sm:hidden xs:hidden hidden md:float-left md:contents">
            
              <Link href={`/`} >
                <span className={`md:float-right mt-2 navitem  ${asPath === '/' || asPath ==='/' ?'actives':''} align-middle text-white ml-4 font-semibold cursor-pointer`}>Home</span>
                </Link>
                <Link href={`/category`} >
                <span className={`md:float-right mt-2 navitem  ${asPath === '/category' || asPath.includes('/category') ?'actives':''} align-middle text-white ml-4 font-semibold cursor-pointer`}>Categories</span>
                </Link><Link href={`/authors`} >
                <span className={`md:float-right mt-2 navitem  ${asPath === '/authors' || asPath.includes('/authors') ?'actives':''} align-middle text-white ml-4 font-semibold cursor-pointer`}>Authors</span>
                </Link>

            
          </div>
        </div>
        <div className={`${toggle?'full-h':'no-h'} md:hidden grid  grid-cols-1 my-3 overflow-hidden`}>         
              <Link href={`/`} >
                <span className="md:float-right mt-2 actives navitem2 align-middle text-white ml-4 font-semibold cursor-pointer">Home</span></Link>
                <Link href={`/category`}>
                <span className="md:float-right mt-2 navitem align-middle text-white ml-4 font-semibold cursor-pointer">Categories</span></Link>
                <Link href={`/authors`}>
                <span className="md:float-right mt-2 navitem align-middle text-white ml-4 font-semibold cursor-pointer">Authors</span></Link>
          </div>
      </div>
    </div>
  );
};

export default Header;
