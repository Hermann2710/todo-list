import { NextResponse } from "next/server";
import connectToDataBase from "@/lib/mongoose";
import Task from "@/models/Task";

export async function GET() {
  try {
    await connectToDataBase();
    const tasks = await Task.find({}).lean();
    return NextResponse.json({ tasks: tasks });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req: Request) {
  await connectToDataBase();
  const data = await req.json();

  try {
    const name = data.name as string;
    if (!name) {
      return NextResponse.json({ error: "The name is required" });
    }

    const exist = await Task.findOne({ name: name });
    if (exist) {
      return NextResponse.json({ error: "Task already exist" });
    }

    const task = await Task.create({ name: name });
    return NextResponse.json({ task: task });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(req: Request) {
  await connectToDataBase();
  const data = await req.json();

  try {
    if (!data._id) {
      return NextResponse.json({ error: "The task doesn't exist" });
    }
    const task = await Task.findByIdAndDelete({ _id: data._id });

    if (task) {
      return NextResponse.json({ task: task });
    } else {
      return NextResponse.json({ error: "The task doesn't exist" });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(req: Request) {
  await connectToDataBase();
  const data = await req.json();

  try {
    if (!data._id) {
      return NextResponse.json({ error: "The task is required" });
    }
    if (!data.name) {
      return NextResponse.json({ error: "The name is required" });
    }

    const exist = await Task.findOne({ name: data.name });
    if (exist) {
      return NextResponse.json({ error: "Task already exists" });
    }

    const task = await Task.findByIdAndUpdate(
      data._id,
      {
        name: data.name,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (task) {
      return NextResponse.json({ task: task });
    } else {
      return NextResponse.json({ error: "Task doesn't exist" });
    }

  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PATCH(req: Request) {
  await connectToDataBase();
  const data = await req.json();

  try {
    if (!data._id) {
      return NextResponse.json({ error: "The task doesn't exist" });
    }
    const task = await Task.findById(data._id);
    if (task) {
      task.completed = !task.completed;
      task.save();
      return NextResponse.json({ task: task });
    } else {
      return NextResponse.json({ error: "The task doesn't exist" });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
