import { useNavigate } from 'react-router-dom';
import '../btn.css';

const BackBtn = () => {
  const navigate = useNavigate();

  function clickBtn() {
    navigate(-1);
  }

  return(
    <button className="btn btn_red" onClick={clickBtn}>Назад</button>
  )
};

export default BackBtn;