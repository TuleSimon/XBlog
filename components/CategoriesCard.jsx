import React from 'react'
import Link from "next/link";
function CategoriesCard({category}) {

    

    return (
        <Link href={`/category/${category.slug}`}>
        <div className='bg-white flex flex-col rounded-xl shadow-black drop-shadow-2xl px-5 cursor-pointer transition-all transform hover:-translate-y-2'>
            <div className='h-56 overflow-hidden'>
                <img src={category.image.url} className='h-56 w-full object-cover'/>
            </div>
            <span className='mt-1 mb-3 font-bold text-xl'>
                {category.name}               
            </span>
            {category.description}
        </div>
        </Link>
    )
}

export default CategoriesCard
