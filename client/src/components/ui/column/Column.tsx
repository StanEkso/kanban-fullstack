"use client";

import React, { FC, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styles from "./Column.module.scss";
import { Column as IColumn } from "@/types/board";
import {
  useCreateTaskMutation,
  useGetColumnDetailsQuery,
} from "@/store/api/task";
import TaskCard from "../taskcard/TaskCard";
import Button from "../button/Button";
import TaskCardCreate from "../taskcard/TaskCardCreate";

const Column: FC<IColumn> = ({ title, id }) => {
  const { data } = useGetColumnDetailsQuery(id);
  const [isCreating, setIsCreating] = useState(false);
  const [createTask, { data: createdData }] = useCreateTaskMutation();
  return (
    <div className="">
      <div className={styles.container}>
        <h1 className={styles["container-title"]}>{title}</h1>
        <DragDropContext onDragEnd={(res: any) => console.log(res)}>
          <Droppable droppableId="cards">
            {(provided) => (
              <div
                className={styles["container-inner"]}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data?.map((v) => (
                  <Draggable
                    key={v.id}
                    draggableId={v.id.toString()}
                    index={v.order}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard key={v.id} {...v} />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {isCreating && (
          <TaskCardCreate
            onSubmit={(v) => {
              console.log("get data", v);
              createTask({ ...v, columnId: id });
            }}
            close={() => setIsCreating(false)}
          />
        )}
        <Button
          theme="secondary"
          className="mr-auto"
          icon="Plus"
          onClick={() => setIsCreating((b) => !b)}
        >
          Add new card
        </Button>
      </div>
    </div>
  );
};

export default Column;
