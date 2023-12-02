const Total = ({ Parts }) => {

    /* Reduce function that calculates the sum of the exercises. */
    const total = Parts.reduce((sum, part) => {
        return sum + part.exercises;
    }, 0);

    return (
        <h4>Total of {total} exercises </h4>
    )
}

export default Total