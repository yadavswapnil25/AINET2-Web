import { FaRegCalendarAlt } from 'react-icons/fa';
import Highlight from '../../shared/Highlight';
import PageHeader from '../../shared/PageHeader';
import { containerClass, readingContainerClass } from '../../shared/sectionStyles';

const blogs = [
    {
        id: 1,
        title: '11 Lorem ipsum is simply dummy text of the printing and typesetting industry.',
        content: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...',
        author: 'Jane Cooper',
        about: 'abc ABC',
        authorImage: '/author.png',
        date: '17th Jan, 2025',
        image: '/aboutBg1.png'
    },
    {
        id: 2,
        title: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
        content: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s...',
        author: 'Robert Smith',
        about: 'abc ABC',
        authorImage: '/author.png',
        date: '17th Jan, 2025',
        image: '/aboutBg1.png'
    },
    {
        id: 3,
        title: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
        content: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s...',
        author: 'Maria Johnson',
        about: 'abc ABC',
        authorImage: '/author.png',
        date: '17th Jan, 2025',
        image: '/aboutBg1.png'
    }
];

const featuredBlog = {
    id: 0,
    title: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    content: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    author: 'Jane Cooper',
    about: 'abc ABC',
    authorImage: '/author.png',
    date: '17th Jan, 2025',
    image: '/aboutBg1.png'
};

const AuthorLine = ({ blog }) => (
    <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
            <img src={blog.authorImage} alt="" className="size-9 rounded-full bg-sky-soft object-cover" />
            <div>
                <p className="text-sm font-semibold text-ink">{blog.author}</p>
                <p className="text-xs text-ink/60">{blog.about}</p>
            </div>
        </div>
        <p className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/60">
            <FaRegCalendarAlt aria-hidden="true" />
            {blog.date}
        </p>
    </div>
);

export default function BlogsSection2() {
    return (
        <>
            <Highlight />

            <main>
                <PageHeader
                    breadcrumbs={[
                        { label: "Home", to: "/" },
                        { label: "AINET Adda", to: "/BlogsSection1" },
                        { label: "Top Blogs", to: null },
                    ]}
                    eyebrow="Blogs"
                    title="Top Blogs"
                    intro="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                />

                {/* Featured blog */}
                <section className="py-12 sm:py-16">
                    <div className={containerClass}>
                        <img
                            src={featuredBlog.image}
                            alt={featuredBlog.title}
                            className="h-64 w-full rounded-[2rem] object-cover shadow-xl shadow-ink/10 sm:h-80 md:h-96 lg:h-[32rem]"
                        />
                    </div>
                    <article className={`${readingContainerClass} mt-10`}>
                        <div className="border-b border-ink/10 pb-6">
                            <AuthorLine blog={featuredBlog} />
                        </div>
                        <div className="ainet-prose mt-8">
                            <p>{featuredBlog.content}</p>
                            <p>{featuredBlog.content}</p>
                            <p>{featuredBlog.content}</p>
                        </div>
                    </article>
                </section>

                {/* Latest blogs */}
                <section className="pb-20 sm:pb-24">
                    <div className={containerClass}>
                        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Latest Blogs</h2>
                        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {blogs.map((blog) => (
                                <article key={blog.id} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/10">
                                    <img src={blog.image} alt="" className="aspect-[16/10] w-full object-cover" />
                                    <div className="flex flex-1 flex-col gap-4 p-6">
                                        <AuthorLine blog={blog} />
                                        <h3 className="text-lg font-bold leading-snug text-ink">{blog.title}</h3>
                                        <p className="text-[15px] leading-relaxed text-ink/70">{blog.content}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
