import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';

function Cadastro() {

    const[ nome, setNome] = useState( "" );
    const[ email, setEmail ] = useState( "" );
    const[ telefone, setTelefone ] = useState( "" );
    const[ cpf, setCpf] = useState( "" );
    const[ senha, setSenha] = useState( "" );
    const[ cadastro, setCadastro] = useState( false );
    const[ erro, setErro ] = useState( false );

    function Cadastrar(evento) {

        evento.preventDefault()
        fetch( process.env.REACT_APP_BACKEND + "cadastro", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                nome: nome, 
                email: email,
                cpf: cpf,
                telefone: telefone,
                senha: senha
            }
        )
    } )
    .then( (resposta) => resposta.json())
    .then( ( json ) => { 
        if( json.cpf ){
            setCadastro( true );
            setErro( false )
        } else {
            setErro( true );
            setCadastro ( false );
        }
    } ) 
    .catch( ( erro ) => { setErro(true)} )
    }

    useEffect( () => {

        setNome( "" );
        setEmail( "" );
        setCpf( "" );
        setTelefone( "" );
        setSenha( "" );
        //setCadastro( false );
        

    }, [cadastro] );

  return (
    <Container component="section" maxWidth="xs">
        <Box sx={{ mt: 10, backgroundColor: "#C2C2C2", padding: "50px", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center"}}> 
            <Typography component="h1" variant='h5'>Cadastre-se</Typography>
            { erro && ( <Alert severity="warning" sx={{ mt: 2 , mb: 2 }}>Desculpe tente novamente!</Alert>) }
            { cadastro && ( <Alert severity="success" sx={{ mt: 2 , mb: 2 }}>Obrigado por se cadastrar!</Alert>) }
            <Box component="form" onSubmit={Cadastrar}>
                <TextField 
                label="Nome" 
                variant="filled" 
                type="name" 
                margin="normal"
                value={nome} 
                onChange={ (e) => setNome( e.target.value )}
                fullWidth 
                />
                <TextField 
                label="Email" 
                variant="filled"
                type="email" 
                margin="normal"
                value={email} 
                onChange={ (e) => setEmail( e.target.value )}
                fullWidth
                />
                <TextField 
                label="Telefone" 
                variant="filled"
                type="tel" 
                margin="normal" 
                value={telefone}
                onChange={ (e) => setTelefone( e.target.value )}
                fullWidth
                />
                <TextField 
                label="CPF" 
                variant="filled"
                type="number" 
                margin="normal"
                value={cpf} 
                onChange={ (e) => setCpf( e.target.value )}
                fullWidth
                />
                <TextField 
                label="Senha" 
                variant="filled"
                type="password" 
                margin="normal"
                value={senha}
                onChange={ (e) => setSenha( e.target.value )} 
                fullWidth
                />
                <Button type="submit" variant="contained" fullWidth sx={ {mt: 2, mb: 2}}>Cadastrar</Button>
            </Box>
        </Box>
    </Container>
  )
}

export default Cadastro;
