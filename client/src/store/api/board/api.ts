import { axiosBaseQuery } from "@/api";
import { Board } from "@/types/board";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const api = createApi({
  reducerPath: "boardApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/board" }),
  endpoints: (build) => ({
    getUserBoards: build.query<Board[], void>({
      query: () => ({ url: "", method: "get" }),
    }),
  }),
});

export const { useGetUserBoardsQuery } = api;
