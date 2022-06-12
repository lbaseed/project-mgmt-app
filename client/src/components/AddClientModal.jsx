import { useState } from "react"
import { useMutation } from "@apollo/client"
import { FaUser } from "react-icons/fa"
import { ADD_CLIENT } from "../mutations/clientMutations"
import { GET_CLIENTS } from "../queries/clientQueries"

export default function AddClientModal() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

    const [addClient] = useMutation(ADD_CLIENT, {
      variables: { name, email, phone },
      update(cache, { data: { addClient } }) {
        const { clients } = cache.readQuery({ query: GET_CLIENTS })
        cache.writeQuery({
          query: GET_CLIENTS,
          data: { clients: [...clients, addClient] },
        })
      },
    })

  const onSubmit = (e) => {
    e.preventDefault()
    if (name && email && phone) {
        addClient(name, email, phone)
          setName("")
          setEmail("")
          setPhone("")
    } else {
      return alert("Please fill in all fields")
    }
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal">
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client </div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        tabindex="-1"
        data-bs-backdrop="static"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add CLient
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
                  <label className="form-label">email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">phone</label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                  />
                </div>
                <button className="btn btn-secondary" data-bs-dismiss="modal" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}