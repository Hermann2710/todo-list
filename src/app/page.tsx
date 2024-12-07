"use client";
import { Task, TaskContext } from "@/contexts/TaskContext";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import {
  BiCheck,
  BiCheckbox,
  BiCheckboxChecked,
  BiEdit,
  BiTrash,
} from "react-icons/bi";
import { toast } from "react-toastify";

function Home() {
  const [name, setName] = useState<string>("");
  const [_id, set_id] = useState<string>();

  const { tasks, dispatch } = useContext(TaskContext);

  const handleDelete = async (task: Task) => {
    set_id(undefined);
    const response = await fetch("/api/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: task._id }),
    });
    const json = await response.json();

    if (response.ok) {
      if (json.task) {
        dispatch && dispatch({ type: "DELETE", payload: { task: task } });
        toast.success("Task deleted successfully");
      } else {
        toast.error(json.error);
      }
    } else {
      toast.error(json.error);
    }
  };

  const handlePost = async function (e: SyntheticEvent) {
    e.preventDefault();
    if (!name) {
      toast.error("The name is required");
      return;
    }

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });

    const json = await response.json();

    if (response.ok) {
      if (json.task) {
        toast.success("Task added successfully");
        dispatch && dispatch({ type: "ADD", payload: json });
        setName("");
      } else {
        toast.error(json.error);
      }
    } else {
      toast.error(json.error);
    }
  };

  const handleEdit = async function (e: SyntheticEvent) {
    e.preventDefault();
    if (!_id) {
      toast.error("The task is required");
      return;
    }
    if (!name) {
      toast.error("The name is required");
    }

    const response = await fetch("/api/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: _id, name: name }),
    });

    const json = await response.json();

    if (response.ok) {
      if (json.task) {
        toast.success("Task updated successfully");
        dispatch && dispatch({ type: "UPDATE", payload: json });
        setName("");
        set_id(undefined);
      } else {
        toast.error(json.error);
      }
    } else {
      toast.error(json.error);
    }
  };

  const handleUpdate = async function (_id: string) {
    if (!_id) {
      toast.error("Please select a task");
      return;
    } else {
      const response = await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: _id }),
      });

      const json = await response.json();
      if (response.ok) {
        if (!json.error) {
          toast.success("Task updated successfully");
          dispatch && dispatch({ type: "UPDATE", payload: json });
        } else {
          toast.error(json.error);
        }
      } else {
        toast.error(json.error);
      }
    }
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest ">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest font-semibold text-lg">Todo App</h1>
          <form className="flex mt-4">
            <input
              type="text"
              placeholder="Task Name"
              value={name}
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-2 text-grey-darker"
              onChange={(e) => setName(e.target.value)}
            />
            {_id ? (
              <button
                className="flex-no-shrink p-2 transition-all ease-in-out duration-500 border-2 rounded text-orange-600 border-orange-600 hover:text-white hover:bg-orange-600 font-medium"
                onClick={(e) => handleEdit(e)}
              >
                Edit
              </button>
            ) : (
              <button
                className="flex-no-shrink p-2 transition-all ease-in-out duration-500 border-2 rounded text-green-600 border-green-600 hover:text-white hover:bg-green-600 font-medium"
                onClick={(e) => handlePost(e)}
              >
                Add
              </button>
            )}
          </form>
        </div>
        <div>
          <div>
            {tasks &&
              tasks.map((task) => (
                <div className="flex mb-4 items-center" key={task._id}>
                  <p className="w-full text-grey-darkest flex items-center">
                    {task.completed ? (
                      <BiCheckboxChecked className="text-2xl" color="green" />
                    ) : (
                      <BiCheckbox className="text-2xl" color="blue" />
                    )}
                    <span className={`${task.completed && "line-through"}`}>{task.name}</span>
                  </p>
                  <BiCheck
                    className="cursor-pointer text-2xl"
                    onClick={() => handleUpdate(task._id)}
                    color="green"
                  />
                  <BiEdit
                    className="cursor-pointer text-2xl"
                    color="orange"
                    onClick={() => {
                      set_id(task._id);
                      setName(task.name);
                    }}
                  />
                  <BiTrash
                    className="cursor-pointer text-2xl"
                    color="red"
                    onClick={() => handleDelete(task)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
