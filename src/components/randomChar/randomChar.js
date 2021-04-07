import React, { useState, useEffect} from 'react';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import './randomChar.css';

function RandomChar() {
    const gotService = new GotService();

    const [char, setChar] = useState({});
    const [loading, changeLoading] = useState(true);
    const [error, changeError] = useState(false);

    useEffect(() => {
        updateCharacter();
        let timerId = setInterval(updateCharacter, 1500);
        return () => {
            clearInterval(timerId);
        }
    },[])

    function onCharLoaded(char) {
        setChar(char);
        changeLoading(false);
        changeError(false);
    } 

    function onError(err) {
        changeLoading(false);
        changeError(true);
    }

    function updateCharacter() {
        const id = Math.floor(Math.random()*140 + 25);

        gotService.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

        const content = !(loading || error) ? <View char={char}/> : null;        
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>

        );
}

RandomChar.defaultProps = {
    interval: 1500
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
        <h4>Random Character: {name}</h4>
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Gender </span>
                <span>{gender}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Born </span>
                <span>{born}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Died </span>
                <span>{died}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Culture </span>
                <span>{culture}</span>
            </li>
        </ul>
        </>
    )
}
export default RandomChar;