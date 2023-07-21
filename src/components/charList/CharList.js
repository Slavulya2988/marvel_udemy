import { useState, useEffect, useRef, useMemo } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContentWithLoad from '../../utils/setContentWithLoad';

import './charList.scss';

const CharList = (props) =>  {

    const [charList, setCharList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [endCharList, setEndCharList] = useState(false);

    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect( () => {
        onRequest(offset, true);
        // eslint-disable-next-line
    },[]);

    const onRequest = (offset, initial) => {
		initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
   	    getAllCharacters(offset)
        .then(onCharsLoaded)
        .then(() => setProcess('confirmed'))
    }

    const onCharsLoaded = (newCharList) => {
        let ended = false;
        if( newCharList.length < 9 ){
            ended = true;
        }
        setCharList([...charList, ...newCharList]);
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

    const element = useMemo(() => {
        return setContentWithLoad(process, () => renderChar(charList), newItemsLoading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [process]);

    return (
        <div className="char__list">
           {element}

            <button className="button button__main button__long"
                    disabled = {newItemsLoading}
                    style = {{'display' : endCharList ? 'none' : 'block' }}
                    onClick = {() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
 }


export default CharList;
