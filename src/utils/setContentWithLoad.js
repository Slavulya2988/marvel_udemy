import Spinner from '../components/spinner/Spinner';
import ErorrMessage from '../components/errorMessage/ErrorMessage';

const setContentWithLoad = (process, Component, newItemsLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;

        case 'loading':
            return newItemsLoading ? <Component/> : <Spinner/>;

        case 'confirmed':
            return <Component />;

        case 'error':
            return <ErorrMessage/>;

        default:
            throw new Error('Unexpected process state');
    }
}

export default setContentWithLoad;
