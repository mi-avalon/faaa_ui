import React from "react";
import "../styles/recommendation.css";
function Recommendation({ recommendationInfo, recommendationIndex }) {
  return (
    <div className="recommendationMain">
      <h5>Recommendation {recommendationIndex}</h5>
      <div>Name：{recommendationInfo.name}</div>
      <div>Description：{recommendationInfo.description}</div>
    </div>
  );
}

export default Recommendation;
