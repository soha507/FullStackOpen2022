import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Heading1 = () => <h1>Anecdote of the Day</h1>;
const Heading2 = () => <h1>Anecdote with Most Votes</h1>

const Anecdote = (object) => {
  return (
    <>
      {object.anecdote}
      <br />
      has {object.votes} votes
    </>
  );
};

const MostVoted = (properties) => {
  return (
    <>
      <Heading2 />
      {!properties.noofVotes && <>No anecdotes have been voted on yet.</>}
      {properties.noofVotes && (
        <Anecdote anecdote={properties.anecdote} votes={properties.votes} />
      )}
    </>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));
  const [noofVotes, setnoofVotes] = useState(false);

  const maxVote = votes.reduce(
    (c, no, index) => {
      if (no > c.no) {
        c.no = no;
        c.index = index;
      }

      return c;
    },
    { no: 0 }
  );


  const getRI = (length) => {
    return Math.floor(Math.random() * length);
  };

  const handleClick = (text) => {
    switch (text) {
      case "next":
        setNewRandomAnecdote();
        break;
      case "vote":
        increaseVote();
        break;
      default:
        break;
    }
  };

  const setNewRandomAnecdote = () => {
    let rAI;

    do {
      rAI = getRI(props.anecdotes.length);
    } while (rAI === selected);

    setSelected(rAI);
  };

  const increaseVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    setnoofVotes(true);
  };

  const maxVotedAnecdote = anecdotes[maxVote.index];

  return (
    <div>
      <Heading1 />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <br />
      <button onClick={() => handleClick("vote")}>vote</button>
      <button onClick={() => handleClick("next")}>next anecdote</button>
      <MostVoted
        noofVotes={noofVotes}
        anecdote={maxVotedAnecdote}
        votes={maxVote.no}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code counts for the first 90 percent of the development time...The remaining 10 percent of the code counts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));