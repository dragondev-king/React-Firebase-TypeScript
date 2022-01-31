
import { ChangeEvent, useState } from 'react'

import TutorialDataService  from '../../services/service'
import ITutorialData from '../../types/types'

const AddTutorial = () => {

  const [inputField, setInputField] = useState<ITutorialData>({
    title: '',
    description: '',
    published: false,
  })

  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target
    setInputField((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleAddClick = () => {
    const { title, description, published } = inputField
    const data = {
      title,
      description,
      published,
    }

    TutorialDataService.create(data)
    .then(() => {
      console.log('created new item successfully!')
      setSubmitted(true)
    })
    .catch((e: Error) => {
      console.log(e)
    })
  }

  const setInitial = () => {
    setInputField({
      title: '',
      description: '',
      published: false
    })
    setSubmitted(false)
  }

  return (
    <div className='submit-form'>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={setInitial}>
            Add
          </button>
      </div>
      ) : (
        <>
          <div className='form-group'>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={inputField.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className='form-group'>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={inputField.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <button onClick={handleAddClick} className="btn btn-success">
            Submit
          </button>
        </>
      )}
    </div>
  )
}

export default AddTutorial
