import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/config'
import { Container, Button } from '../components/index'

function Post() {
    const [post, setPost] = useState(null)
    const [loader, setLoader] = useState(true)
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.user_id === userData.$id : false

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost)
                }
                setLoader(false)
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate])

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featured_img)
                navigate("/")
            }
        })
    }

    if (loader) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <p className="text-gray-400 text-sm">Loading...</p>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="py-16 text-center">
                <Container>
                    <h1 className="text-xl font-bold text-gray-900">Post not found</h1>
                    <p className="text-gray-500 mt-2 mb-4">
                        This post may have been removed or never existed.
                    </p>
                    <Link to="/" className="text-indigo-600 font-medium hover:underline">
                        Go back to Home
                    </Link>
                </Container>
            </div>
        )
    }

    return (
        <div className="py-10">
            <Container>
                <article className="max-w-3xl mx-auto">
                    <div className="relative w-full rounded-2xl overflow-hidden mb-8 bg-gray-100">
                        <img
                            src={appwriteService.getFilePreview(post.featured_img)}
                            alt={post.title}
                            className="w-full max-h-105 object-cover"
                        />
                        {isAuthor && (
                            <div className="absolute right-4 top-4 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-white hover:bg-gray-50" textColor="text-gray-900" className="shadow-sm border border-gray-200">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-600 hover:bg-red-700" onClick={deletePost} className="shadow-sm">
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
                        {post.title}
                    </h1>

                    <div
                        className="prose prose-lg prose-gray max-w-none prose-headings:font-semibold prose-a:text-indigo-600"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></div>
                </article>
            </Container>
        </div>
    )
}

export default Post