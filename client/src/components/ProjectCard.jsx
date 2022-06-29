const ProjectCard = ({project}) => {
  return (
    <div className="col-md-6">
        <div className="card mb-3 shadow-sm">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{project.name}</h5>
                    <a className="btn btn-light" href={`/projects/${project.id}`}>View</a>
                </div>
                <p className="small">{project.status}</p>
            </div>
        </div>
        
    </div>
  )
}

export default ProjectCard