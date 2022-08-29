import { CSSProperties } from "react";
import { Layout } from "react-grid-layout";
import { IconBaseProps } from "react-icons";

interface DefaultAssetType {
  style: CSSProperties;
  type: string;
}

export interface StringType extends DefaultAssetType {
  str: string;
  type: "string";
}

export interface ImageType extends DefaultAssetType {
  url: string;
  type: "image";
}

export interface CommitType extends DefaultAssetType {
  id: string;
  type: "commit";
}

export interface SolvedacType extends DefaultAssetType {
  id: string;
  type: "solvedac";
  itemType: "tier" | "badge" | "class" | "profile";
}

export interface ListType extends DefaultAssetType {
  items: any[];
  type: "list";
}

export interface GridType extends DefaultAssetType {
  items: TileAssetType[];
  type: "grid";
}

export interface IconType extends DefaultAssetType {
  icon: any;
  type: "icon";
  attributes: IconBaseProps;
}

export type TileAssetType = StringType | ImageType | CommitType | SolvedacType | ListType | GridType | IconType;

export interface TileInterface extends Layout {
  background: string;
  type: string;
  assets: TileAssetType[];

  minW?: number;
  minH?: number;
}
