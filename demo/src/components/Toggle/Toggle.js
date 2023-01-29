import './Toggle.css';


const Toggle = (props) => {
    const { title, setter, value} = props;

    return (
        <div>
            <p><b>{title}</b></p>
            <label className="switch">
            <input 
                title={title}
                type="checkbox"
                checked={value}
                onChange={() => setter(!value)} 
            />
            <span className="toggle"></span>
            </label>
        </div>
    );
}

export default Toggle;