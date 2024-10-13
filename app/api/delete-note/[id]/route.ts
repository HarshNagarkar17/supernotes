import { nextAuthOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const session = await getServerSession(nextAuthOptions);

    if (!session?.user) return NextResponse.redirect("/login");

    const { id } = params;

    if (!id)
      return NextResponse.json({ message: "id is required" }, { status: 400 });

    await prisma.note.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "note deleted" });
  } catch (error) {
    console.log("failed to delete", error);
    return NextResponse.json({ message: "failed to delete" }, { status: 500 });
  }
};
