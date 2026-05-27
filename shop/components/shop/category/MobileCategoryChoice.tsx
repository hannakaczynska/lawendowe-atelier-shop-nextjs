import { useEffect, useState } from "react";
import type { CategoryNode } from "@/types/category";
import type { ButtonTreeNode } from "@/lib/utils/createCheckboxTreeNodes";
import { convertToButtonTreeNodes } from "@/lib/utils/createCheckboxTreeNodes";

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
  categoryTree,
}: {
  categoryTree: CategoryNode[];
}) {
  const [checked, setChecked] = useState<string[]>([]);
  const nodes = convertToButtonTreeNodes(categoryTree, true);

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

  useEffect(() => {
    console.log("Checked categories:", checked);
  }, [checked]);

  return (
    <div className="absolute top-[100px] left-0 right-0 z-50 md:hidden bg-white">
      <div className="flex flex-col gap-4 px-4 py-8 max-w-[500px] mx-auto">
        <fieldset>
          <legend className="text-[var(--grey)] text-sm mb-2">Wybierz kategorie:</legend>
          <div className="flex flex-wrap justify-center gap-2">
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
          <button className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-full text-sm">
            Zastosuj
          </button>
        </div>
      </div>
    </div>
  );
}
