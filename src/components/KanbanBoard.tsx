import { useState } from "react";
import { AddIcon } from "../assets";
import { Column } from "../types/types";
import { v4 as uuidV4 } from "uuid";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);

  function createNewColumn() {
    const columnToAdd: Column = {
      id: uuidV4(),
      title: `Column ${columns?.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  return (
    <div className="m-auto">
      <button
        type="button"
        onClick={() => createNewColumn()}
        className="flex items-center h-14 w-80 min-w-[300px] cursor-pointer rounded-md border-2 border-gray-800 bg-gray-900 justify-center gap-1 text-lg ring-2 ring-transparent hover:ring-teal-400 p-4"
      >
        <AddIcon className="text-xl" />
        <p className="font-medium">Add Column</p>
      </button>
    </div>
  );
}
