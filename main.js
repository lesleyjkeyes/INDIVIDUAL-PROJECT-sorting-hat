// const house = [
//   {
//     id: 1,
//     name: 'Gryffindor',
//   },
//   {
//     id: 2,
//     name: 'Hufflepuff'
//   },
//   {
//     id: 3,
//     name: 'Ravenclaw'
//   },
//   {
//     id: 4,
//     name: 'Slytherin'
//   }
// ]

const students = [
  {
    id: 1,
    name: 'Harry Potter',
    house: "Gryffindor",
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
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    <div class="form-floating mb-3">
    <input type="text" class="form-control" id="searchInput" placeholder="SEARCH">
    <label for="searchInput">Search</label>
    </div>
  </div>
</div>
  `
  renderToDom('#hatCard', domString)
}

const studentCards = (array) => {
  let domString = '';
  for (const item of array) {
    domString += `
    <div class="card" style="width: 18rem;">
  <img src="${item.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.name}</h5>
    <p class="card-text">${item.house}</p>
    <a href="#" class="btn btn-danger" id="expel">Expel</a>
  </div>
</div>
    `
  renderToDom('#cardContainer', domString)
  }
}

const buttonRow = () => {
  const domString = `
  <div class="btn-group" role="group" aria-label="Basic outlined example">
  <button type="button" class="btn btn-outline-primary" id="gryffindor-btn">Gryffindor</button>
  <button type="button" class="btn btn-outline-primary" id="hufflepuff-btn">Hufflepuff</button>
  <button type="button" class="btn btn-outline-primary" id="ravenclaw-btn">Ravenclaw</button>
  <button type="button" class="btn btn-outline-primary" id="slytherin-btn">Slytherin</button>
  <button type="button" class="btn btn-outline-primary" id="all-btn">All Students</button>
</div>
  `
  renderToDom('#filterButtons', domString)
}

const eventListeners = () => {
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
}

const startApp = () => {
  hatCard();
  buttonRow();
  studentCards(students);
  eventListeners()
}

startApp();
