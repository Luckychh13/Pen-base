import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Link } from "react-router-dom"
import PostCard from '../components/PostCard'
import Container from '../components/Container'

function Home() {
  const [posts, setPosts] = useState([])
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    appwriteService.getPosts().then((fetchedPosts) => {
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

  if (posts.length === 0) {
    return (
      <div className="py-16">
        <Container>
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              No posts yet
            </h1>
            <p className="text-gray-500 mb-6">
              Be the first to share something on Penbase.
            </p>
            <Link
              to="/add-post"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors duration-200"
            >
              Write a post
            </Link>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="py-10">
      <Container>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Latest posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home