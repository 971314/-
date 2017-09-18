/**
 * Created by xiajing on 2016/8/15.
 */
import React from 'react';
import backImg  from '../../image/back.png'
const NavTitle = React.createClass({
    render(){
        return(
            <div>
                <nav className="navbar navInfo navbar-fixed-top">
                    <div className="titleBack initHeight"> <a href='close'><img src={backImg} /></a></div>
                    <div className="login-nav"> {this.props.name} </div>
                </nav>
            </div>
        )
    }
})
export default NavTitle