
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import AlertMessage from '../alertMessage'

const Login = () => {

    // context 
    const { loginUser } = useContext(AuthContext)

    // local state
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''

    })

    const [alert, setAlert] = useState(null)

    const { email, password } = loginForm

    const onChangeLoginForm = event => setLoginForm({
        ...loginForm,
        [event.target.name]: event.target.value
    })

    const login = async event => {
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if (loginData.success) {

            } else {
                setAlert({ type: 'danger', message: loginData.message })
                setTimeout(() => setAlert(null), 3000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <p className="login-card-description">Đăng nhập vào hệ thống.</p>
            <form id="login" className="input-group" onSubmit={login}>
                <AlertMessage info={alert} />

                <Form.Group>
                    <Form.Control
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>

                <button type="submit" className="btn btn-block login-btn mb-4">Đăng nhập</button>
            </form>
            <a href="#!" className="forgot-password-link">Quên mật khẩu?</a>
            <Link to='/register'>
                <p className="login-card-footer-text">Đăng ký tài khoản mới.</p>
            </Link>

        </>)

}
export default Login