import Header from './Header/Header.jsx'
import Content from './Content/Content.jsx'

const Course = ({ Course }) => {
    return (
        <div>
            <Header Course={Course} />
            <Content Parts={Course.parts} />
        </div>
    )
}

export default Course