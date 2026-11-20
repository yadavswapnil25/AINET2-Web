import { Link } from "react-router-dom";

// Split card used by the login and password pages: photo on the left (larger
// screens), the form on the right.
const AuthLayout = ({ title, subtitle, children }) => (
  <main className="relative overflow-hidden bg-sky-soft px-4 py-10 sm:py-16">
    <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-sage/50 blur-3xl" />
    <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-24 size-96 rounded-full bg-sky/70 blur-3xl" />

    <div className="relative mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-ink/10 ring-1 ring-ink/5 lg:grid-cols-2">
      <div className="relative hidden min-h-[600px] lg:block">
        <img src="/LoginBg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-10 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage">AINET Association of English Teachers</p>
          <p className="mt-3 text-4xl font-extrabold leading-tight tracking-tight">Develop. Together.</p>
        </div>
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" aria-label="AINET home" className="inline-block">
            <img src="/loglogo.png" alt="AINET" className="h-16 w-auto" />
          </Link>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink">{title}</h1>
          {subtitle && <p className="mt-2 text-ink/60">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  </main>
);

export default AuthLayout;
