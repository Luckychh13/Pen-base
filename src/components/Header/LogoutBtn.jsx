import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then((session) => {
            if (session) dispatch(logout())
        })
    }

    return (
        <button
            onClick={logoutHandler}
            className='px-4 py-2 text-sm font-medium text-gray-600 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors duration-150'
        >
            Logout
        </button>
    )
}

export default LogoutBtn