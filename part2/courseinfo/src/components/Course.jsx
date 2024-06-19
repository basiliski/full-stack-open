const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part}/>)

const Total = ({ parts }) => {
    const sum = parts.reduce((accumulator, current) =>
        accumulator + current.exercises, 0)
    return <p>Total of exercises {sum}</p>
}
    
const Course = ({course}) => {


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course