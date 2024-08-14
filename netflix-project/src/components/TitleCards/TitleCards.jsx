import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';




const TitleCards = ({title, category}) => {

      const [apiData, setApiData] = useState([]);
      const cardsRef = useRef();

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmY0MDFlNGJiZmRkNjllNDM5ZTRiODcwYWQ2OWYyYiIsIm5iZiI6MTcyMTk0NDM4MS44NzMzMzgsInN1YiI6IjY2YTJjODIwNTczMWQyODU4NDBhMTRhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F__4Hw1ER0BocmTp9nFdpUo4UkIzoOifJ5drsnVFf3k'
        }
      };
      
  

      const handleWheel = (event)=> {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
      }
      
      useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?
        language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => setApiData(response.results))
        .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel);
      },[])

  return (
    <div className='title-cards'>
    <h2>{title?title:"Popular in Netflix"}</h2>
    <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.
            backdrop_path} alt="" />
            <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards


