import { createBrowserRouter } from "react-router-dom"
import App from "../App.jsx"
import AddPost from "../Pages/AddPost.jsx"
import EditPost from "../Pages/EditPost.jsx"
import Home from "../Pages/Home.jsx"
import Login from "../Pages/Login.jsx"
import Post from "../Pages/Post.jsx"
import SignUp from "../Pages/Signup.jsx"
import AuthLayout from "./AuthLayout.jsx"
import AllPosts from "../Pages/AllPosts.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/login",
                element: (
                <AuthLayout authentication={false}>  
                    <Login />
                </AuthLayout>)
            },
            {
                path: "/signup",
                element:(
                    <AuthLayout authentication={false} >
                         <SignUp />
                    </AuthLayout>)
            },
            {
                path: "/all-posts",
                element:(
                <AuthLayout authentication={true} >
                <AllPosts />
                </AuthLayout>
                )
            },
            {
                path: "/add-post",
                element:( 
                <AuthLayout authentication={true}>
                <AddPost />
                </AuthLayout>
                )
            },
            {
                path: "/edit-post/:slug",
                element:( 
                <AuthLayout authentication={true}>
                <EditPost />
                </AuthLayout>
                )
            },
            {
                path: "/post/:slug",
                element:<Post />
            }
        ]
    }
])

export default router