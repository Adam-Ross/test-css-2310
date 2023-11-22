import { useState, useEffect } from 'react'
import Title from './components/Title'
import Instructors from './components/Instructors'
import SingleInstructor from './components/SingleInstructor'


import './App.css'

function App() {

  const [instructors, setInstructors] = useState([])
  const [singleInstructor, setSingleInstructor] = useState(null)
  
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api')
        const data = await res.json()
        console.log('hit')
        setInstructors(data)
      } catch (error) {
        console.error(error.message)
      }
    }

    getData()
  }, [])

  const getSingleInstructor = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/${id}`)
      const data = await res.json()
      setSingleInstructor(data)
      console.log(data)
      // setSingleInstructor(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className="mainContainer">
      {singleInstructor ? (
        <SingleInstructor singleInstructor={singleInstructor} />
      ) : (
        <>
          <Title />
          <Instructors instructors={instructors} getSingleInstructor={getSingleInstructor} />
        </>
      )}
    </div>
  )

  // if(singleInstructor) {
  //   return <SingleInstructor singleInstructor={singleInstructor} />
  // }

  // return (
  //   <div className="mainContainer">
  //     {singleInstructor && <SingleInstructor singleInstructor={singleInstructor}/>}

  //     {!singleInstructor && (
  //       <>
  //         <Title />
  //         <Instructors instructors={instructors}
  //         getSingleInstructor={getSingleInstructor}
  //         />
  //       </>
  //     )
      
  //     }
  //   </div>
  // )
}

export default App
