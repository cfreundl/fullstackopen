import React from 'react'

const Header = ({ course }) => (
    <h1>{course}</h1>
)

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
)

const Content = ({ parts }) => (
    <>
        {parts.map((part) =>
            <Part key={part.id} part={part} />
        )}
    </>
)

const Total = ({ parts }) => (
    <p>
        <b>total of {parts.reduce((s, v) => s + v.exercises, 0)} exercises</b>
    </p>
)

const Course = ({ course }) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default Course
