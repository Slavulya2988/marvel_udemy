import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import ('../pages/404'));
const MainPage = lazy(() => import ('../pages/MainPage'));
const ComicPage = lazy(() => import ('../pages/ComicPage'));
const SingleComic = lazy(() => import ('../pages/singleComic/SingleComic'));

const App =  () => {
    return (
       <Router>
         <div className="app">
            <AppHeader/>

                <main>
                   <Suspense fallback={<Spinner/>}>
                    <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element = {<ComicPage/>}/>
                            <Route path="/comics/:comicId" element = {<SingleComic/>}/>
                            <Route path="*" element = {<Page404/>}/>
                        </Routes>
                   </Suspense>
                </main>

        </div>
       </Router>
    )
}

export default App;
