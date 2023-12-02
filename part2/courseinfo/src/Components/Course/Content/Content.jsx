import Part from '../Part/Part.jsx'

const Content = ({ Parts }) => {

    return (
        <div>
            {
                Parts.map((part) => {
                    /* Rendering each part dynamically. */
                    return (
                        <Part
                            key={part.id}
                            Name={part.name}
                            Exercises={part.exercises}
                        />
                    )
                })
            }
        </div>
    )
}

export default Content