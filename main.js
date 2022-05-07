const house = ['Gryffindor', 'Hufflepuff', 'Slytherin', 'Ravenclaw']
const randomHouse = house[Math.floor(Math.random() * house.length)]
const students = [
  {
    id: 1,
    name: 'Harry Potter',
    house: 'Gryffindor',
    expel: false,
    image: "https://www.irishtimes.com/polopoly_fs/1.3170107.1501253408!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg"
  },
  {
    id: 2,
    name: 'Hermoine Granger',
    house: 'Hufflepuff',
    expel: false,
  },
  {
    id: 3,
    name: 'Ron Weasley',
    house: 'Gryffindor',
    expel: false,
    image: "https://upload.wikimedia.org/wikipedia/en/5/5e/Ron_Weasley_poster.jpg"
  },
  {
    id: 4,
    name: 'Draco Malfoy',
    house: 'Slytherin',
    expel: true,
  }
]
const expelledStudents = []

console.log(students)

//Utility functions
const renderToDom = (divId, textToRender) => {
  const selectedElement = document.querySelector(divId);
  selectedElement.innerHTML = textToRender;
}

// Hat Card
const hatCard = () => {
  const domString = `
  <div class="card mb-3">
  <div class="card-body">
    <h5 class="card-title">Welcome to the Sorting Hat</h5>
    <p class="card-text">Select "Add New Student" to add student and assign them to a house. Use the Search bar to search for students.</p>
    <div id='addStudentBtn'> 

    </div>
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="searchInput" placeholder="Search">
      <label for="searchInput">Search</label>
    </div>
  </div>
</div>
  `
  renderToDom('#hatCard', domString)
}

// New Student Modal
const newStudent = () => {
  const domString = `
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#addStudent">
  Add New Student
  </button>
  <!-- Modal -->
  <div class="modal fade" id="addStudent" tabindex="-1" aria-labelledby="addStudent" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen-md-down">
      <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title">Add New Student</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </button>
      </div>
      <div class="modal-body" id="modal-body">
      <form>
        <div class="form-floating mb-3">
          <input class="form-control form-control-lg" type="text" placeholder="Student Name" id="name" aria-label="name" required>
          <label for="name">Student Name</label>
        </div>
    
        <div class="form-floating mb-3">
          <select class="form-select form-control-lg" id="expel" aria-label="type" required>
          <option value="">Is this student expelled?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label for="expel">Expelled?</label>
        </div>

        <div class="form-floating mb-3">
          <input class="form-control form-control-lg" type="text" placeholder="Student Photo" id="studentPhoto" aria-label="studentPhoto" required>
          <label for="image">Student Photo</label>
        </div>
        <button type="submit" class="btn btn-success" data-dismiss="modal">Submit</button>
      </form>
      </div>
    </div>
  </div>

  `

  renderToDom('#addStudentBtn', domString)
}


const studentCards = (array) => {
  let domString = '';
  if (array.length >= 1) {
    for (const item of array) {
      domString += `
      <div class="card studentcard" style="width: 18rem;">
    <img src="${item.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <p class="card-text">${item.house}</p>
      <a href="#" class="btn btn-danger" id="expel--${item.id}">Expel</a>
    </div>
  </div>
      `
    renderToDom('#cardContainer', domString)
    }
  } else {
    renderToDom('#cardContainer', domString)
  }
}

const expelledCards = (array) => {
  let domString = ''
  if (array.length >= 1) {
    for (const item of array) {
      domString += `
      <div class="card studentcard" style="width: 18rem;">
    <img src="${item.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <p class="card-text">${item.house}</p>
      <a href="#" class="btn btn-success" id="admit--${item.id}">Re-Admit</a>
    </div>
  </div>
      `
      renderToDom('#expelledStudentContainer', domString)
    }
  } else {
    renderToDom('#expelledStudentContainer', domString)
  }
}

const buttonRow = () => {
  const domString = `
    <div class="btn-group" id = "btns" role="group" aria-label="Basic outlined example">
      <button type="button" class="btn btn-outline-primary studentfilter" id="gryffindor-btn">Gryffindor</button>
      <button type="button" class="btn btn-outline-primary studentfilter" id="hufflepuff-btn">Hufflepuff</button>
      <button type="button" class="btn btn-outline-primary studentfilter" id="ravenclaw-btn">Ravenclaw</button>
      <button type="button" class="btn btn-outline-primary studentfilter" id="slytherin-btn">Slytherin</button>
      <button type="button" class="btn btn-outline-primary studentfilter" id="all-btn">All Students</button>
    </div>
  `
  renderToDom('#filterButtons', domString)
}

const eventListeners = () => {
  const formModal = new bootstrap.Modal(document.querySelector('#addStudent'))
  document.querySelector('#filterButtons').addEventListener('click', (e) => {
    if (e.target.id === "all-btn") {
      studentCards(students);
    } else if (e.target.id === "gryffindor-btn") {
      const gryffindorFilter = students.filter(item => item.house === "Gryffindor")
      studentCards(gryffindorFilter);
    } else if (e.target.id === "hufflepuff-btn") {
      const hufflepuffFilter = students.filter(item => item.house === "Hufflepuff")
      studentCards(hufflepuffFilter);
    } else if (e.target.id === "ravenclaw-btn") {
      const ravenclawFilter = students.filter(item => item.house === "Ravenclaw")
      studentCards(ravenclawFilter);
    } else if (e.target.id === "slytherin-btn") {
      const slytherinFilter = students.filter (item => item.house === "Slytherin")
      studentCards(slytherinFilter)
    } 
  })

  const form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const addedStudent = {
      id: students.length + 1,
      name: document.querySelector('#name').value,
      house: randomHouse,
      expel: document.querySelector('#expel').value,
      image: document.querySelector('#studentPhoto').value,
    }
    students.push(addedStudent)
    studentCards(students)
    form.reset();
    formModal.hide();
    console.log(students)
  })

  const search = document.querySelector('#searchInput')
  search.addEventListener('keyup', (e) => {
    const userInput = e.target.value.toLowerCase();
    const searchResult = students.filter(item =>
    item.name.toLowerCase().includes(userInput)
  )
  studentCards(searchResult)
  })

  const expel = document.querySelector('#cardContainer')
  expel.addEventListener('click', (e) => {
    if (e.target.id) {
      const [method, id] = e.target.id.split("--");
      const index = students.findIndex((studentIndex => studentIndex.id === Number(id)))

        if (e.target.id.includes('expel')) {
          expelledStudents.push(...students.splice(index, 1))
          studentCards(students)
          expelledCards(expelledStudents)
          } 
        }
      })


    const admit = document.querySelector('#expelledStudentContainer')
    admit.addEventListener('click', (e) => {
      if (e.target.id) {
        const [method, id] = e.target.id.split("--")
        const index = expelledStudents.findIndex((expelledStudentsIndex => expelledStudentsIndex.id === Number (id)))

          if (e.target.id.includes('admit')) {
            students.push(...expelledStudents.splice(index, 1))
            expelledCards(expelledStudents)
            studentCards(students)
          }
        }

      })
      
  }

const startApp = () => {
  hatCard();
  buttonRow();
  studentCards(students);
  expelledCards(expelledStudents);
  newStudent();
  eventListeners();
}

startApp();
