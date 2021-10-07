import { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import ListaImagen from "./components/ListaImagen";

function App() {

  const [busqueda, setBusqueda] = useState('')
  const [imagenes, setImagenes] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  useEffect(() => {
    
    const consultarApi = async () => {
      
      if (busqueda === '') {
        return
      }
  
      const imagenesPorPagina = 30
      const key = '23747442-e1ce3e26c0aa9a80a142d03ed'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`

      const resp = await fetch(url)
      const res = await resp.json()

      setImagenes(res.hits)

      const calculcarTotalPaginas = Math.ceil(res.totalHits / imagenesPorPagina)
      setTotalPaginas(calculcarTotalPaginas)

      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({ behavior: 'smooth' })

    }

    consultarApi()
    

  }, [busqueda, paginaActual])

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual -1
    if (nuevaPaginaActual === 0 ) {
      return
    }
    setPaginaActual(nuevaPaginaActual)
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual +1
    if (nuevaPaginaActual > totalPaginas) {
      return
    }
    setPaginaActual(nuevaPaginaActual)
  }

  return (
      <div className='container'>
        <div className='jumbotron'>
          <p className='lead text-center'>Buscador de imagenes</p>
          <Formulario 
            setBusqueda={setBusqueda}
          />

        </div>
        <div className='row justify-content-center'>
          <ListaImagen 
            imgs={imagenes}
          />
          { (paginaActual === 1) ? null : (
            <button
            type='button'
            className='btn btn-info mr-1'
            onClick={paginaAnterior}
            >
              &laquo; Anterior
            </button>
          )}

          { (paginaActual === totalPaginas) ? null : (
            <button
            type='button'
            className='btn btn-info'
            onClick={paginaSiguiente}
            >
              Siguiente &raquo;
            </button>
          )}
        </div>
      </div>
  );
}

export default App;
