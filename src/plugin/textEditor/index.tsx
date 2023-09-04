import React from "react";
import ReactQuill from "react-quill";
const Editor: React.FC<{
  value: any;
  label: string;
  onChange: (content: any) => void;
}> = ({ value, label, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  const [code, setCode] = React.useState();
  React.useEffect(() => {
    setCode(value);
  }, [value]);

  const handleProcedureContentChange = (
    content: any,
    delta: any,
    source: any,
    editor: any
  ) => {
    setCode(content);
    console.log(delta, source, editor, content);
    onChange(content);
    //let has_attribues = delta.ops[1].attributes || "";
    //console.log(has_attribues);
    //const cursorPosition = e.quill.getSelection().index;
    // this.quill.insertText(cursorPosition, "★");
    //this.quill.setSelection(cursorPosition + 1);
  };

  return (
    <>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={code}
        placeholder={label}
        onChange={handleProcedureContentChange}
      />
    </>
  );
};

export default Editor;
