"use client";
import BoardConcrete from "@/components/pages/boards/BoardPage";
import Loader from "@/components/ui/loader/Loader";
import { useGetBoardQuery } from "@/store/api/board";
import React from "react";

const BoardPage = ({ params }: { params: { id: number } }) => {
  const { isLoading, data, isError } = useGetBoardQuery(params.id);
  if (isLoading) {
    return <Loader />;
  }
  if (!data || isError) {
    return null;
  }
  return <BoardConcrete {...data} />;
};

export default BoardPage;
