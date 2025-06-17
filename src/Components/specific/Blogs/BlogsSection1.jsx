import React from "react";
import { FaCalendarAlt, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogsSection1 = () => {
    // Multiple authors
    const authors = [
        { name: "John Chester", avatar: "/author.png" },
        { name: "Emily Stone", avatar: "/author.png" },
        { name: "Michael Cruz", avatar: "/author.png" },
        { name: "Sophia Lee", avatar: "/author.png" },
        { name: "David Kim", avatar: "/author.png" },
        { name: "Olivia Hall", avatar: "/author.png" },
        { name: "Noah Brooks", avatar: "/author.png" },
        { name: "Ava Patel", avatar: "/author.png" },
        { name: "Liam Scott", avatar: "/author.png" },
        { name: "Mia Davis", avatar: "/author.png" },
    ];

    // Featured blog
    const featuredBlog = {
        title: "Latest insights, trends and information for printing and typesetting industry",
        content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image: "/aboutBg1.png",
        date: "17th Jan, 2023",
        author: authors[0],
    };

    // Latest blogs (3)
    const latestBlogs = [
        {
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            image: "/aboutBg1.png",
            date: "17th Jun, 2023",
            author: authors[1],
        },
        {
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            image: "/aboutBg1.png",
            date: "22nd Jun, 2023",
            author: authors[2],
        },
        {
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            image: "/aboutBg1.png",
            date: "27th Jun, 2023",
            author: authors[3],
        },
    ];

    // Conference blogs
    const conferenceBlogSections = [
        {
            title: "8th Conference Blogs",
            blogs: [
                {
                    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                    content:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    image: "/aboutBg1.png",
                    date: "27th Apr, 2023",
                    author: authors[4],
                },
                {
                    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                    content:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    image: "/aboutBg1.png",
                    date: "16th Apr, 2023",
                    author: authors[5],
                },
                {
                    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                    content:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    image: "/aboutBg1.png",
                    date: "18th Apr, 2023",
                    author: authors[6],
                },
            ],
        },
        {
            title: "7th Conference Blogs",
            blogs: [
                {
                    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                    content:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    image: "/aboutBg1.png",
                    date: "14th Jan, 2023",
                    author: authors[7],
                },
                {
                    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                    content:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    image: "/aboutBg1.png",
                    date: "21st Jan, 2023",
                    author: authors[8],
                },
                {
                    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                    content:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    image: "/aboutBg1.png",
                    date: "30th Jan, 2023",
                    author: authors[9],
                },
            ],
        },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Top Blogs Section */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-6">Top Blogs</h1>

                {/* Featured Blog */}
                <div className="mb-8 flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                        <h2 className="text-2xl font-bold mb-3">{featuredBlog.title}</h2>
                        <p className="text-gray-700 mb-4">{featuredBlog.content}</p>

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <img
                                    src={featuredBlog.author.avatar}
                                    alt={featuredBlog.author.name}
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="text-base font-medium">{featuredBlog.author.name}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500 text-lg">
                                <FaCalendarAlt />
                                <span>{featuredBlog.date}</span>
                            </div>
                        </div>

                        <button className="text-black text-base font-medium bg-[#FFF8DE] py-2 px-10 rounded-xl">Read More</button>
                    </div>

                    <div className="md:w-1/2">
                        <img
                            src={featuredBlog.image}
                            alt={featuredBlog.title}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>
                </div>

                {/* Latest Blogs */}
                <div className="w-full mb-12">
                    <div className="w-full flex justify-between">
                        <p className="text-3xl font-bold mb-6">Latest Blogs</p>
                        <Link to="/" className="text-gray-400 hover:text-blue-500 flex items-center text-sm">
                            View All <FaChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestBlogs.map((blog, index) => (
                            <div key={index} className="flex flex-col border-2 border-gray-200 rounded-lg">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <div className="flex items-center justify-between mt-auto mb-5">
                                    <div className=" px-5 flex items-center gap-2">
                                        <img
                                            src={blog.author.avatar}
                                            alt={blog.author.name}
                                            className="w-6 h-6 rounded-full"
                                        />
                                        <span className="text-sm font-medium">{blog.author.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500 text-sm px-5">
                                        <FaCalendarAlt size={12} />
                                        <span>{blog.date}</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold mb-2 line-clamp-2 px-5">{blog.title}</h3>
                                <p className="text-gray-700 text-sm mb-3 line-clamp-3 px-5">{blog.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Conference Blogs Sections */}
                {conferenceBlogSections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-12">

                        <div className="w-full flex justify-between">
                            <p className="text-3xl font-bold mb-6">{section.title}</p>
                            <Link to="/" className="text-gray-400 hover:text-blue-500 flex items-center text-sm">
                                View All <FaChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {section.blogs.map((blog, blogIndex) => (
                                <div key={blogIndex} className="flex flex-col border-2 border-gray-200 rounded-lg">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                    <div className="flex items-center justify-between mt-auto mb-5">
                                        <div className="flex items-center gap-2 px-5">
                                            <img
                                                src={blog.author.avatar}
                                                alt={blog.author.name}
                                                className="w-6 h-6 rounded-full"
                                            />
                                            <span className="text-sm font-medium">{blog.author.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-500 text-sm px-5">
                                            <FaCalendarAlt size={12} />
                                            <span>{blog.date}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 line-clamp-2 px-5">{blog.title}</h3>
                                    <p className="text-gray-700 text-sm mb-3 line-clamp-3 px-5">{blog.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogsSection1;
