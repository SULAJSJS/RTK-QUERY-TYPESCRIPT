import React from 'react'
import { useSearchParams } from 'react-router-dom';
import Repocard from '../components/Repocard';
import { useDebounce } from '../hooks/debounce';
import { useSearchUsersQuery, useLazyGetUserReposQuery } from '../store/github/github.api';
import { Input } from 'antd'
import './homepage.css';

const Homepage = () => {
  const [search, setSearch] = React.useState('')
  const debounced = useDebounce(search)
  const [dropdown, setDropdown] = React.useState(false)
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  });

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()

  React.useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0)
  }, [debounced, data])

  const clickHandler = (username: string) => {
    fetchRepos(username)
    setDropdown(false)
  }

  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      { isError && <p className='text-center text-red-600'>Something went wrong...</p>}
      <div className="relative w-[400px]">
      <input
          type="text"
          className="border py-2 px-4 h-[42px] mb-2 max-w-[500px] min-w-[300] w-[400px]"
          placeholder="Поиск Github пользователя..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {dropdown && <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
          {isLoading && <p className='text-center'>Загрузка...</p>}
          {data?.map(user => (
            <li key={user.id} onClick={() => clickHandler(user.login)}  className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'>{user.login}</li>
          ))}
        </ul>}
        <div className="container">
          { areReposLoading && <p className='text-center '>Загрузка репозиториев...</p> }
          { repos?.map((repo) => <Repocard repo={repo} key={repo.id} />) }
       </div>
      </div>
    </div>
  )
}

export default Homepage

/*
placeholder='Поиск Github пользователя...'
          value={search}
          onChange={e => setSearch(e.target.value)} 
          className='w-[280px] sm:w-[560px] md:m-10 h-[45px]'
 */