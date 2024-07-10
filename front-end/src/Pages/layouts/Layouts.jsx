import './Layouts.css'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

import NavBar from '../../components/navBar/NavBar'
import SideBar from '../../components/sideBar/SideBar'

export default function Layouts() {
    // const user = JSON.parse(localStorage.getItem('user'));
    // const [userLogin, handleChange] = useContext(UserContext);
    // const navigate = useNavigate()


    return (
        <div className="layouts">

            <NavBar />


            <div className="main">
                <SideBar />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
