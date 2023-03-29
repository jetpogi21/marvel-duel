export interface BasicModel {
  id: number | string;
  name: string;
}

export interface BreadcrumbLink {
  href: string;
  caption: string;
}

export type SortPair = [string, "asc" | "desc"];

export interface NameCaption {
  name: string;
  caption: string;
}

export interface SortOptions {
  sortedBy: SortPair;
  list: NameCaption[];
}
