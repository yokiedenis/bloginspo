import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Table = ({ blogs, handleDelete, handleEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(blogs.length / entriesPerPage);

  // Define the max page buttons to show in the pagination (e.g., 5)
  const maxVisiblePages = 5;

  // Get current blogs for the page
  const currentBlogs = blogs.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate pagination numbers with "..." logic
  const getPaginationRange = () => {
    const totalNumbers = maxVisiblePages;
    const sidePages = Math.floor(maxVisiblePages / 2);

    if (totalPages <= totalNumbers) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const startPage = Math.max(2, currentPage - sidePages);
    const endPage = Math.min(totalPages - 1, currentPage + sidePages);

    const showStartEllipsis = startPage > 2;
    const showEndEllipsis = endPage < totalPages - 1;

    const paginationArray = [];

    paginationArray.push(1);
    if (showStartEllipsis) paginationArray.push("...");
    for (let i = startPage; i <= endPage; i++) {
      paginationArray.push(i);
    }
    if (showEndEllipsis) paginationArray.push("...");
    paginationArray.push(totalPages);

    return paginationArray;
  };

  console.log("Blog :", blogs);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-orange-400 text-white rounded-s-md">
          <tr>
            <th className="text-left p-4 border-b">Blog Title</th>
            <th className="text-left p-4 border-b">Author</th>
            <th className="text-left p-4 border-b">Published Date</th>
            <th className="text-left p-4 border-b">Category</th>
            <th className="text-left p-4 border-b">Status</th>
            <th className="text-left p-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentBlogs.map((blog, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-4 border-b">{blog.title}</td>
              <td className="p-4 border-b">{blog.author}</td>
              <td className="p-4 border-b">{blog.publishedDate}</td>
              <td className="p-4 border-b">{blog.category}</td>
              <td className="p-4 border-b">
                <span
                  className={`${
                    blog.status === "Published"
                      ? "text-emerald-500 bg-emerald-100 px-2 py-2 font-medium rounded-md text-sm"
                      : blog.status === "Draft"
                      ? "text-gray-500 bg-gray-100 px-2 py-2 font-medium rounded-md text-sm"
                      : "text-red-500 bg-red-100 px-2 py-2 font-medium rounded-md text-sm"
                  }`}
                >
                  {blog.status}
                </span>
              </td>
              <td className="p-4 border-b flex space-x-4">
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="text-red-500 hover:text-red-700 bg-red-100 px-2 py-2 font-medium rounded-md text-sm"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleEdit(blog.id)}
                  className="text-emerald-500 hover:text-emerald-700 bg-emerald-100 px-2 py-2 font-medium rounded-md"
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-4 px-4">
        {/* Showing Entries Info */}
        <div className="text-gray-600 text-sm font-medium">
          Showing{" "}
          {currentBlogs.length > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0}{" "}
          to {Math.min(currentPage * entriesPerPage, blogs.length)} of{" "}
          {blogs.length} entries
        </div>

        {/* Pagination Buttons */}
        <div className="space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } rounded-md`}
          >
            Previous
          </button>

          {/* Page Numbers with Ellipsis */}
          {getPaginationRange().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-3 py-1">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border ${
                  currentPage === page
                    ? "bg-orange-400 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } rounded-md`}
              >
                {page}
              </button>
            )
          )}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } rounded-md`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;