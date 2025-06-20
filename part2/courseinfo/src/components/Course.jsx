const Course = ({ courses }) => {
  const Header = ({ course }) => {
    return (
      <>
        <h2>{course.name}</h2>
        <Content course={course} />
        <Total course={course} />
      </>
    );
  };

  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };

  const Total = ({ course }) => {
    const total = course.parts.reduce(
      (total, part) => total + part.exercises,
      0
    );
    return <h3>Total of {total} exercises</h3>;
  };

  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <Header key={course.id} course={course} />
      ))}
    </div>
  );
};

export default Course;
