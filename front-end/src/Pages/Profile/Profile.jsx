import { toast } from 'react-toastify';
import './Profile.css'
import { Link, Outlet } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
// import { UserContext } from '../../Context/UserStore';
import axios from 'axios';
import { UserContext } from '../../Context/UserStore';
import { info } from 'autoprefixer';


export default function Profile() {
    const [userLogin, handleChange] = useContext(UserContext);
    const [isLoading, setIsloading] = useState(true)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [infos, setInfo] = useState({
        name: '',
        email: ''
    })
    const [oldData, setoldData] = useState([])


    const getUser = async () => {
        const token = userLogin.token;
        const response = await axios.get(`http://localhost:8000/api/users/${userLogin.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setoldData(response.data)
        setInfo({
            name: response.data.name,
            email: response.data.email
        })
        setIsloading(false)
    }


    useEffect(() => {
        getUser()
    }, [])



    const checkIsDataChanged = () => {
        return (
            (
                infos.name === oldData.name &&
                infos.email === oldData.email
            ) || (
                infos.name.trim() == '' ||
                infos.email.trim() == ''
            )
        )

    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setIsSubmiting(true);
        try {
            const token = userLogin.token;
            const response = await axios.put(`http://127.0.0.1:8000/api/users/${userLogin.id}`, infos,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data)
            handleChange(userLogin.token, userLogin.id, infos.name, userLogin.image, userLogin.role)

            getUser()
            toast.success('Your Profile has been Updated', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                style: {
                    fontSize: "12px",
                    letterSpacing: ".5px"
                },
            })
            setTimeout(() => {
                setIsSubmiting(false);
            }, 2000);

        } catch (error) {
            setIsSubmiting(false)
            toast.error('Une erreur est survenue lors de la mise à jour', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                style: {
                    fontSize: "12px",
                    letterSpacing: ".5px"
                },
            })
        }
    }



    return (
        <>
            <div className="profile  grid gap-7">
                <div className="top ">
                    <div className="img">
                        <Link to='img'>
                            {userLogin.image ?
                                <img src={userLogin.image} alt="" />
                                :
                                <span>{userLogin.name[0]}</span>
                            }
                        </Link>

                    </div>
                    <div className="nom">
                        <h3>{userLogin.name}</h3>
                    </div>
                </div>

                <div className="infos-perso">
                    <h3>Information personnel</h3>

                    <div className="addfroms">
                        <form onSubmit={handleUpdate}>

                            <div className="w-100 form-item">
                                <label htmlFor="email">Full Name</label>
                                <input
                                    autoFocus
                                    value={infos.name}
                                    onChange={(e) => setInfo({ ...infos, name: e.target.value })}
                                    type="text"
                                />
                            </div>

                            <div className="w-100 form-item">
                                <label htmlFor="email">Email</label>
                                <input
                                    value={infos.email}
                                    onChange={(e) => setInfo({ ...infos, email: e.target.value })}
                                    type="text"
                                />
                            </div>

                            <div className="w-100 profil-btns">

                                {isSubmiting ?
                                    <div className="spinner">
                                        <div className="spinner-blade"></div>
                                        <div className="spinner-blade"></div>
                                        <div className="spinner-blade"></div>
                                        <div className="spinner-blade"></div>
                                        <div className="spinner-blade"></div>
                                        <div className="spinner-blade"></div>
                                        <div className="spinner-blade"></div>
                                        <div className="spinner-blade"></div>
                                        <div className="spinner-blade"></div>
                                        <div className="spinner-blade"></div>
                                        <div className="spinner-blade"></div>
                                        <div className="spinner-blade"></div>
                                    </div>
                                    :
                                    <button type="submit" disabled={checkIsDataChanged()}>Modifier</button>

                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Outlet />
        </>

    )
}
