import React from 'react'
import { Container, PostForm } from '../components/index'

function AddPost() {
  return (
    <div className='py-10'>
          <Container>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Write a new post</h1>
            <PostForm />
          </Container>
        </div>
  )
}

export default AddPost