import React from "react";
import "../styles/step.css";
function Step({ stepInfo, stepIndex }) {
  return (
    <div className="stepMain">
      <h5>Step {stepIndex}</h5>
      <div>description：{stepInfo.description}</div>
      <div>explanation：{stepInfo.explanation}</div>
      <div>sub query：{stepInfo.sub_query}</div>
      {/* <div>推荐工具：{stepInfo.suggested_tool}</div> */}
    </div>
  );
}

export default Step;
