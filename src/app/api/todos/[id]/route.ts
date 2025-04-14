// src/app/api/todos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { id } = params;
    const { completed, title } = await request.json();
    
    // Ensure the todo belongs to the user
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });
    
    if (!todo || todo.userId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    
    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        ...(completed !== undefined && { completed }),
        ...(title !== undefined && { title }),
      },
    });
    
    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Fixed DELETE handler
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { id } = params;
    
    // Ensure the todo belongs to the user
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });
    
    if (!todo || todo.userId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    
    await prisma.todo.delete({
      where: {
        id,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}