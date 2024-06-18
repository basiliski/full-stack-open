import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <div>{text} {value}</div>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total
  const message = "No feedback given"

  return (
    <>
      <h1>statistics</h1>
      {total ? 
        <div>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="average" value={average}/>
          <StatisticLine text="positive" value={`${positive * 100} %`}/>
        </div>
        : message
      }
    </>
  )
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
        <Button text="good" onClick={() => setGood(good + 1)}/>
        <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
        <Button text="bad" onClick={() => setBad(bad + 1)}/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App