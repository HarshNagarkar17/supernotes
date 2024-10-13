import { nextAuthOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(nextAuthOptions);

    if (!session?.user) return NextResponse.redirect("/login");

    const { title, content } = await req.json();

    if (!title || !content)
      return NextResponse.json(
        { message: "title and content is required" },
        { status: 400 }
      );

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ note });
  } catch (error) {
    console.log("error getting notes", error);
    return NextResponse.json(
      { message: "Failed to get notes" },
      { status: 500 }
    );
  }
};
