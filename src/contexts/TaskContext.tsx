"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";

export interface Task {
  _id: string;
  name: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  dispatch?: Dispatch<any>;
}

interface TaskAction {
  type: "ADD" | "GET" | "UPDATE" | "DELETE";
  payload: any;
}

export const TaskContext = createContext({} as TaskState);

const TaskReducer = function (state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        tasks: [action.payload.task as Task, ...state.tasks],
      };
    case "GET":
      return {
        ...state,
        tasks: action.payload.tasks as Task[],
      };
    case "UPDATE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === (action.payload.task._id as string)
            ? (action.payload.task as Task)
            : task
        ),
      };
    case "DELETE":
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task._id !== (action.payload.task._id as string)
        ),
      };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

export default function TaskProvider(props: Props): React.JSX.Element {
  const [state, dispatch] = useReducer(TaskReducer, {} as TaskState);

  useEffect(() => {
    const fetchTasks = async function () {
      const response = await fetch("/api/tasks");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "GET", payload: json });
      } else {
        throw new Error(json.error);
      }
    };
    fetchTasks();
  }, []);
  return (
    <TaskContext.Provider value={{ ...state, dispatch: dispatch }}>
      {props.children}
    </TaskContext.Provider>
  );
}
