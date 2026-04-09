import { BubbleMenu } from "@tiptap/react/menus";
import { ChainedCommands, Editor } from "@tiptap/react";
import { Command, CommandGroup, CommandInput, CommandList } from "@/components/ui/command";
import { Heading1, LucideIcon } from "lucide-react";

type TiptapBubbleMenuProps = {
    editor: Editor
}

type MenuItem = {
    icon: LucideIcon
    label: string
    command: ChainedCommands
}

export function TiptapBubbleMenu({ editor }: TiptapBubbleMenuProps) {

    return(
        <BubbleMenu editor={editor}>
            <Command>
                <CommandInput/>
                <CommandList>
                    <CommandGroup>

                    </CommandGroup>
                </CommandList>
            </Command>
        </BubbleMenu>
    )
}