import './CardList.scss';
import { useSelector } from 'react-redux';
import { Card } from '../Card/Card';
import { Game } from '../../types/Game';
import { RootState } from '../../types/RootState';
import { useSearchParams } from 'react-router-dom';
import { GameDetailsModal } from '../GameDetailsModal/GameDetailsModal';

export const CardList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const gamesToShow: Game[] = useSelector(
    (state: RootState) => state.gamesToShow
  );

  const handleCardClick = (gameId: number) => {
    setSearchParams({ gameId: String(gameId) });
  };

  return (
    <ul className='list'>
      {searchParams.has('gameId') && <GameDetailsModal />}
      {gamesToShow.map((game) => (
        <Card game={game} key={game.id} onClick={handleCardClick} />
      ))}
    </ul>
  );
};
