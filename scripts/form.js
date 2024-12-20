// const formArchetype = require('../resources/formValue.json')
import formArchetype from '/resources/formValue.js'

let formInputs=[]
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
    tempLabel.innerText=`  ${i}:`
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
    formInputs.push(target.id);
    if(target.type=="multiple-choice"){
      field = makeMultipleChoice(target)
    }else if(target.type=="true-false"){
      field = makeTrueFalse(target)
    }else{
      console.log("invalid type")
    }
    targetForm.appendChild(field)

    //add page break during development
    targetForm.appendChild(document.createElement("br"))
  }
}

const survey = document.getElementById('survey')
const subButton = document.getElementById("sub")


function saveData(data){
  const request = new Request(`http://67.183.205.250/sub`,{
    method:"POST",
    body:JSON.stringify(data),
    mode:'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  fetch(request)
}


survey.addEventListener("submit",(e)=>{
  e.preventDefault()
  let data={}
  formInputs.forEach(i=>{
    //this filters out checkboxes
    if(survey[i].value=="true"){
      data[i]=survey[i].checked;
    }else{
      if(survey[i].value){
        data[i]= survey[i].value;
      }else{
        data[i]=0
      }
    }

  })
  console.log(JSON.stringify(data))
  saveData(data)
})
main()

