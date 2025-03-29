import { useState } from "react";
import "./styles/App.css";
import Step from "./components/step";
import Recommendation from "./components/recommendation";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [taskInEnglish, setTaskInEnglish] = useState("");
  const [stepList, setStepList] = useState([]);
  const [recommendationList, setRecommendationList] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault(); // 阻止默认的表单提交行为

    try {
      const response = await fetch(
        "http://0.0.0.0:8000/agent/v1/generate_plan",
        {
          // 替换为你的 API 端点
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: inputValue }), // 将输入框内容作为 JSON 发送
        }
      );

      if (response.ok) {
        console.log("数据提交成功！");
        const result = await response.json();
        console.log(result);
        setTaskInEnglish(result["plan"][0]["description"]);
        setStepList(result["plan"][0]["steps"]);
        setRecommendationList(result["plan"][0]["recommendation_tools"]);
        // 在此处处理成功的响应，例如显示成功消息
      } else {
        console.error("数据提交失败！");
        // 在此处处理失败的响应，例如显示错误消息
      }
    } catch (error) {
      console.error("请求错误：", error);
      // 在此处处理请求错误，例如显示错误消息
    }
  };

  return (
    <div className="mainContainer">
      <div className="inputContainer">
        <form onSubmit={handleSubmit} className="inputForm">
          <label>
            Input task：
            <textarea
              className="textInput"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <hr />
      </div>
      <div className="resultContainer">
        <div className="taskDescriptionContainer">
          <h5>Task Description</h5>
          <p>{taskInEnglish}</p>
        </div>
        <div className="planContainer">
          <div className="stepsContainer">
            <div id="stepsTitle">
              <h5>Steps</h5>
            </div>
            <div id="stepList">
              {stepList.map((step, index) => (
                <Step stepInfo={step} stepIndex={index} key={index}></Step>
              ))}
            </div>
          </div>
          <div className="recommendationContainer">
            <div id="recommendationTitle">
              <h5>Recommendation tools</h5>
            </div>
            {recommendationList.map((recommendation, index) => (
              <Recommendation
                recommendationInfo={recommendation}
                recommendationIndex={index}
                key={index}
              ></Recommendation>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
