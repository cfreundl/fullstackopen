import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatItem = ({ label, value }) => (
  <div>{label} {value}</div>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const sum = good - bad

  const average = (sum, count) => count > 0 ? sum / count : 'N/A'
  const percentage = (value, count) => count > 0 ? 100 * value / count + ' %' : 'N/A'
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGood(good + 1)} />
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' handleClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <StatItem label='good' value={good} />
      <StatItem label='neutral' value={neutral} />
      <StatItem label='bad' value={bad} />
      <StatItem label='all' value={all} />
      <StatItem label='average' value={average(sum, all)} />
      <StatItem label='positive' value={percentage(good, all)} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
