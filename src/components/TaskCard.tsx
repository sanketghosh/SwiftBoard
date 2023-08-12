import { TrashIcon } from "../assets";
import { ID, Task } from "../types/types";

import { useState } from "react";

type TaskCardPropTypes = {
  task: Task;

  deleteTask: (id: ID) => void;
};

export default function TaskCard({ task, deleteTask }: TaskCardPropTypes) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [taskCardEditMode, setTaskCardEditMode] = useState(false);

  const toggleEditMode = () => {
    setTaskCardEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  return (
    <div
      className="p-3 h-24 min-h-[96px] rounded-md border-2 border-gray-800 bg-gray-950 hover:ring-1 hover:ring-inset hover:ring-yellow-400 cursor-grab relative text-sm"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      {taskCardEditMode ? (
        <textarea
          className="w-full h-full bg-gray-900 resize-none rounded-md border-2 border-gray-800 text-gray-50 focus:outline-none p-2"
          value={task.content}
          autoFocus
          placeholder="Task content here..."
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter") toggleEditMode();
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
      ) : (
        <div onClick={toggleEditMode} className="w-full h-full">
          {task.content}
          {mouseIsOver && (
            <button
              className="absolute right-2 bottom-3 hover:bg-red-600 p-1.5 rounded-md"
              onClick={() => deleteTask(task.id)}
            >
              <TrashIcon />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
