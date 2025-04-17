import React from "react";
import "../styles/dialogue.css";
function DialogueContainer({ dialogueInfo, dialogueIndex }) {
  return (
    <div className="dialogueContainer">
      {/* <h5>Step {dialogueIndex}</h5> */}
      <p className="roleUser">user</p>
      <p>{dialogueInfo.question}</p>
      <p className="roleAgent">agent</p>
      <p>{dialogueInfo.answer}</p>
    </div>
  );
}

export default DialogueContainer;
