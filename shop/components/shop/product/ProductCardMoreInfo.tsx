"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { ProductMoreInfo, moreInfoLabels } from "@/types/product";

export default function ProductCardMoreInfo({ product }: { product: Product }) {
  const [openKey, setOpenKey] = useState<string | null>(product.moreInfo.description ? "description" : null);

  function handleToggle(key: string) {
    setOpenKey(key);
  }

  return (
    <>
       {/* Mobile version */}
      <section className="lg:hidden w-full lg:col-span-2 lg:row-start-2 my-15 flex gap-20 mx-auto">
        <ul className="w-full">
          {Object.entries(product.moreInfo)
            .filter(
              ([, value]) => typeof value === "string" && value.trim() !== "",
            )
            .map(([key, value], index) => (
              <li key={key} className="w-full">
                <button
                  className={`py-6 px-4 w-full cursor-pointer flex items-center font-bold justify-between text-left transition-bg duration-300 ${openKey === key ? "bg-[var(--secondary-color-light)]" : ""} border-b border-[var(--light-grey)]${index === 0 ? " border-t" : ""}`}
                  onClick={() => handleToggle(key)}
                >
                  {moreInfoLabels[key as ProductMoreInfo]}
                  <img
                    src="/caret-down-black.svg"
                    alt=""
                    className="w-6 h-6}"
                  />
                </button>
                {openKey === key && <p className="py-10 px-4 border-b border-[var(--light-grey)]">{value}</p>}
              </li>
            ))}
        </ul>
      </section>
      {/* Desktop version */}
      <section className="hidden w-full lg:flex justify-start lg:col-span-2 lg:row-start-2 my-15 flex gap-20 max-w-[1000px] 2xl:max-w-[1200px] mx-auto">
        <ul>
          {Object.entries(product.moreInfo)
            .filter(
              ([, value]) => typeof value === "string" && value.trim() !== "",
            )
            .map(([key], index) => (
              <li
                key={key}
                className={`w-[300px] border-b border-[var(--light-grey)]${index === 0 ? " border-t" : ""}`}
              >
                <button
                  className={`py-6 px-4 w-full cursor-pointer flex items-center font-bold justify-between text-left transition-bg duration-300 ${openKey === key ? "bg-[var(--secondary-color-light)]" : ""} `}
                  onClick={() => handleToggle(key)}
                >
                  {moreInfoLabels[key as ProductMoreInfo]}
                  <img
                    src="/caret-right-black.svg"
                    alt=""
                    className={`w-6 h-6 transition-transform duration-300${openKey === key ? " rotate-180" : ""}`}
                  />
                </button>
              </li>
            ))}
        </ul>
        {openKey && <p>{product.moreInfo[openKey as ProductMoreInfo]}</p>}
      </section>
    </>
  );
}
