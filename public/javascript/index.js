const handler = new APIHandler()

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', getAll);



  document.getElementById('fetch-one').addEventListener('click', getOne)

  document.getElementById('delete-one').addEventListener('click', deleteOne)




  //no he sido capaz de dejar todo el grueso del código fuera, no se bloqueaba el submit



  ///////////////////////////////// E D I T A R ////////////////////////////////////
  //no he sido capaz de dejar todo el grueso del código fuera, no se bloqueaba el submit
  document.getElementById('edit-character-form').addEventListener('submit', (e) => {

    e.preventDefault()
    const editBtn = document.querySelector('#edit-character-form button')


    const inputs = document.querySelectorAll('#edit-character-form input')

    const characterInfo = { name, occupation, weapon, cartoon }

    const name = inputs[1].value
    const occupation = inputs[2].value
    const weapon = inputs[3].value
    const cartoon = inputs[4].checked

    const ID = inputs[0].value

    const characterInfo = { name, occupation, weapon, cartoon }

    handler
      //aqui la "validacion" si pernite dejar los campos en blanco. he querido dejar las dos formas
      .editCharacter(ID, characterInfo)
      .then(() => {
        document.querySelector('#edit-character-form').reset()

        editBtn.classList.add('green')
        setTimeout(() => { editBtn.classList.remove('green'); }, 1000)
      })

      .catch(() => {
        editBtn.classList.add('red')
        setTimeout(() => { editBtn.classList.remove('red'); }, 1000)
      })
  })
})

//////////////////////////////// C R E A R ////////////////////////////////////
//no he sido capaz de dejar todo el grueso del código fuera, no se bloqueaba el submit
document.getElementById('new-character-form').addEventListener('submit', (e) => {

  e.preventDefault()

  const createBtn = document.querySelector('#new-character-form button')
  createBtn.classList.remove('green', 'red')

  const inputs = document.querySelectorAll('#new-character-form input')

  const name = inputs[0].value
  const occupation = inputs[1].value
  const weapon = inputs[2].value
  const cartoon = inputs[3].checked
  //esta "validación" no permite dejar campos en blnco
  const characterInfo = { name, occupation, weapon, cartoon }
  if (name.length !== 0 && occupation.length !== 0 && weapon.length !== 0) {
    handler

      .saveCharacter(characterInfo)
      .then(() => {
        document.querySelector('#new-character-form').reset()

        createBtn.classList.add('green')
        setTimeout(() => { createBtn.classList.remove('green'); }, 1000)
      })

      .catch(err => console.log(err))
  }
  else {
    createBtn.classList.add('red')
    setTimeout(() => { createBtn.classList.remove('red'); }, 1000)
  }
})


///////////////////////////////// D O M ///////////////////////////////////////
function cardFormer(elm) {
  let newCard = document.createElement("div")
  newCard.setAttribute('class', "character-info")
  let newName = document.createElement("div")
  newName.innerText = `NAME: ${elm.name}`
  let newOcc = document.createElement("div")
  newOcc.innerText = `OCCUPATION: ${elm.occupation}`
  let newCartoon = document.createElement("div")
  newCartoon.innerText = `CARTOON: ${elm.cartoon}`
  let newWeapon = document.createElement("div")
  newWeapon.innerText = `WEAPON: ${elm.weapon}`
  let newId = document.createElement("div")
  newId.innerText = `ID: ${elm.id}`



  const inputs = document.querySelectorAll('#edit-character-form input')

  let fieldId = inputs[0]
  let fieldName = inputs[1]
  let fieldOcc = inputs[2]
  let fieldWeapon = inputs[3]
  let fieldCartoon = inputs[4]

  fieldId.value = elm.id
  fieldName.value = elm.name
  fieldOcc.value = elm.occupation
  fieldWeapon.value = elm.weapon
  fieldCartoon.checked = elm.cartoon

  newCard.appendChild(newName)
  newCard.appendChild(newOcc)
  newCard.appendChild(newCartoon)
  newCard.appendChild(newWeapon)
  newCard.appendChild(newId)

  document.querySelector(".characters-container").appendChild(newCard)
}
function cardRemover() {
  let firstCard = document.querySelector(".character-info")
  firstCard.remove()
}

//////////////////////////// T O D O S /// U N O /// B O R R A R //////////////
function getAll() {
  handler
    .getAllCharacters()
    .then(bigList => {



      bigList.data.forEach(elm => {
        cardFormer(elm)


      })

    }
    )
    .catch(err => console.log(err))
  cardRemover()
}
function getOne() {

  let input = document.querySelector(".operation input[name='character-id']");
  id = input.value
  console.log(id)

  handler
    .getOneCharacter(id)
    .then(result => {

      cardFormer(result.data)
      cardRemover()
    })

}
function deleteOne() {

  let input = document.querySelector(".delete input[name='character-id-delete']");
  id = input.value


  handler
    .deleteCharacter(id)
    .then(() => {

      cardRemover()
    })

}



