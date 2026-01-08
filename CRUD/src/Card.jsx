
function Card({ movieData }) { // direct obj is send to it 
  return (
    <li>
      <h3>{movieData.title}</h3>
      <p>Release: {movieData.release_date}</p>
    </li>
  );
}

export default Card;
