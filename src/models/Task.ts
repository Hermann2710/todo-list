import { Document, model, models, Schema } from "mongoose";

interface ITask extends Document {
    name: string;
    completed: boolean;
}

const TaskSchema = new Schema<ITask>({
    name: { type: String, required: true, unique: true },
    completed: { type: Boolean, default: false },
});

const Task = models.Task || model<ITask>('Task', TaskSchema);

export default Task;