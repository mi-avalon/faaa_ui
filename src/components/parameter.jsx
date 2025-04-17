import React from "react";
import "../styles/parameters.css";
function Parameter({ parameterInfo, parameterIndex }) {
  return (
    <div className="parameterMain">
      <div>name: {parameterInfo.name}</div>
      <div>type: {parameterInfo.type}</div>
      <div>description: {parameterInfo.description}</div>
    </div>
  );
}

export default Parameter;
