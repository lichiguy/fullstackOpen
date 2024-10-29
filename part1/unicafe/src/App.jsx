import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} % </td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  console.log(props);
  const { good, neutral, bad, all } = props;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;
  if (all === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [clicks, setClicks] = useState({ good: 0, neutral: 0, bad: 0, all: 0 });

  const handleGoodClick = () => {
    setClicks({ ...clicks, good: clicks.good + 1, all: clicks.all + 1 });
  };
  const handleNeutralClick = () => {
    setClicks({ ...clicks, neutral: clicks.neutral + 1, all: clicks.all + 1 });
  };
  const handleBadClick = () => {
    setClicks({ ...clicks, bad: clicks.bad + 1, all: clicks.all + 1 });
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <h2>statistics</h2>
      <Statistics {...clicks} />
    </div>
  );
};

export default App;
