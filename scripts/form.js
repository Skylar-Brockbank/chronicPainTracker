// const formArchetype = require('../resources/formValue.json')
import formArchetype from '/resources/formValue.js'


function makeMultipleChoice(
  {
    min,
    max,
    label,
    id
  }
){
  let container = document.createElement("div");
  let containerLabel = document.createElement('label')
  containerLabel.for=id;
  containerLabel.classList.add("containerLabel")
  containerLabel.innerText=label;
  container.appendChild(containerLabel)

  //add page break during development
  container.appendChild(document.createElement("br"))

  for(let i=min; i<=max;i++){
    let temp = document.createElement("input")
    let tempLabel = document.createElement("label")
    tempLabel.innerText=i
    temp.id=`${id}-${i}`
    temp.type="radio"
    temp.name=id
    temp.value=i
    tempLabel.appendChild(temp)
    container.appendChild(tempLabel)
  }
  return container;
}
function makeTrueFalse({label, id}){
  let container = document.createElement("div");
  let containerLabel = document.createElement("label");
  let box = document.createElement("input");
  box.type="checkbox"
  box.id=id
  box.name=id
  box.value="true"
  containerLabel.for=id
  containerLabel.innerHTML=label
  container.appendChild(containerLabel)
  
  container.appendChild(box)
  return(container)
}

function main(){
  let targetForm=document.getElementById("surveyContents")
  for(let x in formArchetype.formFields){
    let target = formArchetype.formFields[x];
    let field;
    console.log(target)
    if(target.type=="multiple-choice"){
      field = makeMultipleChoice(target)
    }else if(target.type=="true-false"){
      field = makeTrueFalse(target)
    }else{
      console.log("invalid type")
    }
    console.log(field.childNodes)
    targetForm.appendChild(field)

    //add page break during development
    targetForm.appendChild(document.createElement("br"))
  }
}
main()
