import React, { useState } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import api from '../../../api';
import { ACCESS_TOKEN,REFRESH_TOKEN } from '../../../constant';
const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading,setLoding] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoding(true);
        try{
            const response = await api.post('/api/token/', { username, password });
            if(response.status === 200){
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                navigate('/admin/dashboard');
            }else{
                setError('Invalid Credentials');
            }
        }
        catch(error){
            setError('Invalid Credentials');
            console.log(error);
        }
        finally{
            setLoding(false);
        }        

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={` ${error? 'border-red-700':''} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className={`block text-gray-700 text-sm font-bold mb-2" htmlFor="password`}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={` ${error? 'border-red-700':''}  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                            required
                        />
                    </div>
                    {
                        error && <p className="text-red-700 text-xl text-xs italic mb-4">{error}</p>
                    }
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleSubmit}
                       >
                           {loading ? 'Checking...': 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;