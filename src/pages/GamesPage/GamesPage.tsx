import { useState, useEffect } from 'react';
import './GamesPage.scss';
import { CardList } from '../../components/CardList/CardList';
import { Oval } from 'react-loader-spinner';
import { GenreSelect } from '../../components/GenreSelect/GenreSelect';
import { getGames } from '../../api/games';
import { useSelector, useDispatch } from 'react-redux';
import { actions as gamesToShowActions } from '../../store/gamesToShow';
import { Loader } from '../../components/Loader/Loader';
import { RootState } from '../../types/RootState';

export const GamesPage = () => {
  const [page, setPage] = useState(0);
  const [loadingMoreGames, setLoadingMoreGames] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const dispatch = useDispatch();

  const genre = useSelector((state: RootState) => state.selectedGenre);

  useEffect(() => {
    setPageLoading(true);
    getGames(page, genre).then((res) => {
      console.log(res);
      dispatch(gamesToShowActions.add(res));
      setPageLoading(false);
      setLoadingMoreGames(false);
    });
  }, [page, genre]);

  const handleDownloadMoreGames = () => {
    setPage((prev) => prev + 1);
    setLoadingMoreGames(true);
  };

  return (
    <>
      <div className='games'>
        <h1 className='games_title'>Всі ігри</h1>

        <GenreSelect />

        {pageLoading ? <Loader /> : <CardList />}

        <button className='games_button' onClick={handleDownloadMoreGames}>
          {loadingMoreGames ? (
            <Oval
              height={30}
              width={30}
              color='#4fa94d'
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor='#4fa94d'
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : (
            'Load more'
          )}
        </button>
      </div>
    </>
  );
};
