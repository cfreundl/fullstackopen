import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({ title, anecdote, votes }) => (
  <>
    <h1>{title}</h1>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(props.anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

  const voteFor = (index) => {
    const newPoints = [...points]
    newPoints[index] += 1
    setPoints(newPoints)

    if (newPoints[index] > newPoints[mostVoted]) {
      setMostVoted(index)
    }
  }

  return (
    <div>
      <Anecdote title='Anecdote of the day'
        anecdote={props.anecdotes[selected]}
        votes={points[selected]} />
      <button onClick={() => voteFor(selected)}>vote</button>
      <button onClick={() => setSelected(getRandomInt(props.anecdotes.length))}>next anecdote</button>
      <Anecdote title='Anecdote with most votes'
        anecdote={props.anecdotes[mostVoted]}
        votes={points[mostVoted]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
