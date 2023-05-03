export interface Board {
  id: number;
  title: string;
  description: string;
}

export interface BoardWithDetails extends Board {
  accessType: BoardAccessType;
  columns: Column[];
}

export enum BoardAccessType {
  VIEW_ONLY = "VIEW_ONLY",
  EDIT = "EDIT",
  FULL = "FULL",
  FORBIDDEN = "FORBIDDEN",
}

export interface ICreateBoardRequest {
  title: string;
  description?: string;
  isPublic?: boolean;
}

export interface Column {
  id: number;
  title: string;
  order: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  order: number;
}
