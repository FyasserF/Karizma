

import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserStore';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isloading, setIsloadng] = useState(false);
    const navigate = useNavigate();
    const [userLogin, handleChange] = useContext(UserContext);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)
        setIsloadng(true)

        const userData = {
            email,
            password
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', userData)
            console.log(response.data)

            const id = response.data.user.id
            const token = response.data.token
            const name = response.data.user.name
            const role = response.data.user.role
            const img = response.data.user.image
            handleChange(token, id, name, img, role)
            navigate('/');
        } catch (error) {
            setError(error.message || 'Failed to login');
            setIsloadng(false)
        }
    };

    return (
        <>
            <section className="bg-gray-50-900  w-screen">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            {error && <p className="text-sm text-red-500 text-center">Email or password incorrect</p>}
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-[#1E4B97] md:text-2xl ">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required />
                                </div>
                                <div className="flex items-center justify-between">

                                    <a href="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>

                                <button type="submit" className="block w-full select-none rounded-lg bg-[#1E4B97] py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={isloading}>{isloading ? 'Loading...' : 'Login'}</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
