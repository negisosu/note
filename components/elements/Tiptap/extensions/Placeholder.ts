import { Placeholder } from "@tiptap/extensions";

export const PlaceholderKit = [
    Placeholder.configure({
        placeholder: ({ node }) => {
            console.log(node.type)
            switch (node.type.name) {
                case "heading":
                    return `見出し${node.attrs.level}`
                case "paragraph":
                    return "段落"
                case "blockquote":
                    return "引用"
                default:
                    return ""
            }
        }
    })
]