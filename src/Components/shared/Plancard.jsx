import { FaArrowRight, FaCheck, FaUniversity, FaUser } from 'react-icons/fa';
import { formatPrice } from '../../utils/pricing';

const LIGHT = {
  card: 'bg-white text-ink shadow-sm ring-1 ring-ink/10',
  iconTile: 'bg-sky-soft text-ink',
  badge: 'bg-sky text-ink',
  muted: 'text-ink/55',
  promo: 'text-sage-deep',
  divider: 'border-ink/10',
  check: 'bg-ink text-white',
  button: 'bg-ink text-white hover:bg-ink/85',
};

// The featured plan (3-year) is dark so it stands out from the other two.
const FEATURED = {
  card: 'bg-ink text-white shadow-2xl shadow-ink/25 md:-my-4',
  iconTile: 'bg-white/10 text-sage',
  badge: 'bg-sage text-ink',
  muted: 'text-white/60',
  promo: 'text-sage',
  divider: 'border-white/15',
  check: 'bg-sage text-ink',
  button: 'bg-sage text-ink hover:bg-white',
};

const PlanCard = ({
  title,
  price,
  basePrice,
  currency,
  duration,
  planType,
  discountPercentage,
  promoLabel,
  loading = false,
  planFeatures,
  handleClick,
  featured = false,
}) => {
  const Icon = planType === 'individual' ? FaUser : FaUniversity;
  const tone = featured ? FEATURED : LIGHT;
  const symbol = currency === 'INR' ? '₹' : '$';
  const years = Number(duration) || 1;
  const features = [`${duration} year Membership`, ...planFeatures];

  return (
    <div className={`flex h-full flex-col rounded-3xl p-6 sm:p-8 md:p-6 lg:p-8 ${tone.card}`}>
      {/* Same height with or without a badge, so the cards stay aligned. */}
      <div className="flex min-h-12 items-start justify-between gap-3">
        <span className={`grid size-12 shrink-0 place-items-center rounded-2xl text-xl ${tone.iconTile}`}>
          <Icon aria-hidden="true" />
        </span>
        {discountPercentage && (
          <span className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide sm:text-sm ${tone.badge}`}>
            {discountPercentage}
          </span>
        )}
      </div>

      {/* Two lines are reserved side by side, so the prices line up too. */}
      <h3 className="mt-6 text-xl font-bold leading-tight md:min-h-[2.5em] lg:text-2xl">
        {planType === 'individual' ? 'Individual' : 'Institutional'} {title}
      </h3>

      <div className="mt-4">
        {loading ? (
          <div className="h-12 w-40 max-w-full animate-pulse rounded-xl bg-current opacity-10" />
        ) : (
          <>
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {symbol}{formatPrice(price)}
              </span>
              <span className={`text-sm font-medium ${tone.muted}`}>
                / {years} {years > 1 ? 'years' : 'year'}
              </span>
            </p>
            {basePrice ? (
              <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className={`text-lg line-through ${tone.muted}`}>
                  {symbol}{formatPrice(basePrice)}
                </span>
                {promoLabel && (
                  <span className={`text-sm font-semibold ${tone.promo}`}>{promoLabel}</span>
                )}
              </div>
            ) : null}
          </>
        )}
      </div>

      <ul className={`mt-6 space-y-3 border-t pt-6 ${tone.divider}`}>
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[15px]">
            <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${tone.check}`}>
              <FaCheck className="text-[10px]" aria-hidden="true" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={handleClick}
          disabled={loading}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${tone.button}`}
        >
          Pay now
          <FaArrowRight className="text-sm" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
