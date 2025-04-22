import { useState } from 'react';

export default function BlogsSection2() {
    const [searchTerm, setSearchTerm] = useState('');

    const blogs = [
        {
            id: 1,
            title: '11 Lorem ipsum is simply dummy text of the printing and typesetting industry.',
            content: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...',
            author: 'Jane Cooper',
            about: 'abc ABC',
            authorImage: 'author.png',
            date: '17th Jan, 2025',
            image: 'aboutBg1.png'
        },
        {
            id: 2,
            title: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
            content: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s...',
            author: 'Robert Smith',
            about: 'abc ABC',
            authorImage: 'author.png',
            date: '17th Jan, 2025',
            image: 'aboutBg1.png'
        },
        {
            id: 3,
            title: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
            content: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s...',
            author: 'Maria Johnson',
            about: 'abc ABC',
            authorImage: 'author.png',
            date: '17th Jan, 2025',
            image: 'aboutBg1.png'
        }
    ];

    const featuredBlog = {
        id: 0,
        title: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
        content: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        author: 'Jane Cooper',
        about: 'abc ABC',
        authorImage: 'author.png',
        date: '17th Jan, 2025',
        image: 'aboutBg1.png'
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header Section */}
            <div className="flex justify-between items-center py-4">
                <h1 className="text-4xl font-bold">Top Blogs</h1>
            </div>

            {/* Introduction Text */}
            <div className="my-4">
                <p className="text-xl font-bold text-gray-700">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
            </div>

            {/* Featured Author Info */}
            <div className="flex items-center justify-between gap-2 my-10 flex-wrap">
                <div className='flex items-center gap-5'>
                    <img
                        src={featuredBlog.authorImage}
                        alt={featuredBlog.author}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                        <p className="font-semibold text-lg">{featuredBlog.author}</p>
                        <p className="font-medium text-sm">{featuredBlog.about}</p>
                    </div>
                </div>
                <span className="text-base">{featuredBlog.date}</span>
            </div>

            {/* Featured Blog */}
            <div className="mb-8">
                <div className="mb-4">
                    <img
                        src={featuredBlog.image}
                        alt={featuredBlog.title}
                        className="w-full h-64 sm:h-80 md:h-96 lg:h-[35rem] object-cover rounded-3xl"
                    />
                </div>
                <div className="prose max-w-none text-base">
                    <p className="mb-5 mt-10">{featuredBlog.content}</p>
                    <p className="mb-5">{featuredBlog.content}</p>
                    <p className="mb-5">{featuredBlog.content}</p>
                </div>
            </div>

            {/* Latest Blogs Section */}
            <div className="mb-6">
                <h2 className="text-3xl font-semibold my-10">Latest Blogs</h2>
                <div className="flex flex-wrap gap-5">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="w-full sm:w-[48%] lg:w-[31.5%] border-2 border-[#A6AEBF] rounded-2xl overflow-hidden shadow-sm"
                        >
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-60 object-cover"
                            />
                            <div className="p-3">
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                    <div className='flex items-center py-3 gap-5'>
                                        <img
                                            src={blog.authorImage}
                                            alt={blog.author}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold text-base">{blog.author}</p>
                                            <p className="font-medium text-sm">{blog.about}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm">{blog.date}</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                                <p className="text-base text-gray-700">{blog.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
