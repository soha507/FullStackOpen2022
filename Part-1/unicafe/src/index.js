import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Heading = () => <h1>Give Feedback</h1>;
const Heading1 = () => <h1>Statistics</h1>;


const StatisticLine = (data) => {
  return (
    <li>
      {data.name}{" "}{data.value}
    </li>
  );
};

const Statistics = (props) => {
  if (!props.hasFeedback) {
    return <p>No feedback has been given</p>;
  }

  return (
    <div>
      <Heading1 />
      <ul>
        <li>
          <StatisticLine name="good" value={props.good} />
        </li><li>
          <StatisticLine name="neutral" value={props.neutral} />
        </li><li>
          <StatisticLine name="bad" value={props.bad} />
        </li><li>
          <StatisticLine name="total" value={props.total} />
        </li><li>
          <StatisticLine name="averageScore" value={props.averageScore} />
        </li><li>
          <StatisticLine
            name="positivePercent"
            value={props.positivePercent + "%"}
          />
        </li>
      </ul>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [hasFeedback, setHasFeedback] = useState(false);

  const total = good + neutral + bad;

  const getPercent = (x, totalAmount) => {
    let sum = (x / totalAmount) * 100;

    if (Number.isNaN(sum)) return 0;

    return Math.round(sum * 1000) / 1000;
  };

  const positivePercent = getPercent(good, total);

  const getAvg = (weightsArr, total) => {
    const weights = weightsArr.reduce((acc, i) => {
      return acc + i.number * i.weight;
    }, 0);

    let sum = weights / total;

    if (Number.isNaN(sum)) return 0;

    return Math.round(sum * 1000) / 1000;
  };

  const averageScore = getAvg(
    [
      { number: good, weight: 1 },
      { number: neutral, weight: 0 },
      { number: bad, weight: -1 },
    ],
    total
  );

  const handleClick = (text) => {
    setHasFeedback(true);

    switch (text) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  const statisticsProps = {
    hasFeedback: hasFeedback,
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    averageScore: averageScore,
    positivePercent: positivePercent,
  };

  return (
    <div>
      <Heading />
      <button onClick={() => handleClick("good")}>good</button>
      <button onClick={() => handleClick("neutral")}>neutral</button>
      <button onClick={() => handleClick("bad")}>bad</button>
      <Statistics {...statisticsProps} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));