import { useState } from 'react';
import { Form, Button, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/userData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/Register/Register.css';

function Register({ history }) {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({
        name: null,
        lastName: null,
        gender: null,
        phoneNumber: '',
        email: "",
        password: "",
        repeatPassword: "",
        client: ""
    });

    const handleChanges = (e) => {
        e.preventDefault();
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleSubmitReg = (e) => {
        e.preventDefault();
        setLoading(true);
        registerUser(userData)
            .then(res => {
                if (!res.error) {
                    history.push('/auth/login')
                } else {
                    setLoading(false);
                    setError(res.error);
                    setAlertShow(true);
                }
            }).catch(err => console.error('error from register: ', err))
    }

    return (
        <>
            <SimpleSider />
            <div className="container auth-form">
                <h1 className="auth-heading">Cadastrar-se</h1>
                <Form className="col-lg-8" onSubmit={handleSubmitReg}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                {error}
                            </p>
                        </Alert>
                    }
                    <Form.Row>
                        <Form.Group controlId="forName" className="col-lg-8">
                            <Form.Label>Nome *</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Ivan Ivanov" onChange={handleChanges} required />
                            <Form.Text muted>
                                O nome pode ser real ou um username.
                            </Form.Text>
                        </Form.Group>
                        {/* <Form.Group controlId="forLastName" className="col-lg-4">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" placeholder="Ivanov" onChange={handleChanges} />
                        </Form.Group> */}
                        <Form.Group as={Col} controlId="formGridGender" className="col-lg-4">
                            <Form.Label>Genêro</Form.Label>
                            <Form.Control as="select" defaultValue="not specified" name="gender" onChange={handleChanges}>
                                <option>masculino</option>
                                <option>feminino</option>
                                <option>prefiro não dizer</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-12">
                            <Form.Label>Número de celular *</Form.Label>
                            <Form.Control type="text" name="phoneNumber" placeholder="+35 98 88888-8888" onChange={handleChanges} required />
                            {/*<Form.Text muted>
                                Phone Number should be a valid BG number.
                    </Form.Text>*/}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formBasicEmail" className="col-lg-12">
                            <Form.Label>Email *</Form.Label>
                            <Form.Control type="email" name="email" placeholder="ivan@abv.bg" onChange={handleChanges} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formBasicPassword" className="col-lg-6">
                            <Form.Label>Senha *</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChanges} required />
                            <Form.Text muted>
                                Sua senha precisa ter mais de 8 caracteres.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="col-lg-6">
                            <Form.Label>Digite sua senha novamente *</Form.Label>
                            <Form.Control type="password" name="repeatPassword" placeholder="Repita a senha" onChange={handleChanges} required />
                        </Form.Group>
                    </Form.Row>
                    
                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Aguarde, por favor... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Cadastrar-se</Button>
                    }

                    <p className="bottom-msg-paragraph">Já tem uma conta? <Link to="/auth/login">Login</Link>!</p>
                </Form>
            </div>
        </>
    )
}

export default Register;