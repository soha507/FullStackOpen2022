import React from "react";

const Header = (props) => {
    return <h1>{props.name}</h1>;
};

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    );
};

const Content = ({ parts }) => {
    const partsList = parts.map((i) => {
        return <Part key={i.id} name={i.name} exercises={i.exercises} />;
    });

    const noParts = !Array.isArray(partsList) || !partsList.length;

    return (
        <div>
            {noParts && <p>This course doesn't have any parts yet.</p>}
            {!noParts && partsList}
        </div>
    );
};

const Total = ({ parts }) => {
    const total = parts.reduce((acc, i) => acc + i.exercises, 0);

    return (
        <p>
            <b>Total of {total} exercises</b>
        </p>
    );
};

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default Course;