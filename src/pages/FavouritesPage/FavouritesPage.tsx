import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import './FavouritesPage.css';
import { IGetMoviesResMovie, getFavouritesReq } from "../../utils/apiKinopoisk";
import { LOCAL_STORAGE_ID } from "../../constants/local-storage";

const FavouritesPage = () => {
  const [reqMovies, setReqMovies] = useState<IGetMoviesResMovie[]>();
  useEffect(() => {
    async function reqFavouritesMovies() {
      const idJSON = localStorage.getItem(LOCAL_STORAGE_ID);
      if(idJSON) {
        const idArr = JSON.parse(idJSON);
        if(Array.isArray(idArr) && idArr.length !== 0 ) {
          const idArrSt = idArr.map(i => String(i))
          try {
            const res = await getFavouritesReq({id: idArrSt});
            setReqMovies(res);
          } catch(error) {
            console.log('error')
          }
          
        }
      }
    }

    reqFavouritesMovies();
  }, [])

  if(!reqMovies || reqMovies.length === 0) {
    return(
      <div>Ничего не найдено</div>
    )
  }
  return (
    <main>
      <section className="favourites-page">
        <div className="cards">
          {reqMovies.map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              title={movie.name}
              rating={movie.rating.kp}
              year={movie.year}
              img={movie.poster?.previewUrl}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default FavouritesPage;