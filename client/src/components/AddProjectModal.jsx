import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { FaList } from "react-icons/fa"
import { ADD_PROJECT } from "../mutations/projectMutations"
import { GET_CLIENTS } from "../queries/clientQueries"
import { GET_PROJECTS } from "../queries/projectQueries"

export default function AddProjectModal() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [clientId, setClientId] = useState("")
  const [status, setStatus] = useState("new")

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    //   refetchQueries: [{ query: GET_PROJECTS }], or use update
    update(cache, { data: { addProject } }) {
      // read query from cache
      const { projects } = cache.readQuery({ query: GET_PROJECTS })
      //   write added item to cache
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      })
    },
  })

  //   Get clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS)

  const onSubmit = (e) => {
    e.preventDefault()
    if (name && description && clientId) {
      addProject(name, description, clientId, status)
      setName("")
      setDescription("")
    } else {
      return alert("Please fill in all fields")
    }
  }

  if (loading) return null
  if (error) return "something went wrong"
  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal">
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>Add Project </div>
            </div>
          </button>

          <div
            className="modal fade"
            id="addProjectModal"
            data-bs-backdrop="static"
            aria-labelledby="addClientModalLabel"
            aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addClientModalLabel">
                    New Project
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">status</label>
                      <select
                        className="form-select"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        className="form-select"
                        id="clientId"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}>
                        <option>Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
