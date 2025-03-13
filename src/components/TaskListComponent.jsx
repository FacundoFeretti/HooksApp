import { useDispatch, useSelector } from 'react-redux';
import {useForm} from '../hooks/useForm';

export const TaskListComponent = () => {

    const tareas = useSelector(state => state)
    const dispatch = useDispatch();

    const addTask = (event) => {
        event.preventDefault()
        if(tarea === '') return
        const nuevaTarea = {
            id: new Date().getTime(),
            name: tarea,
            finalizada: false
        }
        const action = {
            type: '[TASKS] Agregar Tarea',
            payload: nuevaTarea
        }
        resetForm()
        dispatch(action)
    };

    const endTask = (id) => {
        const action = {
            type: '[TASKS] Finalizar Tarea',
            payload: id
        }    
        dispatch(action)
    };

    const deleteTask = (id) => {
        const action = {
            type: '[TASKS] Eliminar Tarea',
            payload: id
        }    
        dispatch(action)        
    };

    const deleteAll = () => {
        const action = {
            type: '[TASKS] Borrar Tareas',
        }    
        dispatch(action)        
        
    }

    // Usa el customHook useForm para capturar el valor del input
    // Ese valor lo setea en el estado tarea y este es luego utilizado
    // En addTask() el cual crea la nueva tarea para el estado del reducer
    // Y setea en name el valor del estado tarea.
    const {tarea, onInputChange, resetForm} = useForm({tarea: ''})
    //State es el estado actual despues de las actualizaciones.
    //Dispatch es uan funcion que envia acciones al reducer para actualizar el estado.

    return (
        <>
            <form onSubmit={addTask}>
                <div className="mb-3">
                    <label htmlFor="tarea" className="form-label">Agrega una nueva tarea</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="tarea"
                    name="tarea" 
                    value={tarea}
                    onChange={onInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Agregar</button>
                <button type='button' onClick={() => deleteAll()} className="btn btn-danger m-2">Borrar Todas</button>
            </form>
            <hr />
            <ul className='list-group'>
                {
                    tareas.map(e => {
                        return (
                            <li
                                className='list-group-item d-flex justify-content-between align-items-center'
                                key={e.id}
                            >
                                <span>{e.name}</span>
                            <input 
                            type="checkbox" 
                            value={e.finalizada}
                            onChange={() => endTask(e.id)}
                            />
                            <button 
                            className="btn btn-danger"
                            onClick={() => deleteTask(e.id)}>
                                Eliminar
                            </button>                            
                            </li>                            
                        )
                    })
                }
            </ul>
        </>
    )
}
