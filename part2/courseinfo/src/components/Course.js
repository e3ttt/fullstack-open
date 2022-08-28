const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      {course.parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <p>
        <b>
          total of {course.parts.reduce((p, c) => p + c.exercises, 0)} exercises
        </b>
      </p>
    </div>
  );
};

export default Course;
