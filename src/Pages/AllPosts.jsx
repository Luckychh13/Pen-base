import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components/index'
import appwriteService from "../appwrite/config"
import { useSelector } from 'react-redux'
import { Query } from "appwrite"
import { Link } from 'react-router-dom'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(true)
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        appwriteService.getPosts([
            Query.equal("user_id", userData.$id)
        ]).then((fetchedPosts) => {
            if (fetchedPosts) {
                setPosts(fetchedPosts.documents)
            }
            setLoader(false)
        })
    }, [])

    if (loader) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <p className="text-gray-400 text-sm">Loading...</p>
            </div>
        )
    }

    return (
        <div className='py-10'>
            <Container>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">My posts</h1>
                {posts.length === 0 ? (
                    <div className="text-center max-w-md mx-auto py-10">
                        <p className="text-gray-500 mb-6">
                            You haven&apos;t posted anything yet.
                        </p>
                        <Link
                            to="/add-post"
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors duration-200"
                        >
                            Write your first post
                        </Link>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts