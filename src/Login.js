import  { React, useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setusername] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log(email, username, password)
      await axios.post('http://localhost:3000/login', {
        password,
        username
      }, { withCredentials: false });
      console.log('asdasd')
      navigate('/home');
    } catch (err) {
      console.log(err)
      alert('Login fallido: ' + err.response?.data?.message || 'Error');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>Iniciar sesión</Typography>
      {/* <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} /> */}
      <TextField label="user" fullWidth margin="normal" value={username} onChange={e => setusername(e.target.value)} />
      <TextField label="Contraseña" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>Entrar</Button>
    </Container>
  );
}

export default Login;
