import {addTask} from "./request.js"

/**
 * Creation of a task
 *
 * @param {listElement} listDetails list
 * @return {item} the task item 
 */
export const initList = (listElement) => {

  const addItem = (label) => {
    //asynchronous request 
    addTask(label, 'http://localhost/workspace/ptut/handler/processAddTask.php')
    const item = makeItem(label)

    listElement.prepend(item)

    
  }

  return {addItem}
}


const makeItem = (label) => {
  const element = createItemElement(label)

  const input = element.querySelector("input")
  const button = element.querySelector("button")
  const link = element.querySelector("a")

  const init = () => {
    button.addEventListener("click", destroy)
    /*link.addEventListener("click", open)*/
  }

  const destroy = () => {
    element.remove()
    link.removeEventListener("click", open)
    button.removeEventListener("click", destroy)
  }

/*
const open = () => {
  const sideBar = document.querySelector(".edit")
  sideBar.classList.add("open-link")
}
*/

  init()

  return element
}

const createItemElement = (itemLabel) => {
  const item = document.createElement("li")

  item.classList.add("nav-box", "flex-item", "item-size", "space-between")

  const div = document.createElement("div")
  div.classList.add("flex-item")

  const input = document.createElement("input")
  input.type = "radio"
  input.classList.add("radio-size", "radio")

  const label = document.createElement("label")
  label.for = "radio"

  const link = document.createElement("a")
  link.classList.add("open-link")
  link.append(itemLabel)

  const button = document.createElement("button")
  button.type = "button"
  button.classList.add("delete-task")

  const img = document.createElement("img")
  img.classList.add("delete")
  img.setAttribute("src", "../assets/delete.svg")


  label.append(link)
  div.append(input, label)
  button.append(img)
  item.append(div, button)

  return item
}



