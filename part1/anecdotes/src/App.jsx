import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const amount = anecdotes.length
  const startingPoints = Array(amount).fill(0)
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(startingPoints)
  const [topRanked, setTopRanked] = useState({index: 0, votes: 0})

  const handleNext = () => {
    const randomNumber = Math.floor(Math.random() * amount)
    setSelected(randomNumber)
  }

  const handleVote = () => {
    const newPoints= [...points]
    newPoints[selected] += 1
    if (newPoints[selected] > topRanked.votes) {
      setTopRanked({index: selected, votes: newPoints[selected]})
    }
    setPoints(newPoints)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>has {points[selected]} votes</div>
      <Button text="vote" onClick={handleVote}/>
      <Button text="next anecdote" onClick={handleNext}/>
      <h1>Anecdote with most votes</h1>
      <div>
        {anecdotes[topRanked.index]}
      </div>
      <div>has {topRanked.votes} votes</div>
    </>
  )
}

export default App