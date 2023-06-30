import {  useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErorrMessage from '../errorMessage/ErorrMessage';
import './comicsList.scss';


const ComicsList = () => {

    const [charList, setCharList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [endCharList, setEndCharList] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect( () => {
        onRequest(offset, true);
    },[]);

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
        getAllComics(offset)
        .then(onCharsLoaded)
    }

    const onCharsLoaded = (newCharList) => {
        let ended = false;
        if( newCharList.length < 8 ){
            ended = true;
        }

        setCharList( charList => [...charList, ...newCharList]);
        setNewItemsLoading(newItemsLoading => false);
        setOffset(offset => offset + 8);
        setEndCharList(ended);
    }

    function renderComics (arr) {
        const items = arr.map((item, i) => {

            return(
                <li className="comics__item"
                    key={item.id}>
                <a href="#">
                    <img src={item.thumbnail}
                         alt={item.title}
                         className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </a>
            </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items  = renderComics(charList);

    const  load = loading && !newItemsLoading ? <Spinner/> : null;
    const  errorMessage  = error ? <ErorrMessage/> : null;


    return (
        <div className="comics__list">
            {load}
            {errorMessage }
           	{items}

            <button className="button button__main button__long"
                    disabled = {newItemsLoading}
                    style = {{'display' : endCharList ? 'none' : 'block' }}
                    onClick = {() => onRequest(offset)}
                    >
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

export default ComicsList;
