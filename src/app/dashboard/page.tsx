import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import TodoList from "@/components/todos/todo-list";
import TodoForm from "@/components/todos/todo-form";
import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const { userId } = await  auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Todos</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <TodoForm />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <TodoList initialTodos={todos} />
      </div>
    </div>
  );
}