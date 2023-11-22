
async function fetchData() {
    const h1 = document.createElement('h1')
    h1.id = 'title'
    h1.textContent = 'Instructors'
    document.querySelector('#mainContainer').appendChild(h1)
    createAddButton()
    const res = await fetch('http://localhost:3000/api')
    const data = await res.json()
    createContainer()
    appendDivs(data)
}


function createAddButton() {
    const addBtn = document.createElement('div')
    addBtn.addEventListener('click', showCreateForm)
    addBtn.className = 'btn'
    addBtn.style.textAlign = 'center'
    addBtn.classList.add('default')
    addBtn.textContent = 'New'
    document.querySelector('#mainContainer').appendChild(addBtn)
}

function showCreateForm() {
    clear()
    const h1 = document.createElement('h1')
    h1.className = 'formTitle'
    h1.textContent = 'New Instructor'

    const form = document.createElement('form')
    form.id = 'createForm'
    form.style.display = 'flex'
    form.style.flexDirection = 'column'

    const name = document.createElement('input')
    name.type = 'text'
    name.className = 'inputField'
    name.value = 'Enter a name...'

    const areaofexpertise = document.createElement('input')
    areaofexpertise.type = 'text'
    areaofexpertise.className = 'inputField'
    areaofexpertise.value = 'Enter an area of expertise...'

    const age = document.createElement('input')
    age.className = 'inputField'
    age.type = 'text'
    age.value = 'Enter an age...'

    const submit = document.createElement('input')
    submit.type = 'submit'
    submit.value = 'Submit'

    submit.classList.add('btn')
    submit.classList.add('default')

    form.appendChild(name)
    form.appendChild(areaofexpertise)
    form.appendChild(age)
    form.appendChild(submit)

    form.addEventListener('submit', handleCreate)

    document.querySelector('#mainContainer').appendChild(h1)
    document.querySelector('#mainContainer').appendChild(form)
}

async function handleCreate(e) {
    e.preventDefault()

    const fields = e.target.childNodes

    const name = fields[0].value
    const areaofexpertise = fields[1].value
    const age = fields[2].value

    const options = {
        name,
        areaofexpertise,
        age
    }

    try {
        
    } catch (error) {
        
    }

    console.log(fields[0].value)
    console.log(e.target)
}

function createContainer() {
    const container = document.createElement('div')
    container.id = 'container'
    document.querySelector('#mainContainer').appendChild(container)
}

function appendDivs(arr) {
    if(arr.length < 1) {
        const h1 = document.createElement('h1')
        h1.textContent = 'No instructors left...'
        document.querySelector('#mainContainer').appendChild(h1)
    }
    const container = document.querySelector('#container')
    arr.forEach((elem) => {
        container.appendChild(createCard(elem))
    })
}


function createCard(obj) {
    const card = document.createElement('div')

    card.className = 'card'
    const h1 = document.createElement('h1')
    h1.id = obj.instructorid
    
    h1.textContent = obj.name
    addListenerToCard(h1)
    const p = document.createElement('p')
    p.textContent = obj.areaofexpertise
    card.appendChild(h1)
    card.appendChild(p)
    return card
}

function addListenerToCard(name) {
    name.addEventListener('click', getSingleInstructor)
}

async function getSingleInstructor(e) {
    const id = e.target.id
    const res = await fetch(`http://localhost:3000/api/${id}`)
    const data = await res.json()
    showSingleInstructor(data)
}

function showSingleInstructor(data) {

    const singleCard = document.createElement('div')

    const h1 = document.createElement('h1')
    // h1.dataset.age = data.age
    // h1.dataset.instructorid = data.instructorid
    
    h1.id = data.instructorid
    h1.textContent = data.name
    h1.style.fontSize = '3rem'
    const p = document.createElement('p')
    p.textContent = data.areaofexpertise

    const btnContainer = document.createElement('div')
    btnContainer.style.display = 'flex'

    const deleteBtn = document.createElement('div')

    deleteBtn.addEventListener('click', deleteInstructor)

    deleteBtn.classList.add('btn')
    deleteBtn.classList.add('danger')
    deleteBtn.textContent = 'Delete'

    const editBtn = document.createElement('div')
    editBtn.textContent = 'Edit'
    editBtn.dataset.age = data.age
    editBtn.dataset.instructorid = data.instructorid
    editBtn.addEventListener('click', editInstructor)
    editBtn.classList.add('btn')
    editBtn.classList.add('default')

    btnContainer.appendChild(deleteBtn)
    btnContainer.appendChild(editBtn)

    singleCard.appendChild(h1)
    singleCard.appendChild(p)
    singleCard.appendChild(btnContainer)
    document.querySelector('#mainContainer').innerHTML = ''
    document.querySelector('#mainContainer').appendChild(singleCard)
}

async function deleteInstructor(e) {
    
    const id = e.target.parentElement.parentElement.firstChild.id
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    }

    try {
        await fetch(`http://localhost:3000/api/${id}`, options)
        document.querySelector('#mainContainer').innerHTML = ''
        fetchData()

        
    } catch (error) {
        console.error(error.message)
        fetchData()
    }

}

function editInstructor(e) {

    const age = e.target.dataset.age
    const instructorid = e.target.dataset.instructorid

    // const instructorid = e.target.dataset.instructorid
    const nameText = e.target.parentElement.parentElement.firstChild.textContent
    const areatofexpertiseText = e.target.parentElement.parentElement.childNodes[1].textContent
    const form = document.createElement('form')
    form.dataset.age = age
    form.dataset.instructorid = instructorid
    form.id = 'editForm'
    const nameInput = document.createElement('input')
    nameInput.type = 'text'
    nameInput.className = 'inputField'

    nameInput.value = nameText
    const areaofexpertise = document.createElement('input')
    areaofexpertise.className = 'inputField'
    areaofexpertise.type = 'text'
    areaofexpertise.value = areatofexpertiseText
    areaofexpertise.classList.add('mBottom')
    const submitBtn = document.createElement('input')
    submitBtn.type = 'submit'
    submitBtn.classList.add('btn')
    submitBtn.classList.add('default')

    form.appendChild(nameInput)
    form.appendChild(areaofexpertise)
    form.appendChild(submitBtn)

    form.addEventListener('submit', handleEditInstructor)

    document.querySelector('#mainContainer').appendChild(form)
}

async function handleEditInstructor(e) {
    e.preventDefault()
    

    const data = {
        name: e.target.firstChild.value,
        areaofexpertise: e.target.childNodes[1].value,
        age: e.target.dataset.age
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const id = e.target.dataset.instructorid

    try {
        const response = await fetch(`http://localhost:3000/api/${id}`, options)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        document.querySelector('#mainContainer').innerHTML = ''
        fetchData()
    } catch (error) {
        clear()
        showError('Unable to update at this time...')
        console.error('Error:', error);
    }

}

function clear() {
    document.querySelector('#mainContainer').innerHTML = ''
}

function showError(text) {
    const div = document.createElement('div')
    div.className = 'error'
    div.textContent = text
    document.querySelector('#mainContainer').appendChild(div)
    
    setTimeout(() => {
        clear()
        fetchData()
    }, 1000);
}

fetchData()