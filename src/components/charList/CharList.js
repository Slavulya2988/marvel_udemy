import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErorrMessage from '../errorMessage/ErorrMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) =>  {

    const [charList, setCharList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [endCharList, setEndCharList] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect( () => {
        onRequest(offset, true);
    },[]);

    const onRequest = (offset, initial) => {
		initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
   	    getAllCharacters(offset)
        .then(onCharsLoaded)
    }

    const onCharsLoaded = (newCharList) => {
        let ended = false;
        if( newCharList.length < 9 ){
            ended = true;
        }
        setCharList( charList => [...charList, ...newCharList]);
        setNewItemsLoading(newItemsLoading => false);
        setOffset(offset => offset + 9);
        setEndCharList(ended);
    }

    // console.log('CharList Render');

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {

        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderChar (arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return(
                <li className="char__item"
                    tabIndex={0}
                    ref={(el) => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.selectedChar(item.id);
                        focusOnItem(i);
                        }
                    }>
                <img src={item.thumbnail}
                     alt={item.name}

                     style={imgStyle}/>
                <div className="char__name">{item.name}</div>
            </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items  = renderChar(charList);

    const  load = loading && !newItemsLoading ? <Spinner/> : null;
    const  errorMessage  = error ? <ErorrMessage/> : null;


    return (
        <div className="char__list">
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


export default CharList;
