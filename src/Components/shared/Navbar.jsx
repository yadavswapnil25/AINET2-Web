import { useEffect, useRef, useState } from "react";
import { AiFillYoutube } from "react-icons/ai";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io5";
import { MdLogout, MdMail, MdOutlineKeyboardArrowDown, MdPerson } from "react-icons/md";
import { RiInstagramFill, RiTwitterXLine, RiWhatsappFill } from "react-icons/ri";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { containerClass } from "./sectionStyles";

const SOCIALS = [
  { name: "Instagram", Icon: RiInstagramFill, link: "https://www.instagram.com/ainetindia/" },
  { name: "Facebook", Icon: IoLogoFacebook, link: "https://www.facebook.com/ainetindia/" },
  { name: "YouTube", Icon: AiFillYoutube, link: "https://www.youtube.com/AINETIndia" },
  { name: "X", Icon: RiTwitterXLine, link: "https://x.com/ainetindia" },
  { name: "Pinterest", Icon: FaPinterest, link: "https://in.pinterest.com/theainet/" },
  { name: "WhatsApp", Icon: RiWhatsappFill, link: "https://api.whatsapp.com/send?phone=919322890031&text=Hi,AINET" },
];

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  {
    label: "Projects & Initiatives",
    children: [
      { label: "Teacher Research", to: "/teacherResearch" },
      { label: "AINET Connect", to: "/AINETConnect" },
      { label: "Women in AINET", to: "/AboutWomenInAINET" },
      { label: "Rural ELT", to: "/AboutRuralELT" },
      { label: "AINET Affiliates", to: "/AboutAINETAffiliates" },
      { label: "HELE", to: "/HELE" },
      { label: "Decentring", to: "/Decentring" },
      { label: "AINET PRELIM", to: "/Prelims" },
    ],
  },
  { label: "Publications", to: "/publications" },
  { label: "AINET Adda", to: "/BlogsSection1" },
  { label: "Resources", to: "/resources" },
  {
    label: "Event",
    children: [
      { label: "Conferences", to: "/Conference" },
      { label: "Webinars", to: "/webinar" },
      { label: "FD Lectures", to: "/FDLecture" },
    ],
  },
  {
    label: "More",
    children: [
      { label: "Contact Us", to: "/ContactUs" },
      { label: "Gallery", to: "/gallery" },
      { label: "Archives", to: "/archives" },
    ],
  },
];

// The full menu needs a wide screen; below this width the slide-in menu is used.
const DESKTOP_MIN_WIDTH = 1280;

const pathMatches = (pathname, to) =>
  to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

const isItemActive = (item, pathname) =>
  item.children
    ? item.children.some((child) => pathMatches(pathname, child.to))
    : pathMatches(pathname, item.to);

const desktopItemClass = (active) =>
  `inline-flex items-center gap-1 rounded-full px-3 py-2 text-[15px] font-semibold transition-colors ${
    active ? "bg-sky-soft text-ink" : "text-ink/70 hover:bg-sky-soft/70 hover:text-ink"
  }`;

const SocialLinks = ({ className = "", iconClassName = "" }) => (
  <div className={`flex items-center ${className}`}>
    {SOCIALS.map((social) => {
      const { Icon } = social;
      return (
        <a
          key={social.name}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className={iconClassName}
        >
          <Icon aria-hidden="true" />
        </a>
      );
    })}
  </div>
);

const Avatar = ({ profile, className = "" }) => (
  <img
    src={profile?.image_url || "/placeholder.jpg"}
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = "/placeholder.jpg";
    }}
    alt=""
    className={`shrink-0 rounded-full object-cover ${className}`}
  />
);

const Navbar = () => {
  const { logout, profileData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileSection, setMobileSection] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const headerRef = useRef(null);

  // Close menus after moving to another page.
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setProfileOpen(false);
  }, [location.pathname, location.hash]);

  // A click outside the header, or Escape, closes whatever is open.
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setProfileOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setProfileOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Keep the page still behind the slide-in menu.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Close the slide-in menu once the window is wide enough for the full menu.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_MIN_WIDTH) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    setProfileOpen(false);
    setMenuOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Contact strip (laptops and up) */}
      <div className="hidden bg-ink font-display text-sm text-white/75 lg:block">
        <div className={`${containerClass} flex h-10 items-center justify-between`}>
          <a href="mailto:theainet@gmail.com" className="inline-flex items-center gap-2 transition-colors hover:text-white">
            <MdMail className="text-base" aria-hidden="true" />
            theainet@gmail.com
          </a>
          <SocialLinks className="gap-4" iconClassName="text-base transition-colors hover:text-sage" />
        </div>
      </div>

      <header
        ref={headerRef}
        className="sticky top-0 z-50 border-b border-ink/10 bg-white/95 font-display backdrop-blur supports-[backdrop-filter]:bg-white/85"
      >
        <div className={`${containerClass} flex h-16 items-center justify-between gap-4 lg:h-20`}>
          <Link to="/" className="shrink-0" aria-label="AINET home">
            <img src="/logo.svg" alt="AINET - Develop. Together." className="h-12 w-auto sm:h-14 lg:h-16" />
          </Link>

          {/* Full menu (wide screens) */}
          <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
            {NAV_ITEMS.map((item, index) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.label}
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={desktopItemClass(isItemActive(item, location.pathname))}
                  >
                    {item.label}
                    <MdOutlineKeyboardArrowDown
                      className={`text-lg transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>

                  {openDropdown === item.label && (
                    <div className={`absolute top-full z-50 pt-2 ${index >= NAV_ITEMS.length - 2 ? "right-0" : "left-0"}`}>
                      <ul className="w-60 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-ink/10">
                        {item.children.map((child) => (
                          <li key={child.to}>
                            <NavLink
                              to={child.to}
                              onClick={() => setOpenDropdown(null)}
                              className={({ isActive }) =>
                                `block rounded-xl px-3 py-2.5 text-[15px] transition-colors ${
                                  isActive ? "bg-sky-soft font-semibold text-ink" : "text-ink/75 hover:bg-sky-soft hover:text-ink"
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) => desktopItemClass(isActive)}
                >
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            {profileData ? (
              <div className="relative hidden xl:block">
                <button
                  type="button"
                  onClick={() => setProfileOpen((open) => !open)}
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                  className="flex items-center gap-2 rounded-full bg-sky-soft py-1.5 pl-1.5 pr-3 text-sm font-semibold text-ink transition-colors hover:bg-sky"
                >
                  <Avatar profile={profileData} className="size-8" />
                  <span className="max-w-[10rem] truncate">{profileData?.name}</span>
                  <MdOutlineKeyboardArrowDown
                    className={`text-lg transition-transform ${profileOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-ink/10">
                    <div className="flex flex-col items-center gap-1 border-b border-ink/10 px-4 pb-4 pt-3 text-center">
                      <Avatar profile={profileData} className="mb-2 size-16" />
                      <p className="font-semibold text-ink">{profileData?.name}</p>
                      <p className="break-all text-sm text-ink/60">{profileData?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2.5 text-[15px] font-medium text-ink transition-colors hover:bg-sky-soft"
                    >
                      <MdPerson className="text-lg" aria-hidden="true" />
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-[15px] font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      <MdLogout className="text-lg" aria-hidden="true" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden rounded-full px-4 py-2.5 text-[15px] font-semibold text-ink transition-colors hover:bg-sky-soft xl:inline-flex"
                >
                  Log in
                </Link>
                <Link
                  to="/#membershipplan"
                  className="hidden rounded-full bg-ink px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-ink/85 sm:inline-flex"
                >
                  Join us
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-sky-soft xl:hidden"
            >
              <FaBars className="text-xl" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-in menu (phones, tablets and small laptops). It sits outside the
          header because the header's blur effect would trap a fixed panel. */}
      <div
        className={`fixed inset-0 z-[60] font-display xl:hidden ${menuOpen ? "" : "pointer-events-none"}`}
        inert={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={closeMenu}
          aria-hidden="true"
        />

        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-ink/10 px-5">
            <Link to="/" onClick={closeMenu} aria-label="AINET home">
              <img src="/logo.svg" alt="AINET - Develop. Together." className="h-10 w-auto" />
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-sky-soft"
            >
              <FaTimes className="text-lg" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => setMobileSection(mobileSection === item.label ? null : item.label)}
                      aria-expanded={mobileSection === item.label}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-semibold transition-colors hover:bg-sky-soft ${
                        isItemActive(item, location.pathname) ? "text-ink" : "text-ink/80"
                      }`}
                    >
                      {item.label}
                      <MdOutlineKeyboardArrowDown
                        className={`text-xl transition-transform ${mobileSection === item.label ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    {mobileSection === item.label && (
                      <ul className="mb-2 ml-4 space-y-0.5 border-l-2 border-sage pl-3">
                        {item.children.map((child) => (
                          <li key={child.to}>
                            <NavLink
                              to={child.to}
                              onClick={closeMenu}
                              className={({ isActive }) =>
                                `block rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                                  isActive ? "bg-sky-soft font-semibold text-ink" : "text-ink/70 hover:bg-sky-soft hover:text-ink"
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block rounded-xl px-3 py-3 text-base font-semibold transition-colors ${
                          isActive ? "bg-sky-soft text-ink" : "text-ink/80 hover:bg-sky-soft"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="shrink-0 space-y-4 border-t border-ink/10 p-5">
            {profileData ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-2xl bg-sky-soft p-3">
                  <Avatar profile={profileData} className="size-12" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-ink">{profileData?.name}</p>
                    <p className="truncate text-sm text-ink/60">{profileData?.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="rounded-full py-3 text-center text-sm font-semibold text-ink ring-1 ring-ink/15 transition-colors hover:bg-sky-soft"
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full bg-ink py-3 text-sm font-semibold text-white transition-colors hover:bg-ink/85"
                  >
                    Log out
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-full py-3 text-center text-sm font-semibold text-ink ring-1 ring-ink/20 transition-colors hover:bg-sky-soft"
                >
                  Log in
                </Link>
                <Link
                  to="/#membershipplan"
                  onClick={closeMenu}
                  className="rounded-full bg-ink py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-ink/85"
                >
                  Join us
                </Link>
              </div>
            )}

            <a
              href="mailto:theainet@gmail.com"
              className="flex items-center justify-center gap-2 text-sm text-ink/70 transition-colors hover:text-ink"
            >
              <MdMail aria-hidden="true" />
              theainet@gmail.com
            </a>
            <SocialLinks
              className="justify-center gap-2"
              iconClassName="grid size-10 place-items-center rounded-full bg-sky-soft text-lg text-ink transition-colors hover:bg-ink hover:text-white"
            />
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
