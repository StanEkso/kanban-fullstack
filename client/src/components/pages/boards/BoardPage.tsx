"use client";
import { BoardWithDetails } from "@/types/board";
import React, { FC, useState } from "react";
import styles from "./BoardConcrete.module.scss";
import Column from "@/components/ui/column/Column";
import ColumnCreate from "@/components/ui/column/ColumnCreate";
import { useCreateColumnMutation } from "@/store/api/column";
import ColumnCreateButton from "@/components/ui/column/ColumnCreateButton";
import {
  DragDropContext,
  DropResult,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { useMoveTaskMutation } from "@/store/api/task";

const BoardConcrete: FC<BoardWithDetails> = ({ title, columns, id }) => {
  const [createColumn] = useCreateColumnMutation();
  const [isCreating, setIsCreating] = useState(false);
  const [moveTask] = useMoveTaskMutation();
  const handleMoveTask: OnDragEndResponder = (res) => {
    const data = extractData(res);
    moveTask(data);
  };

  return (
    <div className={styles.board__wrapper}>
      <div className={styles["board__wrapper-header"]}>
        <h2 className={styles["board__wrapper-header-title"]}>{title}</h2>
      </div>
      <div className={styles["board__wrapper-columns"]}>
        <DragDropContext onDragEnd={handleMoveTask}>
          {columns.map((c) => (
            <Droppable droppableId={`column-${c.id}`} key={c.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  key={c.id}
                  {...provided.droppableProps}
                >
                  <Column {...c} key={c.id} />
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
        {isCreating && (
          <ColumnCreate
            onSubmit={(v) => createColumn({ ...v, boardId: id })}
            close={() => setIsCreating(false)}
          />
        )}
        <ColumnCreateButton onClick={() => setIsCreating((b) => !b)} />
      </div>
    </div>
  );
};

export default BoardConcrete;

export const extractData = (res: DropResult) => {
  const taskId = Number(res.draggableId);
  const innerColumnId = Number(res.source.droppableId.split("-")[1]);
  const destinationColumnId = Number(
    res.destination?.droppableId.split("-")[1]
  );
  return {
    taskId: taskId,
    insertIndex: (res.destination?.index ?? 1) - 1,
    newColumnId: isNaN(destinationColumnId)
      ? innerColumnId
      : destinationColumnId,
  };
};
