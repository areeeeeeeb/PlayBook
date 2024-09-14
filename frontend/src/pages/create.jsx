import { useNavigate } from 'react-router-dom';

export default function Create() {
    const navigate = useNavigate();

    return (
        <div className="max-w-md mx-auto mt-10 p-6">
            <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
                onClick={() => navigate('/home')}
            >
                Go Back!
            </button>
        </div>
    )
}