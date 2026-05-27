import { useEffect, useRef } from "react";
import type { ButtonTreeNode } from "@/lib/utils/createCheckboxTreeNodes";
import { convertToButtonTreeNodes } from "@/lib/utils/createCheckboxTreeNodes";
import { useShopCategory } from "@/context/ShopCategoryContext";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";

function flattenForCategoryButtons(nodes: ButtonTreeNode[]): ButtonTreeNode[] {
  return nodes.flatMap((node) => [
    node,
    ...flattenForCategoryButtons(node.children ?? []),
  ]);
}

function getLeafSlugs(node: ButtonTreeNode): string[] {
  if (!node.children || node.children.length === 0) return [node.value];
  return node.children.flatMap(getLeafSlugs);
}

export default function MobileCategoryChoice({
  closeCategoryChoice,
}: {
  closeCategoryChoice: () => void;
}) {
  const { categoryTree } = useShopCategory();
  const { checked, setChecked, hasChanges, handleApply } = useCategoryFilter(closeCategoryChoice);
  const nodes = convertToButtonTreeNodes(categoryTree, true);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closeCategoryChoice();
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [closeCategoryChoice]);

  function isNodeChecked(node: ButtonTreeNode): boolean {
    const leaves = getLeafSlugs(node);
    return leaves.length > 0 && leaves.every((s) => checked.includes(s));
  }

  function handleCheck(node: ButtonTreeNode) {
    const leaves = getLeafSlugs(node);
    const allChecked = leaves.every((s) => checked.includes(s));

    if (allChecked) {
      setChecked(checked.filter((s) => !leaves.includes(s)));
    } else {
      setChecked([...new Set([...checked, ...leaves])]);
    }
  }

  function setNewCategories() {
    handleApply();
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 md:hidden bg-black/10"
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className="absolute top-[100px] left-0 right-0 z-50 md:hidden bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-6 px-4 py-8 max-w-[500px] mx-auto">
          <fieldset>
            <legend className="text-[var(--grey)] text-sm mb-4">
              Wybierz kategorie:
            </legend>
            <div className="flex flex-wrap justify-center gap-4">
              {flattenForCategoryButtons(nodes).map((node) => (
                <button
                  key={node.value}
                  onClick={() => handleCheck(node)}
                  aria-pressed={isNodeChecked(node)}
                  className={`${isNodeChecked(node) ? "bg-[var(--secondary-color)] border border-[var(--secondary-color)] text-white" : "bg-white border border-[var(--light-grey)]"} px-4 py-2 rounded text-sm`}
                >
                  {node.label}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="flex justify-end">
            <button
              type="button"
              disabled={!hasChanges}
              onClickCapture={setNewCategories}
              className={`font-bold px-4 py-2 rounded-full text-sm transition-colors ${
                hasChanges
                  ? "bg-[var(--primary-color)] border border-[var(--primary-color)] text-white cursor-pointer"
                  : "bg-white border border-[var(--light-grey)] text-[var(--light-grey)] font-bold cursor-not-allowed"
              }`}
            >
              Zastosuj
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
