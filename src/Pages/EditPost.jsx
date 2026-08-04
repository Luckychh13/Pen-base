import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components/index'
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditPost() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((fetchedPost) => {
        if (fetchedPost) {
          if (fetchedPost.user_id !== userData?.$id) {
            navigate('/')
            return
          }
          setPost(fetchedPost)
        } else {
          navigate('/')
        }
      })
    } else {
      navigate('/')
    }
  }, [slug, navigate, userData])

  return post ? (
    <div className='py-10'>
      <Container>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit post</h1>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost