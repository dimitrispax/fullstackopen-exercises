import Header from './Header/Header.jsx'
import Content from './Content/Content.jsx'
import Total from './Total/Total.jsx'

const Course = ({ Course }) => {

    return (
        <div>
            <Header Course={Course} />
            <Content Parts={Course.parts} />
            <Total Parts={Course.parts} />
        </div>
    )
}

export default Course