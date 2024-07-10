import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layouts from './Pages/layouts/Layouts'
import Profile from './Pages/Profile/Profile'
import ProfileImage from './Pages/Profile/ProfileImage'
import Login from './Pages/login/Login'
import { useContext } from 'react'
import { UserContext } from './Context/UserStore'
import Users from './Pages/Users/Users'
import Books from './Pages/Books/Books'
import Home from './Pages/Home/Home'
import SingUp from './Pages/signUp/SingUp'

function App() {
  const [userLogin, handleChange] = useContext(UserContext);
  // console.log(userLogin)
  return (
    <>
      <Routes>

        {userLogin.role == null && (
          <>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SingUp />} />
            {/*   <Route path='/forget-pswd' element={<ForgetPswd />} /> */}
          </>
        )}


        {(userLogin.role === 'admin') && (
          <Route path='/' element={<Layouts />} >
            <Route index element={<Navigate to="/profile" />} />
            <Route path='*' element={<Navigate to="/profile" />} />
            <Route path='/profile' element={<Profile />} >
              <Route path='img' element={<ProfileImage />} />
            </Route>
            <Route path='/users' element={<Users />} />
            <Route path='/books' element={<Books />} />


          </Route>
        )}


      </Routes>


    </>
  )
}

export default App
