import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowRight, FaSearch, FaTimes } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import Highlight from "../Components/shared/Highlight";
import PageHeader from "../Components/shared/PageHeader";
import { buttonPrimary, buttonSecondary, containerClass, inputClass } from "../Components/shared/sectionStyles";
import { PostCard, PostCardSkeleton, PostImage, PostMeta } from "../Components/specific/Adda/AddaShared";
import { addaPath } from "../Components/specific/Adda/addaUtils";
import { baseUrl } from "../utils/constant";

const PER_PAGE = 9;

// AINET Adda: the articles admins publish from the portal (Website > AINET Adda).
const AinetAdda = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") || "";
  const tag = searchParams.get("tag") || "";
  const filtered = search !== "" || tag !== "";

  const [searchInput, setSearchInput] = useState(search);
  const [posts, setPosts] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [tags, setTags] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [loadingMore, setLoadingMore] = useState(false);
  const requestRef = useRef(null);

  useEffect(() => setSearchInput(search), [search]);

  const load = useCallback(async (page) => {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;

    const params = new URLSearchParams({ page: String(page), per_page: String(PER_PAGE) });
    if (search) params.set("search", search);
    if (tag) params.set("tag", tag);

    if (page === 1) setStatus("loading");
    else setLoadingMore(true);

    try {
      const response = await fetch(`${baseUrl}/client/blogs?${params}`, { signal: controller.signal });
      const data = await response.json();
      if (!response.ok || !data?.status) throw new Error(data?.message || "Request failed");

      setPosts((prev) => (page === 1 ? data.data.blogs : [...prev, ...data.data.blogs]));
      setPagination(data.data.pagination);
      if (page === 1) {
        setFeatured(data.data.featured);
        setTags(data.data.tags || []);
      }
      setStatus("ready");
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error("Error loading AINET Adda:", err);
      if (page === 1) setStatus("error");
    } finally {
      if (requestRef.current === controller) setLoadingMore(false);
    }
  }, [search, tag]);

  useEffect(() => {
    load(1);
    return () => requestRef.current?.abort();
  }, [load]);

  const updateFilters = (changes) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)));
    setSearchParams(next);
  };

  const onSearch = (e) => {
    e.preventDefault();
    updateFilters({ q: searchInput.trim() });
  };

  const hasMore = pagination && pagination.current_page < pagination.last_page;
  const total = pagination?.total ?? 0;

  let heading = "Latest articles";
  if (search && tag) heading = `Results for “${search}” in ${tag}`;
  else if (search) heading = `Results for “${search}”`;
  else if (tag) heading = `Tagged “${tag}”`;

  return (
    <>
      <Highlight />

      <main>
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "AINET Adda", to: null },
          ]}
          eyebrow="Blogs"
          title="AINET Adda"
          intro="Articles, essays and reflections on language, literature and teaching."
        >
          <form onSubmit={onSearch} role="search" className="mt-6 flex max-w-xl gap-2">
            <div className="relative flex-1">
              <FaSearch aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles"
                aria-label="Search articles"
                className={`${inputClass} pl-11`}
              />
            </div>
            <button type="submit" className={buttonPrimary}>Search</button>
          </form>
        </PageHeader>

        {tags.length > 0 && (
          <div className={`${containerClass} pt-8`}>
            <div className="flex flex-wrap items-center gap-2" aria-label="Filter by tag">
              <button
                type="button"
                onClick={() => updateFilters({ tag: "" })}
                aria-pressed={!tag}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${!tag ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-ink/15 hover:bg-sky-soft"}`}
              >
                All
              </button>
              {tags.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => updateFilters({ tag: tag === t.name ? "" : t.name })}
                  aria-pressed={tag === t.name}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${tag === t.name ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-ink/15 hover:bg-sky-soft"}`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {status === "loading" && (
          <section className="py-12 sm:py-16">
            <div className={`${containerClass} grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
              {Array.from({ length: 6 }).map((_, i) => <PostCardSkeleton key={i} />)}
            </div>
          </section>
        )}

        {status === "error" && (
          <section className={`${containerClass} flex flex-col items-center gap-4 py-20 text-center`}>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">Articles could not be loaded</h2>
            <p className="text-ink/60">Please check your connection and try again.</p>
            <button type="button" onClick={() => load(1)} className={buttonPrimary}>Try again</button>
          </section>
        )}

        {status === "ready" && (
          <>
            {featured && !filtered && (
              <section className="pt-10 sm:pt-12">
                <div className={containerClass}>
                  <Link
                    to={addaPath(featured.slug)}
                    className="group grid overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-ink/10 transition hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage md:grid-cols-2"
                  >
                    <div className="overflow-hidden">
                      <PostImage post={featured} sizes="aspect-[16/10] md:aspect-auto md:h-full md:min-h-80" className="transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col justify-center gap-4 p-6 sm:p-10">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-deep">
                        {featured.is_featured ? "Featured" : "Latest"}{featured.category ? ` · ${featured.category}` : ""}
                      </p>
                      <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">{featured.title}</h2>
                      {featured.excerpt && <p className="line-clamp-4 text-base leading-relaxed text-ink/70">{featured.excerpt}</p>}
                      <PostMeta post={featured} />
                      <span className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-sage-deep transition-all group-hover:gap-3">
                        Read article
                        <FaArrowRight className="text-xs" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </div>
              </section>
            )}

            <section className="py-12 pb-20 sm:py-16 sm:pb-24">
              <div className={containerClass}>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{heading}</h2>
                  {filtered && (
                    <div className="flex items-center gap-3 text-sm text-ink/60">
                      <span aria-live="polite">{total} {total === 1 ? "article" : "articles"}</span>
                      <button
                        type="button"
                        onClick={() => setSearchParams({})}
                        className="inline-flex items-center gap-1.5 font-semibold text-sage-deep hover:text-ink"
                      >
                        <FaTimes aria-hidden="true" /> Clear
                      </button>
                    </div>
                  )}
                </div>

                {posts.length === 0 ? (
                  <div className="mt-8 rounded-3xl bg-sky-soft px-6 py-14 text-center">
                    <p className="text-lg font-semibold text-ink">
                      {filtered ? "No articles match your search." : featured ? "More articles are coming soon." : "Articles are coming soon."}
                    </p>
                    {filtered && (
                      <button type="button" onClick={() => setSearchParams({})} className={`${buttonSecondary} mt-6`}>
                        Show all articles
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => <PostCard key={post.id} post={post} />)}
                  </div>
                )}

                {hasMore && (
                  <div className="mt-10 flex justify-center">
                    <button
                      type="button"
                      onClick={() => load(pagination.current_page + 1)}
                      disabled={loadingMore}
                      className={buttonSecondary}
                    >
                      {loadingMore ? "Loading..." : "Load more articles"}
                    </button>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default AinetAdda;
