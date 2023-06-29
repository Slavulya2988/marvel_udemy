import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const App =  () => {
    const [selectedChar, setChar] = useState(null);
    const onSelectedchar = (id) => {setChar(id)};

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                {/* <div className="char__content">
                    <CharList selectedChar = {onSelectedchar}/>
                    <ErrorBoundary>
                        <CharInfo charId = {selectedChar}/>
                    </ErrorBoundary>
                </div> */}
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;