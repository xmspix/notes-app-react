import React from "react";

const Toolbar = () => {
  const toggleCheck = () => {
    if (document.getElementById("check").checked !== "checked") {
      document.getElementById("check").checked = "checked";
    } else {
      document.getElementById("check").checked = "";
    }
  };

  const handleOption = command => {
    if (
      command == "h1" ||
      command == "h2" ||
      command == "p" ||
      command == "blockquote" ||
      command == "code"
    ) {
      document.execCommand("formatBlock", false, command);
    }
    if (command == "createlink" || command == "insertimage") {
      let url = prompt("Enter the link here: ", "http://");
      document.execCommand(command, false, url);
    }
    if (command == "checkbox")
      document.execCommand("insertHTML", false, "<input type='checkbox' />");
    else document.execCommand(command, false, null);
  };

  return (
    <div className="btn toolbar">
      <div>
        <button
          className="btn fontStyle"
          onClick={() => handleOption("italic")}
          title="Italicize Highlighted Text"
        >
          <i>I</i>
        </button>

        <button
          className="btn fontStyle"
          onClick={() => handleOption("bold")}
          title="Bold Highlighted Text"
        >
          <b>B</b>
        </button>

        <button
          className="btn fontStyle"
          onClick={() => handleOption("underline")}
        >
          <u>U</u>
        </button>

        <button
          className="btn fontStyle"
          onClick={() => handleOption("insertOrderedList")}
        >
          OrderedList
        </button>

        <button
          className="btn fontStyle"
          onClick={() => handleOption("checkbox")}
        >
          Checkbox
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
