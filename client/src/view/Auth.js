import Login from '../component/layout/auth/login'
import Register from '../component/layout/auth/register'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Redirect } from 'react-router-dom'

const Auth = ({ authRoute }) => {

    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)

    let body

    if (authLoading)
        return <Redirect to='/home' />
    else if (isAuthenticated) return <Redirect to='/manage-acount' />
    else
        body = (
            <>
                { authRoute === '/login' && <Login />}
                { authRoute === '/register' && <Register />}
            </>
        )

    return (
        <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
            <div className="container">
                <div className="card login-card">
                    <div className="row no-gutters">
                        <div className="col-md-5">
                            <img src="../images/login.jpg" alt="login" className="login-card-img" />
                        </div>
                        <div className="col-md-7">
                            <div className="card-body">
                                <div className="brand-wrapper">
                                    <img src="../images/logo.svg" alt="logo" className="logo" />
                                </div>
                                {body}
                                <nav className="login-card-footer-nav">
                                    <a href="#!">Terms of use.</a>
                                    <a href="#!">Privacy policy</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}
export default Auth