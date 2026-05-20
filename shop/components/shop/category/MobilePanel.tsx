export default function MobilePanel() {
  return (
    <div className="flex md:hidden items-center justify-end gap-6 px-4 py-2">
      <button
        type="button"
        className="text-sm font-bold cursor-pointer py-2 px-4 rounded-4xl border border-[var(--primary-color)]"
      >
        Kategorie
      </button>
      <button
        type="button"
        className="text-sm font-bold cursor-pointer py-2 px-4 rounded-4xl border border-[var(--grey)]"
      >
        Sortuj
      </button>
    </div>
  );
}
