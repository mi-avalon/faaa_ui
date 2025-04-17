import React from "react";
import "../styles/step.css";
function Step({ stepInfo, stepIndex }) {
  return (
    <div className="stepMain">
      <h5>Step {stepIndex}</h5>
      <div>
        <p className="categoryWord">description:</p>
        {stepInfo.description}
      </div>
      <div>
        <p className="categoryWord">explanation:</p>
        {stepInfo.explanation}
      </div>
      <div>
        <p className="categoryWord">sub query:</p>
        {stepInfo.sub_query}
      </div>
      <div>
        <p className="categoryWord">tool:</p>
        {stepInfo.suggested_tool}
      </div>
    </div>
  );
}

export default Step;
