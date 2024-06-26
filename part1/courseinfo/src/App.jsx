const Header = props => {
  return (
    <h1>{props.courseName}</h1>
  )
}

const Part = props => {
  return (
    <p>
        {props.part} {props.amount}
    </p>
  )
}

const Content = props => {
  return (
    <div>
      <Part part={props.parts[0].name} amount={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} amount={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} amount={props.parts[2].exercises}/>
    </div>
  )
}

const Total = props => {
  let total = 0
  props.parts.forEach(part => total += part.exercises)
  return (
    <p>Number of exercises {total}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App