import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useHistory } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import AlertMessage from '../alertMessage'
const Register = () => {

    // context 
    const { registerUser } = useContext(AuthContext)

    // Route 
    const hisory = useHistory()

    // local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''

    })

    const [alert, setAlert] = useState(null)

    const { username, email, password, confirmPassword } = registerForm

    const onChangeRegisterForm = event => setRegisterForm({
        ...registerForm,
        [event.target.name]: event.target.value
    })

    const register = async event => {
        event.preventDefault()
        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Password do not match' })
            setTimeout(() => setAlert(null), 3000)
            return
        }
        try {
            const registerData = await registerUser(registerForm)
            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message })
                setTimeout(() => setAlert(null), 3000)
            } else {
                hisory.push('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <p className="login-card-description">Đăng ký tài khoản người dùng.</p>
            <form id="login" className="input-group" onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='email'
                        placeholder='Email'
                        name='email'
                        required
                        value={email}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        required
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <button type="submit" className="btn btn-block login-btn mb-4">Đăng ký.</button>
            </form>
            <Link to='/login'>
                <p className="login-card-footer-text">Quay lại.</p>
            </Link>

        </>)
}
export default Register