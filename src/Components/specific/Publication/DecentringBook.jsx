import { FaAmazon } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { SiFlipkart } from "react-icons/si";
import { buttonPrimary, buttonSecondary, eyebrowClass } from "../../shared/sectionStyles";

const STORES = [
  { key: "amazon", label: "Amazon", Icon: FaAmazon },
  { key: "flipkart", label: "Flipkart", Icon: SiFlipkart },
  { key: "pothi", label: "Pothi", image: "/pothi.svg" },
];

export default function BookSection({
  heading,
  coverImage,
  title,
  editors,
  description,
  buyLinks,
  downloadText,
  bookInfo,
}) {
  // Buttons only appear once a real link is filled in (not "#").
  const hasLink = (link) => Boolean(link) && link !== "#";
  const stores = STORES.filter((store) => hasLink(buyLinks[store.key]));

  return (
    <section aria-label={heading}>
      <p className={eyebrowClass}>
        <span className="h-0.5 w-6 rounded-full bg-current" aria-hidden="true" />
        {heading}
      </p>

      <div className="mt-6 grid items-center gap-8 rounded-[2rem] bg-sage-soft p-6 sm:p-10 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-14 lg:p-14">
        <img
          src={coverImage}
          alt={`${title} book cover`}
          className="mx-auto w-full max-w-[260px] rounded-2xl shadow-2xl shadow-ink/25 ring-1 ring-ink/10 lg:max-w-none"
        />

        <div>
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">{title}</h2>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-sage-deep">Editors</p>
          <p className="mt-1 text-lg font-semibold text-ink">{editors.map((editor) => editor.name).join(" & ")}</p>

          <p className="ainet-prose mt-5">{description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {hasLink(buyLinks.download) && (
              <a href={buyLinks.download} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
                <FaDownload aria-hidden="true" />
                {downloadText}
              </a>
            )}
            {stores.map((store) => {
              const { Icon } = store;
              return (
                <a key={store.key} href={buyLinks[store.key]} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
                  {Icon ? <Icon aria-hidden="true" /> : <img src={store.image} alt="" className="h-4" />}
                  {store.label}
                </a>
              );
            })}
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-ink/60">
            {bookInfo.map((info) => (
              <li key={info.text} className="flex items-center gap-2">
                <img src={info.icon.replace(/^\.\//, "/")} alt="" className="size-5 opacity-70" />
                {info.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
