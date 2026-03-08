"use server"

import { getServerSession } from "@/lib/auth-server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { JSONContent } from "@tiptap/react";

const EMPTY_TIPTAP_DOC_JSON: JSONContent = {
    type: "doc",
    content: [{ type: "paragraph" }],
};

export async function createEmptyNoteAction() {

    const session = await getServerSession();
    if (!session) {
        redirect("/");
    }

    const note = await prisma.note.create({
        data: {
            title: "",
            body: EMPTY_TIPTAP_DOC_JSON,
        },
    });

    redirect(`/dashboard/${note.id}`);
}

type UpdateNoteBodyInput = {
    id: string,
    body: JSONContent
}

export async function updateNoteBodyAction(input: UpdateNoteBodyInput) {

    const session = await getServerSession();
    if (!session) {
        redirect("/")
    }

    await prisma.note.update({
        where: {
            id: input.id
        },
        data: {
            body: input.body
        }
    })
}