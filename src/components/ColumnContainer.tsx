import { useState } from "react";
import { AddIcon, TrashIcon } from "../assets";
import { Column, ID, Task } from "../types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";

type ColumnContainerPropsType = {
  column: Column;
  deleteColumn: (id: ID) => void;
  updateColumn: (id: ID, title: string) => void;

  createTask: (columnId: ID) => void;
  tasks?: Task[];
  deleteTask: (id: ID) => void;
};

export default function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
}: ColumnContainerPropsType) {
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        className="bg-gray-900 border-2 border-yellow-400 w-[320px] border-opacity-40 h-[550px] max-h-[550px] rounded-md flex flex-col p-1.5 bg-opacity-30"
        ref={setNodeRef}
        style={style}
      ></div>
    );
  }

  return (
    <div
      className="bg-gray-900 border-2 border-gray-800 w-[320px] h-[550px] max-h-[550px] rounded-md flex flex-col p-1.5"
      ref={setNodeRef}
      style={style}
    >
      {/* column title */}
      <div
        className="bg-gray-950 h-16 rounded-md rounded-b-none p-3 font-bold border-gray-800 border-2 cursor-grab flex items-center justify-between select-none"
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
      >
        <div className="flex items-center gap-3">
          <span className="bg-gray-900 flex items-center px-3 py-1 rounded-md text-lg">
            0
          </span>
          {!editMode ? (
            <h2>{column.title}</h2>
          ) : (
            <input
              className="bg-gray-900 px-2 py-1.5 outline-none border-none ring-1 ring-transparent focus:ring-yellow-400 rounded-md text-sm font-normal"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          type="button"
          onClick={() => deleteColumn(column.id)}
          className="text-gray-300 px-2 py-2 hover:text-gray-100 hover:bg-red-600 rounded-md transition-all"
        >
          <TrashIcon className="text-lg" />
        </button>
      </div>
      {/* column task container */}
      <div className="flex flex-grow flex-col gap-3 overflow-x-hidden overflow-y-auto mt-3">
        {tasks?.map((task) => {
          return <TaskCard key={task.id} task={task} deleteTask={deleteTask} />;
        })}
      </div>
      {/* column footer */}
      <div className="flex justify-center pt-2 pb-1.5 select-none">
        <button
          className="flex items-center gap-2 text-sm border-2 border-gray-800 py-1 px-3 rounded-2xl hover:shadow-sm text-gray-300 hover:text-gray-100 hover:shadow-gray-950 transition-all"
          onClick={() => createTask(column.id)}
        >
          <p>Add Task</p>
          <AddIcon className="text-lg" />
        </button>
      </div>
    </div>
  );
}
