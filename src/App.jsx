import { useState } from "react";
import "./styles/App.css";
import Step from "./components/step";
import Recommendation from "./components/recommendation";
import DialogueContainer from "./components/dialogue";
class Dialogue {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
  }

  ToString() {
    return `user: ${this.question} \n agent: ${this.answer}. \n`;
  }
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [recordList, setRecordList] = useState([]);
  const [taskInEnglish, setTaskInEnglish] = useState("");
  const [stepHistory, setStepHistory] = useState([]);
  const [stepList, setStepList] = useState([]);
  const [recommendationList, setRecommendationList] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // 阻止默认的表单提交行为
    let task2send = "";
    if (taskInEnglish == "") {
      task2send = inputValue;
    } else {
      task2send = taskInEnglish;
    }
    // if (recordList.length > 0) {
    //   task2send = recordList[0].question;
    // } else {
    //   task2send = inputValue;
    // }
    let reference = "";
    for (let i = 0; i < recordList.length; i++) {
      reference += recordList[i].ToString();
    }
    reference += `user: ${inputValue}`;
    // console.log("myTask: " + myTask);
    const requestBody = JSON.stringify({ task: task2send, record: reference });
    console.log(requestBody);
    try {
      const response = await fetch(
        "http://0.0.0.0:8000/agent/v1/generate_plan",
        {
          // 替换为你的 API 端点
          method: "POST",
          // mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody, // 将输入框内容作为 JSON 发送
        }
      );

      if (response.ok) {
        console.log("数据提交成功！");
        const result = await response.json();
        console.log(result);
        setTaskInEnglish(result["plan"][0]["description"]);
        setStepList(result["plan"][0]["steps"]);
        setRecommendationList(result["plan"][0]["recommendation_tools"]);
        const newItem = new Dialogue(
          inputValue,
          result["plan"][0]["description"]
        );
        setRecordList([...recordList, newItem]); // Create a new array with the added item
        setStepHistory([...stepHistory, result["plan"][0]["steps"]]);
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
    <div id="mainContainer">
      <div id="taskContainer">
        <div className="taskDescriptionContainer">
          <h5>Task Description</h5>
          <p>{taskInEnglish}</p>
        </div>

        <hr />
      </div>
      <div id="resultContainer">
        <div id="chatContainer">
          <div id="chatHistory">
            {recordList.map((record, index) => (
              <DialogueContainer
                dialogueInfo={record}
                dialogueIndex={index}
                key={index}
              ></DialogueContainer>
            ))}
          </div>
          <div id="chatInput">
            <form onSubmit={handleSubmit} id="inputForm">
              <label>
                Input task:
                <textarea
                  id="textInput"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

        <div className="planContainer">
          <div className="stepsContainer">
            <div id="stepsTitle">
              <h5>Steps</h5>
            </div>
            <div id="stepListHistory">
              {/* {stepHistory.map((steps, index) => (
                <div className="stepList">
                  {steps.map((step, index) => (
                    <Step stepInfo={step} stepIndex={index} key={index}></Step>
                  ))}
                </div>
              ))} */}
              <div className="stepList">
                {stepList.map((step, index) => (
                  <Step stepInfo={step} stepIndex={index} key={index}></Step>
                ))}
              </div>
              {/* <div id="stepList">
                {stepHistory.map((step, index) => (
                  <Step stepInfo={step} stepIndex={index} key={index}></Step>
                ))}
              </div> */}
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
