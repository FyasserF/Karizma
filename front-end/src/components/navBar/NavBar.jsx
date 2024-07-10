import { Link } from "react-router-dom";
import Logo from '../../assets/R.png'
import { UserContext } from "../../Context/UserStore";
import { useContext } from "react";

export default function NavBar() {
    const [userLogin, handleChange] = useContext(UserContext);
    
    
    return (
        <nav className="navBar">
            <div className="logo">
                <img src={Logo} alt="" />
            </div>

            <Link to='/profile' className="about">
                <div className="info">

                    <h3>{userLogin.name}</h3>
                    <h4>{userLogin.role}</h4>
                </div>
                <div className="img">
                    {userLogin.image ?
                        <img src={userLogin.image} alt="" />
                        :
                        <span>{userLogin.name[0]}</span>
                    }
                </div>
            </Link>
        </nav>
    )
}
