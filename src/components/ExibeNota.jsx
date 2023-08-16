function ExibeNota(props)
{

    function ExibeNota() 
    {
        alert( "Sua média geral foi: " + props.nota)
    }
    return(
    <div>
      <h1>{props.mensagem}</h1>
      <button onClick={ExibeNota}>Veja sua Nota</button>
    </div>
    )
}

export default ExibeNota;