import Swal from "sweetalert2";
import axios from "axios";

const btnDelete = document.querySelector("#delete-project");

btnDelete.addEventListener("click", () => {
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
          Swal.fire(
            'Eliminado!',
            'El proyecto fue eliminado correctamente',
            'success'
          )
        }
        setTimeout(() => {
            window.location.href = "/"
        }, 3000);
      })
});