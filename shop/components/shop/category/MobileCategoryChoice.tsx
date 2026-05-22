import type { CategoryNode } from "@/types/category";
import type { CheckboxTreeNode } from "@/lib/utils/createCheckboxTreeNodes";
import { convertToCheckboxTreeNodes } from "@/lib/utils/createCheckboxTreeNodes";

function flattenForCategoryButtons(nodes: CheckboxTreeNode[]): CheckboxTreeNode[] {
  return nodes.flatMap((node) => [node, ...flattenForCategoryButtons(node.children ?? [])]);
}

export default function MobileCategoryChoice({ categoryTree }: { categoryTree: CategoryNode[] }) {
  const nodes = convertToCheckboxTreeNodes(categoryTree, true);

  console.log("Flattened nodes for category buttons:", flattenForCategoryButtons(nodes));

  return (
    <div className="flex wrap md:hidden gap-4 px-4 py-2">
      {flattenForCategoryButtons(nodes).map((node) => (
        <button key={node.value}>{node.label}</button>
      ))}
    </div>
  );
}