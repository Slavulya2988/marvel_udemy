import { useState, useEffect } from 'react';


import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';
import { Link } from 'react-router-dom';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.charId])

    const onCharLoaded = (char) => {
        setChar(char);
      }

    const updateChar = () => {
        const {charId}  = props;
        if(!charId){
            return;
        }
		clearError();
		getCharacter(charId)
              .then(onCharLoaded)
              .then(() => setProcess('confirmed'))
    }



    return (
        <div className="char__info">
            {setContent(process, View ,char)}
        </div>
    )
    }

    // FSM finite-state machine
    // конечное количество состояний
    // механизм перехода
    // удобний функционал отображения
    // только одно активное состояние

const View = ({data}) => {
    const {name, description, thumbnail, homePage, wiki, comics} = data;
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

                {comics.slice(0,10).map((item, i) => {
                    const comicId = item.resourceURI.match(/(\d{3,5})/gi).join('');
                    return (
                            <li key={i} className="char__comics-item">
                               <Link to={`/comics/${comicId}`}>
                                    {item.name}
                               </Link>
                            </li>
                            )
                    })
                }
            </ul>
        </>
    )
}
export default CharInfo;
