/*Custom Single select
Requires HTML with the following structure:

<section class="singleSelect" >
    <section class = "ssArea" id = "classSelectionArea">
        <span class="ssSelection" id = "classSelection"></span>
        <input type="text" name="" class = "ssInput" id="classInput">
    </section>
    <section class = "ssOptions hidden" id="classOptions">
        <ul class="ssOptionList"></ul>
    </section>
</section>
*/
class SingleSelectInput{
    constructor(name, optionList, inputAreaId, optionAreaId){
      this.name = name,
      this.optionList = optionList,
      this.area = document.querySelector(inputAreaId),
      this.optionArea = document.querySelector(optionAreaId),
      this.input = this.area.children.item(1),
      this.list = this.optionArea.children.item(0),
      this.selection = document.querySelector(`#${name}Selection`)
      self = this
    }
    init(){
      self.clearInput()
      self.widenFocusRange()
      self.addOptionsToList(self.optionList)
      self.createFocusEvents()
      self.createFilterEvent()
      self.createInteractionEvent()
    }
    clearInput(){
      self.input.value = ""
    }
    widenFocusRange(){
      self.area.addEventListener("click",self.focusInput)
    }
    focusInput(){
      self.input.focus()
    }
    addOptionsToList(options){
      options.forEach((x,i) => {
        let li = document.createElement("li")
        li.innerText = x
        li.id = `${self.name}Option${i}`
        if (i===0) li.classList.add("active")
        self.list.appendChild(li)
      })
    }
    createFocusEvents(){
      self.input.addEventListener("focus", self.toggleHidden)
      self.input.addEventListener("blur", self.toggleHidden)
    }
    toggleHidden(){
      const mySec = self.optionArea.classList
      if (document.activeElement === self.input) {
        mySec.remove("hidden") //If selecting input, displays it
      } else { //If selecting anything else
        window.addEventListener("click", function removeHidden(e){
          if(e.target.tagName !== "LI") mySec.add("hidden") //If selecting anything but LI, hides options
          this.removeEventListener('click', removeHidden, false) //Removes this event listener
        })
      }
    }
    createFilterEvent(){
      self.input.addEventListener("keyup", e => {
        const isHidden = self.optionArea.classList.contains("hidden")
        if (!e.key.match(/Arrow|Enter|Tab/) && !isHidden) self.filterOptions()
      })
    }
    filterOptions(){
      while (self.list.lastChild) {self.list.removeChild(self.list.lastChild)}
      const myList = self.optionList.filter(x => x.toLowerCase().includes(self.input.value.toLowerCase()))
      if(self.input.value !== "") {
        self.addOptionsToList(myList)
      } else {
        self.addOptionsToList(self.optionList)
      }
    }
    createInteractionEvent(){
      self.input.addEventListener("keydown", e => {
        const isHidden = self.optionArea.classList.contains("hidden")
        const numChildren = self.list.children.length
        if (!isHidden && numChildren > 0) self.interactionOptions(e.key)
      })
      self.list.addEventListener("click", e => {
        self.lockSelection(e.target.textContent)
      })
    }
    interactionOptions(key){
      const activeLi = self.list.querySelector(".active")
      const activeNum = Number(activeLi.id.replace(/[a-zA-Z]/g,""))
      switch(key){
        case "ArrowDown":
          activeLi.classList.remove("active")
          if (activeNum < self.list.children.length - 1) {self.list.querySelector(`#${self.name}Option${activeNum + 1}`).classList.add("active")}
          else {document.querySelector(`#${self.name}Option0`).classList.add("active")}
          break
        case "ArrowUp":
          activeLi.classList.remove("active")
          if (activeNum > 0 ) {self.list.querySelector(`#${self.name}Option${activeNum - 1}`).classList.add("active")}
          else {self.list.querySelector(`#${self.name}Option${self.list.children.length - 1}`).classList.add("active")}
          break
        case "Enter":
          self.lockSelection(activeLi.textContent)
          self.input.blur()
          break
        case "Tab":
          self.lockSelection(activeLi.textContent)
          //Set focus to next input
          break
      }
    }
    lockSelection(item){
      self.selection.innerText = item
      self.optionArea.classList.add("hidden")
      self.input.value = ""
      self.input.removeEventListener("focus", self.toggleHidden)
      self.input.removeEventListener("blur", self.toggleHidden)
      self.input.classList.add("optionSelected")
      self.input.addEventListener("keydown", function resetInput(e){
        if (e.key === "Backspace"){
          self.selection.innerText = ""
          self.input.classList.remove("optionSelected")
          while (self.list.lastChild) {self.list.removeChild(self.list.lastChild)}
          self.addOptionsToList(self.optionList)
          self.optionArea.classList.remove("hidden")
          self.createFocusEvents()
          this.removeEventListener('keydown', resetInput, false) //Removes this event listener
        } else e.preventDefault() 
      })
    }
  }


export { SingleSelectInput }