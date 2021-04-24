import { Link } from 'react-router-dom'
import React from 'react';

function Navbars() {
    return (

        <div>

            <a href="#" className="js-colorlib-nav-toggle colorlib-nav-toggle"><i /></a>
            <aside id="colorlib-aside" role="complementary" className="js-fullheight text-center">
                <h1 id="colorlib-logo"><a href="index.html"><span className="img" style={{ backgroundImage: 'url(images/author.jpg)' }} />Trung Vi</a></h1>

                <nav id="colorlib-main-menu" role="navigation">
                    <ul>
                        <li className="colorlib-active">
                            <Link to='/home'> <a>Home</a></Link></li>
                        <li>
                            <Link to='/pictures'><a>My Photos</a></Link></li>
                        <li>
                            <Link to='/about'><a>About Me</a></Link></li>
                        <li>
                            <Link to='/services'> <a>My Services</a></Link></li>
                        <li>
                            <Link to='/blogs'><a>Blogs</a></Link></li>
                        <li>
                            <Link to='/contact'><a>Contact</a></Link></li>
                    </ul>
                </nav>
                <div className="colorlib-footer">
                    <div className="d-flex justify-content-center">
                        <form action="#" className="colorlib-subscribe-form">
                            <div className="form-group d-flex">
                                <div className="icon"><span className="icon-paper-plane" /></div>
                                <input type="text" className="form-control" placeholder="Enter Email Address" />
                            </div>
                        </form>
                    </div>
                </div>
            </aside>
        </div>
    )
}
export default Navbars;