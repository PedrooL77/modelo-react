import { Alert, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, json } from 'react-router-dom';


function Login() {

    const[ email, setEmail ] = useState( "" );
    const[ senha, setSenha ] = useState( "" );
    const[ lembrar, setLembrar ] = useState( false );
    const[ login, setLogin ] = useState( false );
    const[ erro, setErro ] = useState( false );
    const navigate = useNavigate();

    /*Se o login for correto o efeito colateral é de limpar os campos e enviar o usuário para outra página*/
    useEffect( () => {

        if(login){
            localStorage.setItem( "usuario" , JSON.stringify( {email: email} ) );
            setEmail( "" );
            setSenha( "" );
            navigate( "/" );
        }

    }, [login] );


function Autenticar( evento ) 
{
    evento.preventDefault();
    fetch( "http://10.139.75.32:8080/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                email: email,
                senha: senha
            }
        )
    } )
    /* Se a requisição acima der certo então(then), transforma a resposta em json e a partir do json o código verifica se(if) o login foi efetuado ou não*/
    .then( (resposta) => resposta.json())
    .then( ( json ) => { 
        if( json.film ){
            setLogin(true);
        } else{
            setErro(true);
        }
    } ) 
    .catch( ( erro ) => { setErro(true)} )

}

    return (
        
        <Container component="section" maxWidth="xs">
            <Box sx={{ mt: 10, backgroundColor: "#C2C2C2", padding: "50px", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center"}} >
                <Typography component="h1" variant='h5'>Entrar</Typography>
                { erro && ( <Alert severity="warning">Revise seus dados e tente novamente!</Alert>) }
                <Box component="form" onSubmit={Autenticar}>
                    <TextField 
                    label="Email" 
                    variant="filled" 
                    type="email" 
                    margin="normal" 
                    value={email}
                    onChange={ (e) => setEmail( e.target.value )}
                    fullWidth
                    {...erro && ("erro") } 
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
                    <FormControlLabel
                        control={ <Checkbox value={lembrar} name="lembrar" onChange={ (e) => setLembrar( !lembrar )} /> }
                        label="Lembrar-me"
                    />
                    <Button type="submit" variant="contained" fullWidth sx={ {mt: 2, mb: 2}}>Login</Button>
                    <Grid container>
                        <Grid item xs>
                            Esqueci a senha
                        </Grid>
                        <Grid item>
                            Cadastrar
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;
