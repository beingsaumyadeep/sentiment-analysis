import axios from "axios";
import React from "react";
import {
  BiAngry,
  BiMehBlank,
  BiHappy,
  BiMeh,
  BiSearch,
  BiLoaderAlt,
} from "react-icons/bi";

function App() {
  const outputResult = (string) => {
    switch (string) {
      case "NEGATIVE":
        return (
          <>
            <h2>
              <BiAngry />
            </h2>
            <p>Negative!</p>
          </>
        );
      case "POSITIVE":
        return (
          <>
            <h2>
              <BiHappy />
            </h2>
            <p>Positive!</p>
          </>
        );
      case "NEUTRAL":
        return (
          <>
            <h2>
              <BiMeh />
            </h2>
            <p>Okay Okay!</p>
          </>
        );
      case "MIXED":
        return (
          <>
            <h2>
              <BiMehBlank />
            </h2>
            <p>Mixed</p>
          </>
        );
      default:
        return <></>;
    }
  };
  const [loading, setLoading] = React.useState(false);
  const [dataOutput, setDataOutput] = React.useState("");
  const [postData, setPostData] = React.useState("");

  const dataCall = async () => {
    if (postData.length < 4) {
      alert("Please write proper sentence!");
      return false;
    }
    try {
      setLoading(true);
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND}analyse`,
        {
          sentence: postData,
        }
      );
      setLoading(false);
      setDataOutput(result.data.result);
    } catch (err) {
      setLoading(false);
      alert("Something went wrong!");
    }
  };
  return (
    <div className="header">
      <h1 style={{ fontWeight: 100 }}>NLP Check</h1>
      <div className="input_box">
        <input
          type="text"
          placeholder="Type Sentence"
          value={postData}
          onChange={(e) => {
            setPostData(e.target.value);
            setDataOutput("");
          }}
        />
        <button type="button" disabled={loading} onClick={dataCall}>
          {loading ? <BiLoaderAlt className="rotate" /> : <BiSearch />}
        </button>
      </div>
      <div className="result_box">
        <h3>Result:</h3>
        {outputResult(dataOutput)}
      </div>
    </div>
  );
}

export default App;
