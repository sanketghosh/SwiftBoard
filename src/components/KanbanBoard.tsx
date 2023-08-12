import { useState, useMemo } from "react";
import { AddIcon } from "../assets";
import { Column, ID, Task } from "../types/types";
import { v4 as uuidV4 } from "uuid";
import { ColumnContainer } from ".";
import {
  DndContext,
  DragStartEvent,
  DragOverlay,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  function createNewColumn() {
    const columnToAdd: Column = {
      /* uuid generates a random number */
      id: uuidV4(),
      title: `Column ${columns?.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function handleDeleteColumn(id: ID) {
    const filteredColumn = columns.filter((col) => col.id !== id);

    setColumns(filteredColumn);
  }

  function handleOnDragStart(event: DragStartEvent) {
    console.log("DRAG START", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function handleOnDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, //px
      },
    })
  );

  function handleUpdateColumn(id: ID, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function handleCreateTask(columnId: ID) {
    const newTask: Task = {
      id: uuidV4(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  /* match tasks with column id */
  function colTaskMatcher(colId: ID) {
    return tasks.filter((task) => task.columnId === colId);
  }

  function handleDeleteTask(id: ID) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  return (
    <DndContext
      onDragStart={handleOnDragStart}
      onDragEnd={handleOnDragEnd}
      sensors={sensors}
    >
      <div className="m-auto flex gap-4">
        <div className="flex items-center gap-4">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer
                column={col}
                key={col.id}
                deleteColumn={handleDeleteColumn}
                updateColumn={handleUpdateColumn}
                createTask={handleCreateTask}
                tasks={colTaskMatcher(col.id)}
                deleteTask={handleDeleteTask}
              />
            ))}
          </SortableContext>
        </div>
        <button
          type="button"
          onClick={() => createNewColumn()}
          className="flex items-center h-14 w-80 min-w-[320px] cursor-pointer rounded-md border-2 border-gray-800 bg-gray-900 justify-center gap-1 text-lg ring-2 ring-transparent hover:ring-yellow-400 p-4"
        >
          <AddIcon className="text-xl" />
          <p className="font-medium">Add Column</p>
        </button>
      </div>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <ColumnContainer
              column={activeColumn}
              deleteColumn={handleDeleteColumn}
              updateColumn={handleUpdateColumn}
              createTask={handleCreateTask}
              deleteTask={handleDeleteTask}
              tasks={colTaskMatcher(activeColumn.id)}
            />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
