import {initItem} from './task.js'


/**
* initiates the addition of new tasks
*
* @param {HTMLUListElement} UListElement - task list
*
*/
const initTaskList = (UListElement, initItem) => {

	const button = UListElement.querySelector(".js-task-button");
	const input = UListElement.querySelector(".js-task-input");


	const init = () => {
		updateAddButtonStatus();
		input.addEventListener("change", updateAddButtonStatus);
		button.addEventListener("click", handleSubmit);
		input.addEventListener("keyup", handleSubmitKey);
	}


	const handleSubmit = async () => {
		const title = document.querySelector(".title-list");
		const id = title.id;
		const inputValue = escapeHtml(input.value);
		const data = {
			input: inputValue, 
			id: id
		};
		const response = await updateDB('http://localhost/workspace/ptut/handler/processAddTask.php', data);
		const response2 = await fetch('http://localhost/workspace/ptut/handler/processGetId.php');
		const data2 = await response2.json();
		// in this case we create the item
		const item = createItem(input.value);
		item.id=data2.dernierItem; // we add the id we retrieved to the item
		initItem(item);
		UListElement.prepend(item);
		input.value = "";
		input.focus();
	}

	const handleSubmitKey = (e) => {
		if(e.keyCode === 13)
			handleSubmit();
	}

	const updateAddButtonStatus = (e) => {
		button.disabled = (input.value.trim().length === 0);
	}


	/**
	*
	* escape special characters - equivalent to htmlspecialchar in php
	*
	* @param {string} text - unsafe text
	*/
	const escapeHtml = (text) => {
 		 return text
      		.replace(/&/g, "&amp;")
      		.replace(/</g, "&lt;")
      		.replace(/>/g, "&gt;")
      		.replace(/"/g, "&quot;")
      		.replace(/'/g, "&#039;");
	}


	/**
	*
	* create an item
	*
	* @param {string} inputValue - the string in the input
	*
	*/
	const createItem = (inputValue) => {
		const item = document.createElement("li");
		item.classList.add("task","nav-box", "flex-item", "item-size", "space-between");

		const div = document.createElement("div");
		div.classList.add("flex-item");

		const input = document.createElement("input");
		input.classList.add("radio-size", "radio");
		input.type = "checkbox";
		input.name = "checkbox";
		input.id="checkbox";

		const label = document.createElement("label");
		label.for="checkbox";

		const link = document.createElement("a");
		link.classList.add("open-link");
		link.textContent = escapeHtml(inputValue);

		label.append(link);

		div.append(input);
		div.append(label);

		const button = document.createElement("button");
		button.classList.add("delete-task");

		const img = document.createElement("img");
		img.classList.add("delete");
		img.src="./assets/delete.svg";

		button.append(img);

		item.append(div);
		item.append(button);

		return item;

	}

	
	/**
	* update the database 
	*
	* @param {string} url - the url of the php page
	* @param {string} data - the data we want to send
	*/
	const updateDB = async (url, data) => { 
		const options = {
			method : "POST",
			headers : {
				"Content-Type": "application/json;charset=utf-8"
			},
			body : JSON.stringify(data)
		}

		const response = await fetch(url, options);

		return response.status;
	}

	init()

}


const list = document.querySelector(".task-list");

initTaskList(list, initItem);








