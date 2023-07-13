import {  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErorrMessage from '../errorMessage/ErorrMessage';
import './comicsList.scss';


const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [endComicsList, setEndcomicsList] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect( () => {
        onRequest(offset, true);
    },[]);

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
        getAllComics(offset)
        .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComicsList) => {
        let ended = false;
        if( newComicsList.length < 8 ){
            ended = true;
        }

        setComicsList( [...comicsList, ...newComicsList]);
        setNewItemsLoading(false);
        setOffset( offset + 8);
        setEndcomicsList(ended);
    }

    function renderComics (arr) {
        const items = arr.map((item, i) => {

            return(
                <li className="comics__item"
                    key={i}>
                <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail}
                         alt={item.title}
                         className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items  = renderComics(comicsList);

    const  load = loading && !newItemsLoading ? <Spinner/> : null;
    const  errorMessage  = error ? <ErorrMessage/> : null;


    return (
        <div className="comics__list">
            {load}
            {errorMessage }
           	{items}

            <button className="button button__main button__long"
                    disabled = {newItemsLoading}
                    style = {{'display' : endComicsList ? 'none' : 'block' }}
                    onClick = {() => onRequest(offset)}
                    >
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

export default ComicsList;
