import { useCallback, useEffect, useState } from 'react'

import TutorialDataService from '../../services/service'
import Tutorial from '../../components/Tutorial'
import ITutorialData from '../../types/types'

const TutorialList = () => {

  const [tutorials, setTutorials] = useState<ITutorialData[]>([])
  const [currentTutorial, setCurrentTutorial] = useState<ITutorialData | null>(null)
  const [currentIndex, setCurrentIndex] = useState(-1)

  const onDataChange = useCallback((items: any) => {
    let tutorials = new Array<ITutorialData>()

    items.forEach((item: any) => {
      const key = item.key
      const data = item.val()
      tutorials.push({
        key,
        title: data.title,
        description: data.description,
        published: data.published
      })
    })

    setTutorials(tutorials)
  }, [])

  useEffect(() => {
    TutorialDataService.getAll().on("value", onDataChange)
    return () => {
      TutorialDataService.getAll().off('value', onDataChange)
    }
  }, [onDataChange])

  const refreshList = () => {
    setCurrentIndex(-1)
    setCurrentTutorial(null)
  }
  
  const setActiveTutorial = (tutorial: ITutorialData, index: number) => {
    setCurrentTutorial(tutorial)
    setCurrentIndex(index)
  }

  const removeAllTutorials = () => {
    TutorialDataService.deleteAll()
    .then(() => {
      refreshList()
    })
    .catch((e: Error) => console.log(e))
  }

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Tutorials List</h4>

        <ul className="list-group">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " +
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <Tutorial
            tutorial={currentTutorial}
            refreshList={refreshList}
          />
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TutorialList
