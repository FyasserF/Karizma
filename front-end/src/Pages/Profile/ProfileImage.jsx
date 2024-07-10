import { Link, useNavigate } from "react-router-dom";
import noimg from '../../assets/no-image.png'
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../Context/UserStore";

export default function ProfileImage() {
    const [userLogin, handleChange] = useContext(UserContext);
    const [isSubmiting, setIsSubmiting] = useState(false)
    const navigate = useNavigate()


    const handleFileChange = async (event) => {
        setIsSubmiting(true)
        const file = event.target.files[0];

        try {
            const Fdata = new FormData();
            const token = userLogin.token;
            Fdata.append('image', file)
            const response = await axios.post(`http://127.0.0.1:8000/api/changeImage/${userLogin.id}`, Fdata, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            handleChange(userLogin.token, userLogin.id, userLogin.name, `http://127.0.0.1:8000${response.data.image_url}`, userLogin.role)
            toast.success('Votre Image a ete bien Modifier', {
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
            });
        } catch (error) {
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

        setTimeout(() => {
            setIsSubmiting(false)
        }, 2000);
    };

    const handleDeleteImage = async () => {
        if (userLogin.image) {

            Swal.fire({
                title: "Souhaitez-vous supprimer votre image ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#048C04',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, Suprimer!',
                cancelButtonText: 'Non',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        setIsSubmiting(true)
                        const token = userLogin.token;
                        await axios.post(`http://127.0.0.1:8000/api/deleteImage/${userLogin.id}`, {}, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });

                        handleChange(userLogin.token, userLogin.id, userLogin.name, null, userLogin.role)
                        toast.success('Votre Image a ete Suprimer', {
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
                        });
                    } catch (error) {
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
            })



            setTimeout(() => {
                setIsSubmiting(false)
            }, 2000);
        }
    }


    return (
        <div className="img-details">
            <div className="top">
                <div className="back">
                    <button onClick={() => navigate(-1)}>Profile</button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <h3>Image</h3>
                </div>

                <div className="actions">

                    <button className="edite">
                        <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
                        <label htmlFor="fileInput">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                        </label>


                    </button>

                    <button className="delete" onClick={handleDeleteImage}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="img-main">
                {isSubmiting ?
                    <div className="img-loader">
                        {/* <Loader /> */}
                    </div>
                    :
                    <>
                        {userLogin.image ?
                            <img src={userLogin.image} alt="" />
                            :
                            <div className="nom-image">
                                <img src={noimg} alt="" />
                                <p>Aucune image pour afficher</p>
                            </div>
                        }

                    </>

                }

            </div>
        </div>
    )
}
