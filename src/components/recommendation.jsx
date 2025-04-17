import React from "react";
import "../styles/recommendation.css";
import Parameter from "./parameter";
function Recommendation({ recommendationInfo, recommendationIndex }) {
  return (
    <div className="recommendationMain">
      <h5>Recommendation {recommendationIndex}</h5>
      <div>Name: {recommendationInfo.name}</div>
      <div>Description: {recommendationInfo.description}</div>
      <div>
        Parameters:{" "}
        {recommendationInfo.parameters.map((parameter, index) => (
          <Parameter
            parameterInfo={parameter}
            parameterIndex={index}
            key={index}
          ></Parameter>
        ))}
      </div>
    </div>
  );
}

export default Recommendation;
