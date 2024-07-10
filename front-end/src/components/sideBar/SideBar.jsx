import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineUsers } from 'react-icons/hi'
import { IoBookOutline } from 'react-icons/io5'
import { GoHistory } from 'react-icons/go'
import { FaRegUserCircle } from 'react-icons/fa'
import { useContext } from "react";
import { UserContext } from "../../Context/UserStore";


export default function SideBar() {
    const [userLogin, handleChange] = useContext(UserContext);
    const navigate = useNavigate()

    const handlLogout = () => {
        if (localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify({ 'id': '', 'name': '', 'role': null }))
        }
        handleChange('', '', '', '', '', null)
        navigate('/login')

    }


    const role = 'admin'
    return (
        <div className="sideBar">
            <NavLink to='/profile'>
                <i><FaRegUserCircle /></i>
                <h5>Profile</h5>
            </NavLink>
            {role == 'admin' ?
                // <>
                <>
                    <NavLink to='/users'>
                        <i><HiOutlineUsers /></i>
                        <h5>Users</h5>
                    </NavLink>
                    <NavLink to='books'>
                        <i><IoBookOutline /></i>
                        <h5>Books</h5>
                    </NavLink>
                </>
                :
                <>
                    <NavLink to='books'>
                        <i><IoBookOutline /></i>
                        <h5>Books</h5>
                    </NavLink>
                    <NavLink to='historique'>
                        <i><GoHistory /></i>
                        <h5>Hitorique</h5>
                    </NavLink>
                </>

            }

            <button onClick={handlLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>

                <h5>LogOut</h5>
            </button>

        </div>
    )
}
