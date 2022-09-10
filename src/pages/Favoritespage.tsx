import React from 'react'
import { useAppSelector } from '../hooks/redux'
import GitHubIcon from '@mui/icons-material/GitHub';

const Favoritespage = () => {
    const { favourites } =  useAppSelector(state => state.github)

    if(favourites.length === 0) return <p className='text-center'>Вы не доба
    вляли</p>

  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
    <ul className='list-none'>
        {favourites.map(f => (
            <li className='bg-gray-700 py-2 px-2 border mt-3 hover:scale-110 hover:shadow-md transition-all' key={f}>
                <GitHubIcon className='hover:shadow-md cursor-pointer hover:scale-110' />
                <a className='text-white ml-3 cursor-pointer' href={f} target='_blank'>{f}</a>
            </li>
        ))} 
    </ul>
    </div>
  )
}

export default Favoritespage