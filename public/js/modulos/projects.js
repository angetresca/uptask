import Swal from "sweetalert2";
import axios from "axios";

const btnDelete = document.querySelector("#delete-project");
if (btnDelete) {
    btnDelete.addEventListener("click", (ev) => {
        const projectUrl = ev.target.dataset.projectUrl;

        Swal.fire({
            title: '¿Deseas borrar este proyecto?',
            text: "¡Un proyecto eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: "No, cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                // Send request with axios
                const url = `${location.origin}/projects/${projectUrl}`;
                axios.delete(url, { params: {projectUrl} })
                    .then((response)=> {
                        Swal.fire(
                            'Eliminado!',
                            response.data,
                            'success'
                        )
                        setTimeout(() => {
                            window.location.href = "/"
                        }, 3000);
                    });
            }
            
        });
    });
}

export default btnDelete;