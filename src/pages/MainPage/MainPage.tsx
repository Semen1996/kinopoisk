import './MainPage.css';
import { useEffect, useRef, useState } from "react";
import Card from "../../components/Card/Card";
import { observer } from 'mobx-react-lite';
import FiltersStore from '../../store/filters-store';
import { IGetMoviesResMovie, getMoviesReq } from '../../utils/apiKinopoisk';
import Modal from './components/Modal/Modal';

const MainPage = observer(() => {
  const page = useRef(1);
  const [reqMovies, setReqMovies] = useState<IGetMoviesResMovie[]>();
  const { genres, valueRating, valueYear } = FiltersStore;

  async function requestMoviesList() {
    try{
      const res = await getMoviesReq({page: page.current, genres, rating: valueRating, year: valueYear});
      setReqMovies(res);
    } catch(error) {
      console.log('error')
    }
  }

  useEffect(() => {
    page.current = 1;
    requestMoviesList();
  }, [genres, valueRating, valueYear]);

  function clickNext() {
    page.current = page.current + 1;
    requestMoviesList()
  }

  function clickPrevious() {
    if(page.current > 1) {
      page.current = page.current - 1;
      requestMoviesList();
    }
  }


  if(!reqMovies || reqMovies.length === 0) {
    return(
      <div>Ничего не найдено</div>
    )
  }

  return(
    <>
      <main>
        <section className='main-page'>
          <div className="cards">
            {
                reqMovies.map( movie => 
                  <Card
                    key={movie.id}
                    id={movie.id}
                    title={movie.name}
                    rating={movie.rating.kp}
                    year={movie.year}
                    img={movie.poster?.previewUrl}
                  />
                )
              }
          </div>
          <div className='main-page__btns'>
              <button className='main-page__btn' onClick={clickPrevious}>&#60;</button>
              <button className='main-page__btn' onClick={clickNext}>&#62;</button>
          </div>
        </section>
      </main>
      <Modal/>
    </>
  )
});

export default MainPage;