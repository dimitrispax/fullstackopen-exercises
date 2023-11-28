import { useState } from 'react'

const Anecdote = ({ Title, Anecdote, Votes }) => {
  return (
    <div>
      <h2>{Title}</h2>
      <p>{Anecdote}</p>
      <p>has {Votes} votes</p>
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));
  const [maxVotes, setMaxVotes] = useState(0);
  /* Function shows a random next anecdote. */
  const showNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length)))
  }

  /* Function that adds one vote on the current anecdote. */
  const voteAnecdote = () => {
    const votesCopy = [...votes]; // Copy of the votes array.

    votesCopy[selected] += 1; // Incrementing the vote count of the 
    setVotes(votesCopy);      // selected anecdote and changing the state.
  }

  return (
    <>
      <Anecdote
        Title="Anecdote of the day"
        Anecdote={anecdotes[selected]}
        Votes={votes[selected]}
      />
      <div>
        <button onClick={voteAnecdote}>Vote</button>
        <button onClick={showNextAnecdote}>Next Anecdote</button>
      </div>
      <Anecdote
        Title="Anecdote with the most votes"
        Anecdote={anecdotes[votes.indexOf(Math.max(...votes))]}
        Votes={Math.max(...votes)}
      />
    </>
  )
}

export default App