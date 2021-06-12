import Swal from "sweetalert2";

export const updateProgress = () => {
    const tasks = document.querySelectorAll("li.tarea");

    if (tasks.length) {
        const completedTasks = document.querySelectorAll("i.completo");

        const percentageNumber = Math.round((completedTasks.length / tasks.length) * 100);

        const percentage = document.querySelector("#percentage");

        percentage.style.width = percentageNumber + "%";

        if (percentageNumber == 100) {
            Swal.fire(
                'Proyecto completado!',
                'Felicitaciones, completaste el proyecto!',
                'success'
            )
        }
    }
}