import InstructorItem from './InstructorItem'

const Instructors = ({instructors, getSingleInstructor}) => {
    return instructors.map((elem) => (
        <InstructorItem elem={elem} key={elem.instructorid}
        getSingleInstructor={getSingleInstructor}
        />
    ))
}

export default Instructors