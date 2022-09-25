import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const SubContent
  = (props) => {
    return (
      <p>
        {props.coursename} {props.excercises}
      </p>
    );
  };

const Content = (props) => {
  return (
    <div>
      <SubContent
        coursename={props.parts[0].name} excercises={props.parts[0].exercises} />
      <SubContent
        coursename={props.parts[1].name} excercises={props.parts[1].exercises} />
      <SubContent
        coursename={props.parts[2].name} excercises={props.parts[2].exercises} />
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of excercises{" "}
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass Content",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));