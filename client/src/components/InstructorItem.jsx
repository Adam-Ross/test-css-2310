const InstructorItem = ({elem, getSingleInstructor}) => {

    const handleClick = (e) => {
        getSingleInstructor(e.currentTarget.id)
    }

    return <div className="card" id={elem.instructorid} onClick={handleClick}>
        <h1>{elem.name}</h1>
        <h4>{elem.areaofexpertise}</h4>
    </div>
}

export default InstructorItem