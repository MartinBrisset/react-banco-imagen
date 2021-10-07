import Imagen from "./Imagen";

const ListaImagen = ({imgs}) => {
    return ( 

        <div className='col-12 p-5 row'>
            {imgs.map((img) => {
                return (
                    <Imagen 
                        key={img.id}
                        img={img}
                    />
                )
            })}

        </div>

     );
}
 
export default ListaImagen;