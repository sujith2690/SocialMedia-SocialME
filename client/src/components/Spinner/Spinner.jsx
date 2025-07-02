import React from 'react'
import './Spinner.css'

const Spinner = () => {
    return (
        <button className="loading-btn" disabled>
            <span className="spinner" />
        </button>
    )
}

export default Spinner