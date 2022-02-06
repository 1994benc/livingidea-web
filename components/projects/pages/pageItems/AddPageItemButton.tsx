import { PlusIcon, XIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { v4 } from "uuid";
import PageItemModel, { PageItemType } from "../../../../services/page-item/PageItemModel";
import setPageItem from "../../../../services/page-item/setPageItem";

export function AddPageItemButton(props: { projectId: string; pageId: string; }) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleOptionClick = async (itemType: PageItemType) => {
    const data = new PageItemModel(v4(), itemType, {});
    await setPageItem(data, props.projectId, props.pageId);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <button
        onClick={async () => {
          setIsDialogOpen(true);
        }}
        className="primary-btn relative"
      >
        <PlusIcon className="w-4 h-4 -ml-2" /> <div>Add item</div>
        <motion.div
          className="bg-living-lightgray text-left w-80 rounded-lg absolute top-12 left-0 text-black z-auto shadow"
          initial={{
            opacity: 0,
            scale: 0,
            y: -50,
          }}
          animate={{
            opacity: isDialogOpen ? 1 : 0,
            scale: isDialogOpen ? 1 : 0,
            y: isDialogOpen ? 0 : -50,
          }}
        >
          <h1 className="py-3 px-3 bg-black text-white rounded-t-lg standard-header border-b border-gray-300">
            Choose item type
          </h1>
          <div className="flex flex-col font-medium">
            <div
              onClick={async () => {
                await handleOptionClick(PageItemType.ShortTextInput);
              }}
              className="py-2 hover:bg-living-lightblue px-3 border-b rounded-lg cursor-pointer"
            >
              Open-ended question (short text)
            </div>
            <div
              onClick={async () => {
                await handleOptionClick(PageItemType.LongTextInput);
              }}
              className="py-2 hover:bg-living-lightblue px-3 border-b rounded-lg cursor-pointer"
            >
              Open-ended question (paragraph)
            </div>
            <div
              onClick={async () => {
                await handleOptionClick(PageItemType.YesNoQuestion);
              }}
              className="py-2 hover:bg-living-lightblue px-3 border-b rounded-lg cursor-pointer"
            >
              Yes/No question
            </div>
            <div
              onClick={async () => {
                await handleOptionClick(PageItemType.SingleSelectMultiChoice);
              }}
              className="py-2 hover:bg-living-lightblue px-3 border-b rounded-lg cursor-pointer"
            >
              Multiple choice (single select) question
            </div>
            <div
              onClick={async () => {
                await handleOptionClick(PageItemType.MultiSelectMultiChoice);
              }}
              className="py-2 hover:bg-living-lightblue px-3 border-b rounded-lg cursor-pointer"
            >
              Multiple choice (multiple select) question
            </div>
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDialogOpen(false);
            }}
          >
            <XIcon className="h-6 w-6 absolute top-0 right-0 p-1 text-white" />{" "}
          </div>
        </motion.div>
      </button>
    </div>
  );
}
