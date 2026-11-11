import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';

export default function MarkdownPreview({ value }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown
    ],
    content: value,
    contentType: 'markdown',
    editable: false,
  });

    return <EditorContent editor={editor} />;
}