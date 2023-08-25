import PropTypes from 'prop-types'
import Button from './Button'
/*
const Header = (props) => {
    return (
        <header>
            <h1>{props.title} Umer's Task Tracker</h1>
        </header>
    )
}
*/
// OR
const Header = ({title, onAddTaskClicked, showAddTask}) => {
    const onClick = () => {
        console.log('clicked')
        onAddTaskClicked();
    }
    return (
        <header className='header'>
            <h1 style={{color: 'red'}}>{title} Umer's Task Tracker</h1>
            <Button color={showAddTask ? "blue" : "green"} text={showAddTask ? "Hide" : "Add"} onClick={onClick}/>
            {/* <Button color="blue" text="Hello 1"/> */}
            {/* <Button color="red" text="Hello 2"/> */}
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
} 

// Header.defaultProps = {
//     title: "Default"
// }
export default Header
