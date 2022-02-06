import React from "react";
import PageItemModel from "../../../../services/page-item/PageItemModel";

export function PageItemRenderer({ item }: { item: PageItemModel; }) {
  return <div>{item.type}</div>;
}
