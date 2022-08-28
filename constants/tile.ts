import { Layout } from "react-grid-layout";

interface DefaultType {
  style: Object;
  type: string;
}

export interface StringType extends DefaultType {
  str: string;
  type: "string";
}

export interface ImageType extends DefaultType {
  url: string;
  type: "image";
}

export interface CommitType extends DefaultType {
  id: string;
  type: "commit";
}

export interface SolvedacType extends DefaultType {
  id: string;
  type: "solvedac";
}

export interface ListType extends DefaultType {
  items: string[];
  type: "list";
}

export type TileType = StringType | ImageType | CommitType | SolvedacType | ListType;

export interface TileInterface extends Layout {
  background: string;
  type: string;
  assets: TileType[];
}
