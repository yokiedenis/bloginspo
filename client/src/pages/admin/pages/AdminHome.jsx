import React, { useState } from "react";
import { BsBarChartLineFill } from "react-icons/bs";
import { FaFileAlt, FaHeart } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import Table from "../components/Table";

import SearchFilter from "../components/SearchFilter";
import { Link } from "react-router-dom";
import initialBlogs from "../../../data/BlogSample";
const AdminHome = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [blogs, setBlogs] = useState(initialBlogs);

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleEdit = (id) => {
    console.log("Edit blog with id:", id);
  };

  // Filtered Blogs based on Search Term and Category
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "" || blog.category === filterCategory)
  );
  return (
    <>
      <section className="grid grid-cols-4 gap-8 my-[3rem]">
        <div className="flex gap-4 items-center border border-gray-200 rounded-xl p-4">
          <figure className="bg-emerald-100 rounded-md p-4">
            <FaUserGroup className="w-10 h-10 text-emerald-500" />
          </figure>
          <div>
            <h3 className="text-2xl font-semibold">134k</h3>
            <span className="text-sm font-semibold text-gray-600">
              Pageviews
            </span>
          </div>
        </div>
        <div className="flex gap-4 items-center border border-gray-200 rounded-xl p-4">
          <figure className="bg-blue-100 rounded-md p-4">
            <FaFileAlt className="w-10 h-10 text-blue-600" />
          </figure>
          <div>
            <h3 className="text-2xl font-semibold">134k</h3>
            <span className="text-sm font-semibold text-gray-600">Posts</span>
          </div>
        </div>
        <div className="flex gap-4 items-center border border-gray-200 rounded-xl p-4">
          <figure className="bg-red-100 rounded-md p-4">
            <FaHeart className="w-10 h-10 text-red-500" />
          </figure>
          <div>
            <h3 className="text-2xl font-semibold">134k</h3>
            <span className="text-sm font-semibold text-gray-600">Likes</span>
          </div>
        </div>
        <div className="flex gap-4 items-center border border-gray-200 rounded-xl p-4">
          <figure className="bg-blue-100 rounded-md p-4">
            <BsBarChartLineFill className="w-10 h-10 text-blue-500" />
          </figure>
          <div>
            <h3 className="text-2xl font-semibold">134k</h3>
            <span className="text-sm font-semibold text-gray-600">
              Visitors
            </span>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-7xl mx-auto bg-white p-6 border border-gray-200 rounded-lg my-[3rem]">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold">Blog List</h4>
            <button className="bg-orange-400 text-white text-sm font-semibold px-3 py-2 rounded-md">
              Add Blog
            </button>
          </div>
          <hr className="mt-4" />
          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
          <Table
            blogs={filteredBlogs}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      </section>
      <section className="my-[3rem] flex gap-5 justify-between">
        <div className="p-6 bg-white border border-gray-200 rounded-lg w-1/2">
          <h2 className="text-xl font-semibold mb-6 border-b pb-2">
            Recent Comments
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {[0, 1, 2].map((index) => {
              return (
                <div
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100"
                  key={index}
                >
                  <div className="flex items-center">
                    <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                      JD
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold">John Doe</p>
                      <p className="text-sm text-gray-600">
                        Great article, learned a lot!
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Sept 20, 2024</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg  border border-gray-200 w-1/2 flex flex-col ">
          <h2 className="text-xl font-semibold mb-6 border-b pb-2">
            Latest Posts
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {[0, 1, 2].map((index) => (
              <div
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100"
                key={index}
              >
                <div className="flex items-center">
                  <img
                    src={`https://via.placeholder.com/48`} // Replace with actual image URLs
                    alt={`Post ${index + 1}`}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold">Understanding React Hooks</h3>
                    <p className="text-sm text-gray-600">
                      A comprehensive guide to React hooks.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Sept 19, 2024</p>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <Link className="self-center font-medium text-orange-400 hover:text-orange-500">
            View More
          </Link>
        </div>
      </section>
    </>
  );
};

export default AdminHome;