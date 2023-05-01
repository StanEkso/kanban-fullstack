export interface Board {
  id: number;
  title: string;
  description: string;
}

export interface BoardWithDetails extends Board {
  accessType: BoardAccessType;
  columns: never[];
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
