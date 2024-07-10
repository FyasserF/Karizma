import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserStore";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaPen } from "react-icons/fa6";


export default function Books() {
    const [userLogin, handleChange] = useContext(UserContext);
    const [search, setSearch] = useState('');
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])
    const handleFilter = (e) => {
        setSearch(e)
        if (data) {
            const search = e
            const filteredData = data?.filter(user =>
                user.autheur.toLowerCase().includes(search.toLowerCase()) ||
                user.titre.toLowerCase().includes(search.toLowerCase()) ||
                user.description.toLowerCase().includes(search.toLowerCase())
            );
            setFilterData(filteredData)
        }
    }



    const fetchBooks = async () => {
        const token = userLogin.token;
        const response = await axios.get(`http://localhost:8000/api/books`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setData(response.data)
        setFilterData(response.data)
    }
    useEffect(() => {
        fetchBooks()
    }, [])

    const hnldeDeleteBook = async (id) => {
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
                    await axios.delete(`http://127.0.0.1:8000/api/books/${id}`, {
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
        <div className="w-full h-full">
            <div className="topBar flex justify-between items-center">
                <h3 className="font-bold text-2xl text-primary">{data.length} Books</h3>
                <div className="espace-serch">
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
                            <th scope="col">Titre</th>
                            <th scope="col">Auteur</th>
                            <th scope="col">Gnere</th>
                            <th scope="col">Descrioption</th>
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
                                                <td>{user.titre}</td>
                                                <td>{user.autheur}</td>
                                                <td>{user.genre}</td>
                                                <td>{user.description}</td>
                                                <td className="flex justify-center items-center gap-6">
                                                    <Link onClick={() => hnldeDeleteBook(user.id)}>
                                                        <FaTrashAlt className="text-red-500 text-xl" />
                                                    </Link>
                                                    <Link onClick={() => (user.id)}>
                                                        <FaPen />
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
