import React from 'react'
import Spinner from "react-spinkit"
import '../assets/styles/loading.css'
const Loading = () => {
    return (
        <div className ="sk-pacman">
          <Spinner name="pacman" color="red" overrideSpinnerClassName="abc" />
        </div>
    );
}

export default Loading;