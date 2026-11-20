// Icon + small label + value, used for event dates, times and places.
const InfoTile = ({ icon, label, children }) => {
  const Icon = icon;
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-sky-soft p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-lg text-sage-deep shadow-sm">
        <Icon aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/50">{label}</p>
        <div className="mt-1 break-words font-semibold leading-snug text-ink">{children}</div>
      </div>
    </div>
  );
};

export default InfoTile;
