/**
 * @class TaskList
 * 
 * Creates a list of trasks and updates a list
 */

class ToDo {
    tasks = [];
    tasksService;

    constructor(tasksService) {
        this.tasksService = tasksService;
    }

    init() {
        this.render();
    }

    /**
     * Builds the list item.
     * Uses bootstrap classes with some custom overrides.
     * 
     * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
     * @example
     * <li class="list-group-item">
     *   <button class="btn btn-secondary" onclick="deleteTask(e, index)">X</button>
     *   <span>Task name</span>
     *   <span>pending</span>
     * <span>date create</span>
     * </li>
     */
    renderListRowItem = (task) => {
        const listGroupItem = document.createElement('li');
        listGroupItem.id = `task-${task.task_id}`;
        listGroupItem.classNam = 'list-group-item';

        const deleteBtn = document.createElement('button');
        const deleteBtnTxt = document.createTextNode('X');
        deleteBtn.id = 'delete-btn';
        deleteBtn.className = 'btn btn-secondary';
        deleteBtn.addEventListener('click', this._deleteEventHandler(task.task_id));
        deleteBtn.appendChild(deleteBtnTxt);

        const taskNameSpan = document.createElement('span');
        const taskName = document.createTextNode(task.task_name);
        taskNameSpan.appendChild(taskName);

        const taskStatusSpan = document.createElement('span');
        const taskStatus = document.createTextNode(task.status);
        taskStatusSpan.append(taskStatus);

        const taskDateSpan = document.createElement('span');
        const taskDate = document.createTextNode(task.created_date);
        taskDateSpan.append(taskDate);

        // add list item's details
        listGroupItem.append(deleteBtn);
        listGroupItem.append(taskNameSpan);
        listGroupItem.append(taskStatusSpan);
        listGroupItem.append(taskDateSpan);

        return listGroupItem;
    };

    /**
     * Assembles the list items then mounts them to a parent node,
     */
    renderList = () => {
        // get the "Loading..." text node from parent element
        const tasksDiv = document.getElementById('tasks');
        const loadingDiv = tasksDiv.childNodes[0];
        const fragment = document.createDocumentFragment();
        const ul = document.createElement('ul');
        ul.id = 'tasks-list';
        ul.className = 'list-group list-group-flush checked-list-box';

        this.tasks.map((task) => {
            const listGroupRowItem = this.renderListRowItem(task);

            // add entire list item
            ul.appendChild(listGroupRowItem);
        });

        fragment.appendChild(ul);
        tasksDiv.replaceChild(fragment, loadingDiv);
    };

    /**
     * Display a default message when a user has an empty list.
     */
    renderMsg = () => {
        const tasksDiv = document.getElementById('tasks');
        const loadingDiv = tasksDiv.childNodes[0];
        const listParent = document.getElementById('tasks-list');
        const msgDiv = this._createMsgElement('Create some new tasks!');

        if (tasksDiv) {
            tasksDiv.replaceChild(msgDiv, loadingDiv);
        } else {
            tasksDiv.replaceChild(msgDiv, listParent);
        }
    };

    /**
     * Event handler helper for adding a task to the DOM.
     * This relies on the pre-existing form's input values.
     * 
     * @param {Object} task - form's values as an object
     */
    addTask = (task) => {
        const task_id = this.tasks.length;
        const created_date = new Date().toISOString();
        const newTask = { ... task, task_id, created_date };
        const newTaskEl = this.renderListRowItem(newTask);
        const listParent = document.getElementById('tasks-list');

        this.tasks.push(newTask);

        if (listParent) {
            listParent.appendChild(newTaskEl);
        } else {
            this.renderList();
        }
    };

    /**
     * Event handler helper for deleting a task from the DOM.
     * This relies on a pre-existing in the list of tasks.
     * 
     * @param {number} taskId - id of the task to delete
     */
    _deleteEventHandler = (taskId) => async () => {
        this.tasks = this.tasks.filter((task) => task.task_id !== taskId);
        const task = document.getElementById(`task-${taskId}`);
        task.remove();

        try {
            const res = await this.tasksService.deleteTask(taskId);
            const index = this.tasks.map((task) => task.task_id).indexOf(taskId);
            this.tasks.splice(index, 1);

            if (res !== null) {
                alert('Task deleted successfully!');
            }

            if (!this.tasks.length) {
                this.renderMsg();
            }
        } catch (err) {
            console.log(err);
            alert('Unable to delete task. Please try again later');
        }
    };

    /**
    * Creates a message div block.
    * 
    * @param {string} msg - custom message to display
    */
    _createMsgElement = (msg) => {
        const msgDiv = document.createElement('div');
        const text = document.createTextNode(msg);
        msgDiv.id = 'user-message';
        msgDiv.className = 'center';
        msgDiv.appendChild(text);

        return msgDiv;
    };

    render = async () => {
        const tasks = await this.tasksService.getTasks();

        try {
            if (tasks.length) {
                this.tasks = tasks;
                this.renderList();
            } else {
                this.renderMsg();
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };
}

const todo = new ToDo(tasksService);
