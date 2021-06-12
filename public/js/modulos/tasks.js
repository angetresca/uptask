import axios from "axios";
import Swal from "sweetalert2";

const tasks = document.querySelector(".listado-pendientes");

if (tasks) {
    tasks.addEventListener("click", e => {
        const selected = e.target;
        if(selected.classList.contains("fa-check-circle")) {
            const taskID = selected.parentElement.parentElement.dataset.taskId;
            const url = `${location.origin}/tasks/${taskID}`
            axios.patch(url, {taskID})
                .then((response)=> {
                    if (response.status === 200) {
                        selected.classList.toggle("completo");
                    }
                })
        };

        if(selected.classList.contains("fa-trash")) {
            const taskHTML = selected.parentElement.parentElement;
            const taskID = taskHTML.dataset.taskId;
            
            Swal.fire({
                title: '¿Deseas borrar esta tarea?',
                text: "¡Una tarea eliminada no se puede recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar',
                cancelButtonText: "No, cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Send request with axios
                    const url = `${location.origin}/tasks/${taskID}`;
                    axios.delete(url, { params: {taskID} })
                        .then((response)=> {
                            Swal.fire(
                                'Eliminada!',
                                response.data,
                                'success'
                            )
                            taskHTML.remove()  
                        })
                        .catch(()=> {
                            Swal.fire({
                                icon: "error",
                                title: "Hubo un error",
                                text: "No se pudo eliminar la tarea."
                            });
                        });
                }
                
            });
        };
    });
}

export default tasks;