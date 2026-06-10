'use client';

export default function BackButton() {
    return (
        <button
            type="button"
            className="flex items-center gap-2 text-sm font-bold text-[var(--grey)] cursor-pointer"
            onClick={() => window.history.back()}
        >
            <img src="/back-arrow.svg" alt="Back" className="pt-[1px] h-4 w-4" />
            Wróć
        </button>
    );
}