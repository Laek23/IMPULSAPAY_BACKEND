import { useState, useRef } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Modal } from "react-bootstrap";
import Axios from "axios";

const PruebaPokemon  = () => {
    //Aqui para empezar a recibir los datos
    const [data, setData] = useState([]);
    //POKEMONES
    const lista_pokemon = [];
    //Busqueda de datos
    const getData = () => {
    Axios.get("http://127.0.0.1:8000/api/pokemon/")
        .then((response) => {
            setData(response.data);
            console.log(response.data);
            response.data.forEach(data => {
                data.id,
                data.numero_pokedex,
                data.nombre,
                data.tipos,
                data.altura,
                data.peso,
                data.hp,
                data.ataque,
                data.defensa,
                data.velocidad,
                data.movimientos,
                data.sprites
            });
        })
        .catch((error) => {
            alert ('error al obtener los datos: ' + error.mesage);
            setData([]);
        });
    };
    return (
        <div>
            <button onClick={getData}>Obtener datos</button>
                <table className="table">
                    <thead className="thead-dark">
                        <th scope="col">numero_pokedex</th>
                        <th scope="col">nombre</th>
                        <th scope="col">tipos</th>
                        <th scope="col">altura</th>
                        <th scope="col">peso</th>
                        <th scope="col">hp</th>
                        <th scope="col">ataque</th>
                        <th scope="col">defensa</th>
                        <th scope="col">velocidad</th>
                        <th scope="col">movimientos</th>
                        <th scope="col">sprites</th>
                    </thead>
                <tbody>
                    {
                        data.map(pokemon => (
                    <tr>
                        <td>{pokemon.id}</td>
                        <td>{pokemon.nombre}</td>
                        <td>{pokemon.tipos}</td>
                        <td>{pokemon.altura}</td>
                        <td>{pokemon.peso}</td>
                        <td>{pokemon.hp}</td>
                        <td>{pokemon.ataque}</td>
                        <td>{pokemon.defensa}</td>
                        <td>{pokemon.velocidad}</td>
                        <td>{pokemon.movimientos}</td>
                        <td><img src={pokemon.sprites.normal} /></td>

                    </tr>
                        ))
                    }
                </tbody>

                </table>        
        </div>
    );
}


export default PruebaPokemon