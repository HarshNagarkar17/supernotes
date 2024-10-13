import { nextAuthOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const session = await getServerSession(nextAuthOptions);

    if (!session?.user) return NextResponse.redirect("/login");

    const notes = await prisma.note.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({ notes });
  } catch (error) {
    console.log("error getting notes", error);
    return NextResponse.json(
      { message: "Failed to get notes" },
      { status: 500 }
    );
  }
};
