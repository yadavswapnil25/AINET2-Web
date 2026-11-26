import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Highlight from "../Components/shared/Highlight";
import PageHeader from "../Components/shared/PageHeader";
import { buttonPrimary, containerClass, readingContainerClass } from "../Components/shared/sectionStyles";
import { PostCard, PostMeta } from "../Components/specific/Adda/AddaShared";
import { addaPath } from "../Components/specific/Adda/addaUtils";
import { baseUrl } from "../utils/constant";

// Page title and description for search engines and shared links, put back when leaving.
const usePageMeta = (title, description) => {
  useEffect(() => {
    if (!title) return undefined;
    const previousTitle = document.title;
    let meta = document.querySelector('meta[name="description"]');
    const created = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    const previousDescription = meta.getAttribute("content");

    document.title = `${title} | AINET Adda`;
    if (description) meta.setAttribute("content", description);

    return () => {
      document.title = previousTitle;
      if (created) meta.remove();
      else if (previousDescription !== null) meta.setAttribute("content", previousDescription);
    };
  }, [title, description]);
};

const AinetAddaPost = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | notfound | error

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");

    (async () => {
      try {
        const response = await fetch(`${baseUrl}/client/blogs/${encodeURIComponent(slug)}`, { signal: controller.signal });
        if (response.status === 404) {
          setStatus("notfound");
          return;
        }
        const json = await response.json();
        if (!response.ok || !json?.status) throw new Error(json?.message || "Request failed");
        setData(json.data);
        setStatus("ready");
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Error loading article:", err);
        setStatus("error");
      }
    })();

    return () => controller.abort();
  }, [slug]);

  const post = status === "ready" ? data.blog : null;
  usePageMeta(post?.meta_title, post?.meta_description);

  if (status === "loading") {
    return (
      <main className={`${readingContainerClass} py-16`} aria-busy="true">
        <div className="h-4 w-1/3 animate-pulse rounded bg-sky-soft" />
        <div className="mt-6 h-10 w-5/6 animate-pulse rounded-xl bg-sky-soft" />
        <div className="mt-8 h-72 animate-pulse rounded-[2rem] bg-sky-soft" />
        <div className="mt-8 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-4 animate-pulse rounded bg-sky-soft" />)}
        </div>
      </main>
    );
  }

  if (status !== "ready") {
    const notFound = status === "notfound";
    return (
      <main className={`${containerClass} flex min-h-[60vh] flex-col items-center justify-center gap-6 py-16 text-center`}>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">
          {notFound ? "Article not found" : "This article could not be loaded"}
        </h1>
        <p className="text-ink/60">
          {notFound ? "It may have been moved or taken down." : "Please check your connection and try again."}
        </p>
        <Link to="/ainet-adda" className={buttonPrimary}>Browse AINET Adda</Link>
      </main>
    );
  }

  const { previous, next, related } = data;

  return (
    <>
      <Highlight />

      <main>
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "AINET Adda", to: "/ainet-adda" },
            { label: post.title.length > 48 ? `${post.title.slice(0, 48)}…` : post.title, to: null },
          ]}
          eyebrow={post.category || "AINET Adda"}
          title={post.title}
        >
          <PostMeta post={post} className="mt-5 text-sm" />
        </PageHeader>

        <article className={`${readingContainerClass} py-12 sm:py-16`}>
          {post.show_featured_image && (
            // Small or portrait pictures (e.g. book covers) at their own size; wide ones across the column.
            post.featured_image_width && (post.featured_image_width < 480 || post.featured_image_height > post.featured_image_width) ? (
              <div className="mb-10 flex justify-center rounded-3xl bg-sky-soft p-6">
                <img
                  src={post.featured_image_url}
                  alt=""
                  className="max-h-[28rem] max-w-full rounded-lg object-contain shadow-lg shadow-ink/15"
                />
              </div>
            ) : (
              <img
                src={post.featured_image_url}
                alt=""
                className="mb-10 max-h-[32rem] w-full rounded-3xl object-cover shadow-lg shadow-ink/10 ring-1 ring-ink/5"
              />
            )
          )}

          {/* Sanitised by the API (HtmlSanitizer) before it is sent. */}
          <div className="ainet-prose ainet-article" dangerouslySetInnerHTML={{ __html: post.content }} />

          {post.tags?.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-ink/10 pt-6">
              <span className="mr-1 text-sm font-semibold text-ink/60">Tags:</span>
              {post.tags.map((t) => (
                <Link
                  key={t}
                  to={`/ainet-adda?tag=${encodeURIComponent(t)}`}
                  className="rounded-full bg-sky-soft px-3 py-1 text-sm font-medium text-ink transition-colors hover:bg-sage"
                >
                  {t}
                </Link>
              ))}
            </div>
          )}

          {(previous || next) && (
            <nav aria-label="More articles" className="mt-10 grid gap-4 sm:grid-cols-2">
              {next ? (
                <Link to={addaPath(next.slug)} className="group rounded-2xl p-4 ring-1 ring-ink/10 transition hover:bg-sky-soft">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-sage-deep">
                    <FaArrowLeft aria-hidden="true" /> Newer
                  </span>
                  <span className="mt-1 block font-semibold leading-snug text-ink">{next.title}</span>
                </Link>
              ) : <span className="hidden sm:block" />}
              {previous && (
                <Link to={addaPath(previous.slug)} className="group rounded-2xl p-4 text-right ring-1 ring-ink/10 transition hover:bg-sky-soft">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-sage-deep">
                    Older <FaArrowRight aria-hidden="true" />
                  </span>
                  <span className="mt-1 block font-semibold leading-snug text-ink">{previous.title}</span>
                </Link>
              )}
            </nav>
          )}
        </article>

        {related?.length > 0 && (
          <section className="bg-sky-soft py-14 sm:py-20">
            <div className={containerClass}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">More from AINET Adda</h2>
                <Link to="/ainet-adda" className="inline-flex items-center gap-2 text-sm font-semibold text-sage-deep hover:text-ink">
                  All articles <FaArrowRight className="text-xs" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => <PostCard key={item.id} post={item} />)}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default AinetAddaPost;
