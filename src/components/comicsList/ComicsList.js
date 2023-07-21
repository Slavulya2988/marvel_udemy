import {  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import setContentWithLoad from '../../utils/setContentWithLoad';

import './comicsList.scss';


const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [endComicsList, setEndcomicsList] = useState(false);

    const { getAllComics, process, setProcess} = useMarvelService();

    useEffect( () => {
        onRequest(offset, true);
        // eslint-disable-next-line
    },[]);


    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
        getAllComics(offset)
        .then(onComicsLoaded)
        .then(() => setProcess('confirmed'))
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


    return (
        <div className="comics__list">
           {setContentWithLoad(process, () => renderComics(comicsList), newItemsLoading)}

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
