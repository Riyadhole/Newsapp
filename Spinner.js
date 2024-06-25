import React, { Component } from "react";
import spinner2 from './spinner2.gif';

export class Spinner extends Component{
    render(){
        return(
            <div className="text-center">
                <img className="my-3" width={45} height={45} src={spinner2} alt="spinner2.gif"/>
            </div>
        )
    }
}