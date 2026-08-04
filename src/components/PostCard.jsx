import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featured_img }) {
  return (
    <Link to={`/post/${$id}`} className="group block">
      <div className="rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-white">
        <div className="aspect-16/10 overflow-hidden bg-gray-100">
          <img
            src={appwriteService.getFilePreview(featured_img)}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-150 line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard