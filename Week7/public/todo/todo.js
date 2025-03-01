/**
 * AJAX add new tasks to task list on save
 */
const doAddTask = async (e) => {
    e.preventDefault();

    const taskInput = document.getElementById('formInputTaskName');
    const task_name = taskInput.value;

    const statusSelect = document.getElementById('formSelectStatus');
    const options = statusSelect.options;
    const selectedIndex = statusSelect.selectedIndex;
    const status = options[selectedIndex].text;

    // validation checks
    if (!task_name) {
        alert('Please enter a task name.');
        return;
    }

    try {
        const task = { task_name, status };

        await tasksService.addTask(task);

        todo.addTask(task); // add task to list
        taskInput.value = ''; // clear form text input
    } catch (err) {
        console.log(err);
        alert('Unable to add task. Please try again later.');
    }
};
