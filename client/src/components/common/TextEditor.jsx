import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import edjsHTML from "editorjs-html";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import htmlToBlocks from "@/lib/htmlToBlocks";

const TextEditor = ({ onChange, data }) => {
    const parsedData = htmlToBlocks(data);
    const editorRef = useRef(null);
    const edjsParser = edjsHTML();


    useEffect(() => {
        if (!editorRef.current) {
            const editor = new EditorJS({
                holder: "editorjs",
                placeholder: "Type job description here...",
                autofocus: true,
                data: parsedData,
                tools: {
                    header: { class: Header, inlineToolbar: true },
                    list: { class: List, inlineToolbar: true },
                    paragraph: { class: Paragraph, inlineToolbar: true },
                },
                onReady: () => {
                    
                    editorRef.current = editor;
                },
                onChange: async (api) => {
                    const savedData = await api.saver.save();
                    const html = edjsParser.parse(savedData);
                    if (onChange) onChange(html);
                },
            });
        }
        return () => {
            if (editorRef.current?.destroy) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);

    return (
        <div
            id="editorjs"
            className="border rounded p-4 py-2 h-full max-h-100 overflow-y-auto"
        ></div>
    );
};

export default TextEditor;
