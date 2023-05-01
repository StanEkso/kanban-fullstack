import { axiosBaseQuery } from "@/api";
import { Board, BoardWithDetails, ICreateBoardRequest } from "@/types/board";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const api = createApi({
  reducerPath: "boardApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  tagTypes: ["Board", "BoardDetails"],
  endpoints: (build) => ({
    getUserBoards: build.query<Board[], void>({
      query: () => ({ url: "/user/me/boards", method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Board" as const, id })),
              { type: "Board", id: "LIST" },
            ]
          : [{ type: "Board", id: "LIST" }],
    }),
    getBoard: build.query<BoardWithDetails, number>({
      query: (id) => ({ url: `/board/${id}`, method: "GET" }),
      providesTags: (res) => [{ type: "BoardDetails", id: res?.id }],
    }),
    createBoard: build.mutation<Board, ICreateBoardRequest>({
      query: (data) => ({ url: "/board/create/", method: "POST", data }),
      invalidatesTags: [{ type: "Board", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUserBoardsQuery,
  useGetBoardQuery,
  useCreateBoardMutation,
} = api;
