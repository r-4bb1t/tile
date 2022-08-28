import { CSSProperties } from "react";
import { Layout } from "react-grid-layout";

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
}

export interface ListType extends DefaultAssetType {
  items: any[];
  type: "list";
}

export interface GridType extends DefaultAssetType {
  items: any[];
  type: "grid";
}

export type TileAssetType = StringType | ImageType | CommitType | SolvedacType | ListType | GridType;

export interface TileInterface extends Layout {
  background: string;
  type: string;
  assets: TileAssetType[];

  minW?: number;
  minH?: number;
}
