import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticsLine = ({text, value}) => {
  if (text === "positive") return (
    <tr>
      <td>{text}</td> 
      <td>{value} %</td>
    </tr>
  )
  return (
    <tr> 
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  let average = 0
  let positive = 0
  if (total > 0) {
    average = (good-bad)/total
    positive = good/total * 100
    return(
        <div>
          <h2>statistics</h2>
          <table>
            <tbody>
              <StatisticsLine text="good" value={good}/>
              <StatisticsLine text="neutral" value={neutral}/>
              <StatisticsLine text="bad" value={bad}/>
              <StatisticsLine text="all" value={total}/>
              <StatisticsLine text="average" value={average}/>
              <StatisticsLine text="positive" value={positive}/>
            </tbody>
          </table>
        </div>
      )
  } 
  return (
    <div>
      <h2>statistics</h2>
      <p>No feedback given</p>
    </div>
  )  
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addCount = (state, setter) => {
    setter(state + 1)
  } 

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button text="good" handleClick={() => {addCount(good, setGood)}}/>
        <Button text="neutral" handleClick={() => {addCount(neutral, setNeutral)}}/>
        <Button text="bad" handleClick={() => {addCount(bad, setBad)}}/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App