import { axiosBaseQuery } from "@/api";
import { Task } from "@/types/board";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const api = createApi({
  reducerPath: "columnApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  tagTypes: ["Column", "ColumnDetails"],
  endpoints: (build) => ({
    getColumnDetails: build.query<Task[], number>({
      query: (columnId) => ({
        url: `board/column/${columnId}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "ColumnDetails" as const,
                id,
              })),
              { type: "ColumnDetails", id: "LIST" },
            ]
          : [{ type: "ColumnDetails", id: "LIST" }],
    }),
  }),
});

export const { useGetColumnDetailsQuery } = api;
