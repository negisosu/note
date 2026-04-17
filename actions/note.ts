"use server"

import { getServerSession } from "@/lib/auth-server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { JSONContent } from "@tiptap/core";
import { Note } from "@/types/note";

const EMPTY_TIPTAP_DOC_JSON: JSONContent = {
    type: "doc",
    content: [{ type: "paragraph" }],
};

export async function createEmptyNoteAction() {

    const session = await getServerSession();
    if (!session) {
        redirect("/");
    }

    let noteId: string;
    try {
        const note = await prisma.note.create({
            data: {
                title: "",
                body: EMPTY_TIPTAP_DOC_JSON,
                userId: session.user.id
            },
        });
        noteId = note.id;
    } catch (error) {
        console.error("Failed to create note:", error);
        throw new Error("ノートの作成に失敗しました。");
    }

    redirect(`/dashboard/${noteId}`);
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

    try {
        await prisma.note.update({
            where: {
                id: input.id
            },
            data: {
                body: input.body
            }
        })
    } catch (err) {
        console.error("Failed to update note body:", err);
        throw new Error("ノート本文の更新に失敗しました。");
    }
}

type UpdateNoteTitleInput = {
    id: string,
    title: string
}

export async function updateNoteTitleAction(input: UpdateNoteTitleInput) {
    const session = await getServerSession()
    if (!session) {
        redirect("/")
    }

    try {
        await prisma.note.update({
            where: {
                id: input.id
            },
            data: {
                title: input.title
            }
        })
    }catch(err) {
        console.error("Failed to update note title:", err);
        throw new Error("ノートタイトルの更新に失敗しました。");
    }
}

type GetNoteByIdInput = {
    id: string
}

export async function getNoteById(input: GetNoteByIdInput): Promise<Note | null> {
    const session = await getServerSession()
    if (!session) {
        redirect("/")
    }

    try{
        return await prisma.note.findUnique({
            where: {
                id: input.id,
                userId: session.user.id
            }
        })
    }catch(err){
        console.error("Failed to get note:", err)
        throw new Error("ノートの取得に失敗しました。")
    }
}

export async function getNotes(): Promise<Note[]>{
    const session = await getServerSession()
    if (!session) {
        redirect("/")
    }

    try{
        return await prisma.note.findMany({
            where: {
                userId: session.user.id
            }
        })
    }catch(err){
        console.error("Failed to get notes:", err)
        throw new Error("エラーの取得に失敗しました")
    }
}