import { ChangeEvent, useState, useEffect } from "react"

import TutorialDataService from '../../services/service'
import ITutorialData from "../../types/types"

type Props = {
  tutorial: ITutorialData,
  refreshList: () => void
}

const Tutorial = ({ tutorial, refreshList} : Props) => {
  const [currentTutorial, setCurretTutorial] = useState<ITutorialData>({
    key: null,
    title: '',
    description: '',
    published: false
  })

  const [message, setMessage] = useState('')

  useEffect(() => {
    const { key, title, description, published } = tutorial
    setCurretTutorial({
      key,
      title,
      description,
      published
    })
    setMessage('')
  }, [tutorial])

  const handleInputChange = (eve: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = eve.target
    setCurretTutorial((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleUpdatePublished = (status: boolean) => {
    if(currentTutorial.key) {
      TutorialDataService.update(currentTutorial.key, {
        published: status
      })
      .then(() => {
        setCurretTutorial((prevState) => ({
          ...prevState,
          published: status
        }))
        setMessage('The status was updated successfully')
      })
      .catch((e: Error) => {
        console.log(e)
      })
    }
  }

  const handleUpdateTutorial = () => {
    if(currentTutorial.key) {
      const { title, description } = currentTutorial
      const data = {
        title,
        description
      }

      TutorialDataService.update(currentTutorial.key, data)
      .then(() => {
        setMessage('The tutorial was updated successfully!')
      })
      .catch((e: Error) => console.log(e))
    }
  }

  const handleDeleteTutorial = () => {
    if(currentTutorial.key) {
      TutorialDataService.delete(currentTutorial.key)
      .then(() => {
        refreshList()
      })
      .catch((e: Error) => console.log(e))
    }
  }
  return (
    <div>
      <h4>Tutorial</h4>
      {currentTutorial ? (
        <div className="edit-form">
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                id="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => handleUpdatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => handleUpdatePublished(true)}
            >
              Publish
            </button>
          )}

          <button
            className="badge badge-danger mr-2"
            onClick={handleDeleteTutorial}
          >
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={handleUpdateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  )
}

export default Tutorial
