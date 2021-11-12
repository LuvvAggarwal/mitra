import React,{useState} from 'react'
import { Alert } from "react-bootstrap";

const AlertComp = (props) => {
    const [showAlert, setShowAlert] = useState(true)
    return (
        <>
            {showAlert && <Alert variant={props.config.variant} className="alert-custom" onClose={() => setShowAlert(false)} dismissible>
                <p>
                <strong className="pe-2"><span className={`feather-${props.config.icon}`}></span>{props.config.strongText}</strong>
                    {props.config.text}
                </p>
            </Alert>}
        </>
    )
}

export default AlertComp
