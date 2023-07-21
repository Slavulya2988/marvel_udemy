import img from './error.gif';
import './errorMessage.scss';

const ErrorMessage  = () => {
    return (
        <img src={img} alt="Erorr" className='error' />
    )
}

export default ErrorMessage;
