import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Projects() {
  const [project, setProject] = useState([])
  const [filterVar, setFilter] = useState([])


  useEffect(() => {
    fetch("http://localhost:8080/projects")
      .then((res) => res.json())
      .then((projects) => setProject(projects))
      .catch((err) => console.log(err));
  }, []);

  //all , unaccepted, accepted, complete

  let handleAll= () => {
    setFilter(project)
  }

  let x = 0;

  let handleUnaccepted= () => {
    x = project.filter((e) => e.is_accepted === false)
     setFilter(x)
  }

  let handleAccepted= () => {
    x = project.filter((e) => e.is_accepted === true)
     setFilter(x)
  }

  let handleComplete= () => {
    x = project.filter((e) => e.is_completed === true)
     setFilter(x)
  }

  return (
    <div className="inventory">
      <h3> Bounties </h3>
      <button onClick={handleAll}> All </button>
      <button onClick={handleUnaccepted}> Unaccepted </button>
      <button onClick={handleAccepted}> Accepted </button>
      <button onClick={handleComplete}> Complete </button>
      <ul>
        {filterVar.map((i) => (<li id={i.id}> {i.name} {i.problem_statement}</li>))}
      </ul>
    </div>
  );
}

export default Projects;