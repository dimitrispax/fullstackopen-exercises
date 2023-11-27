import { useState } from 'react'

const Button = ({ OnClick, Text }) => {
  return (
    <button onClick={OnClick}>{Text}</button>
  )
}

const Statistics = ({ Good, Neutral, Bad }) => {
  let all = Good + Neutral + Bad;
  let average = (Good - Bad) / all;
  let positive = Good / all * 100;

  if (all === 0) {
    return (
      <p>No feedback given.</p>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <p>good {Good}</p>
        <p>neutral {Neutral}</p>
        <p>bad {Bad}</p>
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positive} %</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button OnClick={() => setGood(good + 1)} Text="good" />
        <Button OnClick={() => setNeutral(neutral + 1)} Text="neutral" />
        <Button OnClick={() => setBad(bad + 1)} Text="bad" />
      </div>
      <Statistics Good={good} Neutral={neutral} Bad={bad} />
    </div>
  )
}

export default App