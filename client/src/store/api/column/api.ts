import { axiosBaseQuery } from "@/api";
import {
  Column,
  IColumnCreateRequest,
  ITaskCreateRequest,
  Task,
} from "@/types/board";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const api = createApi({
  reducerPath: "taskApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  tagTypes: ["BoardDetails"],
  endpoints: (build) => ({
    createColumn: build.mutation<Column, IColumnCreateRequest>({
      query: (createDto) => ({
        url: `/board/create/column`,
        method: "POST",
        data: createDto,
      }),
      invalidatesTags: (res) => [{ type: "BoardDetails", id: res?.board?.id }],
    }),
  }),
});

export const { useCreateColumnMutation } = api;
