import { useNavigate } from 'react-router-dom';

const Logo = () => {
    const navigate = useNavigate();
    return (
        <img className='w-10 hover:rotate-12' src='/logo.png' onClick={() => navigate('/')}/>
    );
};
export default Logo;