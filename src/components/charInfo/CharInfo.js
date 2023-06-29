import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErorrMessage from '../errorMessage/ErorrMessage';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const onCharLoaded = (char) => {
        setChar(char);
      }

    const updateChar = () => {
        if(!props.charId){
            return;
        }
		  clearError();
		getCharacter(props.charId)
              .then(onCharLoaded)
    }
    const skeleton = (char || loading || error)  ? null : <Skeleton/>
    const load = loading ? <Spinner/> : null;
    const errorMessage  = error ? <ErorrMessage/> : null;
    const view = !(load || error || !char) ? <View char = {char}/> : null;
    return (
        <div className="char__info">
            {skeleton}
            {load}
            {errorMessage}
            {view}
        </div>
    )
    }

const View = ({char}) => {
    const {name, description, thumbnail, homePage, wiki, comics} = char;
    let imgStyle = {'objectFit' : 'cover'};
            if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

    return(
        <>
         <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homePage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
               {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 ? 'Комікси відсутні' : null}
                {comics.map((item, i) => {
                    if (i < 10) {
                    return (
                            <li key={i} className="char__comics-item">
                                {item.name }
                            </li>
                            )
                        }
                    })
                }

            </ul>
        </>
    )
}
export default CharInfo;
