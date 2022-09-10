import React from 'react'
import { useActions } from '../hooks/action'
import { useAppSelector } from '../hooks/redux'
import { IRepo } from '../models/models'

const Repocard = ({ repo }: { repo: IRepo }) => {

    const {addFavourite, removeFavourite} = useActions()
    const {favourites} = useAppSelector(state => state.github)

    const [isFav, setIsFav] = React.useState(favourites.includes(repo.html_url));
 
    const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        addFavourite(repo.html_url)
        setIsFav(true)
    }

    const removeFroFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        removeFavourite(repo.html_url)
        setIsFav(false)
    }

  return (
    <div className='border bg-white py-3 px-5 rounded ,b-2 hover:shadow-md hover:bg-gray-300 translate-all'>
        <a href={repo.html_url} target='_blank'>
        <h2 className='text-lg font-bold '>{repo.full_name}</h2>
        <p className='text-sn'>
            Forks: <span className='font-bold mr-2'>{repo.forks}</span>
            Watchers: <span className='font-bold'>{repo.watchers}</span>
        </p>
        <p className='text-sn font-thin'>{repo?.description}</p>
        {!isFav && <button 
            className='mt-2 py-1 px-7 bg-gradient-to-r from-indigo-500 to-blue-600 rounded hover:shadow-md transition-all '
            onClick={ addToFavourite }
        >Add</button>}

        {isFav && <button 
            className='mt-2 py-1 px-7 bg-gradient-to-r ml-3 from-orange-500 to-red-600 rounded hover:shadow-md transition-all '
            onClick={ removeFroFavourite }
        >Remove</button>}
        </a>
    </div>
  )
}

export default Repocard

