import { legacy_createStore as createStore } from "redux";
// Estado inicial
const initialState = [
    { id: 1, name: 'Explicar Reducers', finalizada: false }
];

// Declaro el reducer (funcion que define los cambios a hacer en el estado global)
const taskReducer = (state = initialState, action = {}) => {

    switch(action.type){
        case '[TASKS] Agregar Tarea':
            return [...state, action.payload]
        case '[TASKS] Finalizar Tarea':
            return state.map(e => {
                if(e.id === action.payload){
                    return {
                        ...e,
                        finalizada: !e.finalizada
                    }
                } else return e
            })
        case '[TASKS] Eliminar Tarea':
            return state.filter(e => e.id !== action.payload)
        case '[TASKS] Borrar Tareas':
            return [];
        default: break;
                
    }

    return state

};

export const store = createStore(taskReducer);

