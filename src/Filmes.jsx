import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, json } from 'react-router-dom';

function Filmes() {

    const[ titulo, setTitulo] = useState( "" );
    const[ descricao, setDescricao ] = useState( "" );
    const[ ano, setAno] = useState( "" );
    const[ duracao, setDuracao] = useState( "" );
    const[ categoria, setCategoria] = useState( "" );
    const[ imagem, setImagem] = useState( "" );
    const[ erro, setErro] = useState( "" );
    const[ enviar, setEnviar] = useState( "" );


    function Enviar(evento) {

        evento.preventDefault()
        fetch( process.env.REACT_APP_BACKEND + "filmes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                titulo: titulo,
                descricao: descricao,
                ano: ano,
                duracao: duracao,
                categoria: categoria,
                imagem: imagem
            }
        )
    } )
    .then( (resposta) => resposta.json())
    .then( ( json ) => { 
        if( json._id ){
            setEnviar( true );
            setErro( false )
        } else {
            setErro( true );
            setEnviar ( false );
        }
    } ) 
    .catch( ( erro ) => { setErro(true)} )
    }

    useEffect( () => {

        setTitulo( "" );
        setDescricao( "" );
        setAno( "" );
        setDuracao( "" );
        setCategoria( "" );
        setImagem( "" );
        

    }, [enviar] );

  return (
    <Container component="section" maxWidth="xs">
        <Box sx={{ mt: 10, backgroundColor: "#C2C2C2", padding: "50px", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center"}}> 
            <Typography component="h1" variant='h5'>Filmes</Typography>
            { erro && ( <Alert severity="warning" sx={{ mt: 2 , mb: 2 }}>Desculpe, tente novamente!</Alert>) }
            { enviar && ( <Alert severity="success" sx={{ mt: 2 , mb: 2 }}>Enviado!</Alert>) }
            <Box component="form" onSubmit={Enviar}>
                <TextField 
                    label="Título" 
                    variant="filled" 
                    type="text" 
                    margin="normal" 
                    value={titulo}
                    onChange={ (e) => setTitulo( e.target.value )}
                    fullWidth
                />
                <TextField 
                    label="Descrição" 
                    variant="filled" 
                    type="text" 
                    margin="normal" 
                    value={descricao}
                    onChange={ (e) => setDescricao( e.target.value )}
                    fullWidth
                />
                <TextField 
                    label="Ano" 
                    variant="filled" 
                    type="date" 
                    margin="normal" 
                    value={ano}
                    onChange={ (e) => setAno( e.target.value )}
                    fullWidth
                />
                <TextField 
                    label="Duração" 
                    variant="filled" 
                    type="text" 
                    margin="normal" 
                    value={duracao}
                    onChange={ (e) => setDuracao( e.target.value )}
                    fullWidth
                />
                <TextField 
                    label="Categoria" 
                    variant="filled" 
                    type="text" 
                    margin="normal" 
                    value={categoria}
                    onChange={ (e) => setCategoria( e.target.value )}
                    fullWidth
                />
                <TextField 
                    label="Insira o link da imagem" 
                    variant="filled" 
                    type="text" 
                    margin="normal" 
                    value={imagem}
                    onChange={ (e) => setImagem( e.target.value )}
                    fullWidth
                />
                <Button type="submit" variant="contained" fullWidth sx={ {mt: 2, mb: 2}}>Enviar</Button>
            </Box>
        </Box>
    </Container>
  )
}

export default Filmes;
