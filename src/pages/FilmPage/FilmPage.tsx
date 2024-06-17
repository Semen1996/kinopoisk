import { useParams } from "react-router-dom";
import "./FilmPage.css";
import "../../components/Buttons/btn.css";
import { useEffect, useState } from "react";
import { getMovieReq } from "../../utils/apiKinopoisk";
import { LOCAL_STORAGE_ID } from "../../constants/local-storage";

interface IGenre {
  name: string;
}

type MovieType = {
  title: string;
  img: string | undefined;
  description: string;
  rating: string;
  year: string;
  genres: IGenre[];
};

const FilmPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieType>();

  const [isIdInLocal, setIsIdInLocal] = useState(false);

  useEffect(() => {
    function isInLocalStorage() {
      const idJSON = localStorage.getItem(LOCAL_STORAGE_ID);
      if(idJSON) {
        const idArr = JSON.parse(idJSON);
        const haveId = idArr.includes(id);
        setIsIdInLocal(haveId);
      } else {
        setIsIdInLocal(false)
      }
    }

    async function requestMovie(idReq: number) {
      try {
        const res = await getMovieReq({ id: idReq });
        setMovie(res);
      } catch (error) {
        console.log("error");
      }
    }
    isInLocalStorage();
    const idNum = Number(id);
    requestMovie(idNum);
  }, [id]);



  function addInLocalStorage() {
    const idJSON = localStorage.getItem(LOCAL_STORAGE_ID);
    if(idJSON) {
      const idArr = JSON.parse(idJSON);
      idArr.push(id);
      const idString = JSON.stringify(idArr);
      localStorage.setItem(LOCAL_STORAGE_ID, idString);
    } else {
      console.log('v')
      const idArr = [id];
      const idToLocalStore = JSON.stringify(idArr);
      localStorage.setItem(LOCAL_STORAGE_ID, idToLocalStore);
    }
    setIsIdInLocal(true);
  }

  function removeFromLocalStorage() {
    const idJSON = localStorage.getItem(LOCAL_STORAGE_ID);
    if(idJSON) {
      const idArr = JSON.parse(idJSON);
      if(Array.isArray(idArr) && idArr.length !== 0) {
        const idArrNew = idArr.filter(i => i !== id);
        const idString = JSON.stringify(idArrNew);
        localStorage.setItem(LOCAL_STORAGE_ID, idString);
      }
    }
    setIsIdInLocal(false);
  }

  return (
    <main className="film-page">
      <section>
        <div className="film">
          <img
            className="film__img"
            src={
              movie?.img
                ? movie?.img
                : "https://dissertations.tsu.ru/Content/no-avatar.png"
            }
            alt={movie?.title}
            loading="lazy"
          />
          <div className="film__about">
            <h2 className="film__title">{movie?.title}</h2>
            <p className="film__text">{movie?.description}</p>
          </div>
          <div className="film__info">
            <p className="film__text">Рейтинг: {movie?.rating}</p>
            <p className="film__text">Дата выхода: {movie?.year}г.</p>
          </div>
          <ul className="film__genres">
            {movie?.genres.map((genre, i) => (
              <li key={i} className="film__genre">
                {genre.name}
              </li>
            ))}
          </ul>
          {
            isIdInLocal ?
              <button onClick={removeFromLocalStorage} className="btn btn_red-transparent">Удалить из избранного</button>
            :
              <button onClick={addInLocalStorage} className="btn btn_purple">Добавить в избранное</button>
          }
        </div>
      </section>
    </main>
  );
};

export default FilmPage;
