import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserStore";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";



export default function Users() {
    const [userLogin, handleChange] = useContext(UserContext);
    const [search, setSearch] = useState('');
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])
    const handleFilter = (e) => {
        setSearch(e)
        if (data) {
            const search = e
            const filteredData = data?.filter(user =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
            );
            setFilterData(filteredData)
        }
    }

    const fetchUsers = async () => {
        const token = userLogin.token;
        const response = await axios.get(`http://localhost:8000/api/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setData(response.data)
        setFilterData(response.data)
    }
    useEffect(() => {
        fetchUsers()
    }, [])


    const Deletuser = async (id) => {
        console.log(id)
        Swal.fire({
            title: "You wanna delete this user ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#048C04',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, Suprimer!',
            cancelButtonText: 'Non',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = userLogin.token;
                    await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    toast.success('User deleted sucssusfully', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        style: {
                            fontSize: "12px",
                            letterSpacing: ".5px"
                        },
                    })
                    setFilterData(data.filter((d) => d.id !== id))
                } catch (error) {
                    console.log(error)
                }

            }
        })

    }


    
    return (
        <div className="h-full p-3">
            <div className="topBar flex justify-between items-center">
                <h3 className="font-bold text-2xl text-primary">{data.length} Users</h3>
                <div className="espace-serch" >
                    <div className="search-wraper">
                        <input type="text" placeholder='Rechercher . . .' value={search} onChange={(e) => handleFilter(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="espace-table usertable">
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData?.length == 0 ?
                            <>
                                <tr className='noData'>
                                    <td colSpan={5}>
                                        <p>Aucune donnée n'existe actuellement</p>
                                    </td>
                                </tr>

                            </>
                            :
                            <>
                                {
                                    filterData?.map((user, index) => {
                                        return (
                                            <tr key={user.id}>
                                                <td>{index + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td className="flex justify-center">
                                                    <Link onClick={() => Deletuser(user.id)}>
                                                        <FaTrashAlt className="text-red-500 text-xl" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
