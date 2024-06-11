const Header = ({ course })=> {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  ) 
}

const Part = ({name, exerciseCount}) => {
  return(
    <p>
      {name} {exerciseCount} 
    </p>
  )
}

const Content = ({ course }) => {
  return(
    <div>
      {course.parts.map(part => 
        <Part key={part.id} name={part.name} exerciseCount={part.exercises}/>
      )}
    </div>
  )
}

const Total = ({ course }) => {
  return (
    <h3>total of exercises {
        course.parts.reduce(
          (acc, currentPart) => acc + currentPart.exercises, 0 )
      } 
    </h3>
  )
}

const Course = ({ course }) => {
  return(
    <>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </>
  )
}

export default Course 