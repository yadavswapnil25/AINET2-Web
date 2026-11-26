import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addaPath, formatAddaDate } from "./addaUtils";

// Pieces shared by the AINET Adda list (/ainet-adda) and article pages.

// How to show a post's picture: "cover" fills the frame; "contain" shows small or
// portrait pictures (mostly book covers) whole at their own size, never stretched;
// "none" for no picture or one too small to be worth showing.
const pictureFit = (post) => {
  if (!post.featured_image_url) return "none";
  const width = post.featured_image_width;
  const height = post.featured_image_height;
  if (!width || !height) return "cover";
  if (width < 100) return "none";
  return width < 480 || height > width ? "contain" : "cover";
};

const SoftBackdrop = () => (
  <>
    <div className="absolute -right-10 -top-10 size-40 rounded-full bg-sage/60 blur-2xl" />
    <div className="absolute -bottom-12 -left-6 size-40 rounded-full bg-sky/70 blur-2xl" />
  </>
);

// The post's picture, or a soft tile with its first letter when it has none.
export const PostImage = ({ post, className = "", sizes = "aspect-[16/10]" }) => {
  const fit = pictureFit(post);

  if (fit === "cover") {
    return (
      <img
        src={post.featured_image_url}
        alt=""
        loading="lazy"
        className={`${sizes} w-full bg-sky-soft object-cover ${className}`}
      />
    );
  }

  if (fit === "contain") {
    return (
      <div className={`${sizes} relative flex w-full items-center justify-center overflow-hidden bg-sky-soft p-5 ${className}`}>
        <SoftBackdrop />
        <img
          src={post.featured_image_url}
          alt=""
          loading="lazy"
          className="relative max-h-full max-w-full rounded-md object-contain shadow-lg shadow-ink/20"
        />
      </div>
    );
  }

  const letter = (post.title || "A").trim().charAt(0).toUpperCase();
  return (
    <div aria-hidden="true" className={`${sizes} relative w-full overflow-hidden bg-sky-soft ${className}`}>
      <SoftBackdrop />
      <div className="relative flex h-full flex-col items-center justify-center gap-1">
        <span className="text-6xl font-extrabold leading-none text-ink/80">{letter}</span>
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sage-deep">AINET Adda</span>
      </div>
    </div>
  );
};

export const PostMeta = ({ post, className = "" }) => {
  const date = formatAddaDate(post.published_at);
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-ink/60 ${className}`}>
      {post.author_name && <span className="font-semibold text-ink/80">{post.author_name}</span>}
      {date && (
        <span className="inline-flex items-center gap-1.5">
          <FaRegCalendarAlt aria-hidden="true" />
          <time dateTime={post.published_at}>{date}</time>
        </span>
      )}
      {post.reading_minutes > 0 && (
        <span className="inline-flex items-center gap-1.5">
          <FaRegClock aria-hidden="true" />
          {post.reading_minutes} min read
        </span>
      )}
    </div>
  );
};

export const PostCard = ({ post }) => (
  <Link
    to={addaPath(post.slug)}
    className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage"
  >
    <div className="overflow-hidden">
      <PostImage post={post} className="transition-transform duration-500 group-hover:scale-105" />
    </div>
    <div className="flex flex-1 flex-col gap-3 p-6">
      {post.category && (
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-sage-deep">{post.category}</p>
      )}
      <h3 className="line-clamp-3 text-lg font-bold leading-snug text-ink">{post.title}</h3>
      {post.excerpt && <p className="line-clamp-3 text-[15px] leading-relaxed text-ink/70">{post.excerpt}</p>}
      <PostMeta post={post} className="mt-auto pt-2" />
    </div>
  </Link>
);

export const PostCardSkeleton = () => (
  <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10" aria-hidden="true">
    <div className="aspect-[16/10] w-full animate-pulse bg-sky-soft" />
    <div className="space-y-3 p-6">
      <div className="h-3 w-1/3 animate-pulse rounded bg-sky-soft" />
      <div className="h-5 w-5/6 animate-pulse rounded bg-sky-soft" />
      <div className="h-4 w-full animate-pulse rounded bg-sky-soft" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-sky-soft" />
    </div>
  </div>
);
