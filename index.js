const input = document.getElementById('search');
const mainContainer = document.getElementById('main-container');
const select = document.getElementById('results');
const viewContainer = document.querySelector('.view');

let pageNumber = 1;
let resPerPage = 5;

async function getDataFromAPI() {
  const query = input.value;

  try {
    if (query.trim()) {
      const data = await fetch(
        `https://pixabay.com/api/?key=18304010-39ce6aa001c0f76e761359b98&q=${query}&image_type=photo&pretty=true&page=${pageNumber}&per_page=${select.value}`
      );
      const res = await data.json();
      const item = res.hits;
      createImg(item);
      console.log(item);
    } else {
      mainContainer.innerHTML = ``;
    }
  } catch (error) {
    console.log(error);
  }
}

function createImg(items) {
  mainContainer.innerHTML = ``;

  const header = document.createElement('div');
  header.classList.add('header');
  header.innerHTML = `
  

<div class="view">
  <p>View:</p>
  <i class="fas fa-bars active-color"></i>
  <i class="fas fa-th-large"></i>
</div>
  `;
  mainContainer.appendChild(header);

  const container = document.createElement('div');
  container.classList.add('images-container');
  mainContainer.appendChild(container);

  items.forEach((item) => {
    const imagesList = document.createElement('div');
    imagesList.classList.add('img-row');

    imagesList.innerHTML = `
    <a target="blank" href="${item.pageURL}"><img src="${
      item.largeImageURL
    }" loading="lazy" alt="Click for Full Size" class="img"/></a>
            

            <div class="img-info">
              <div class="user">
                <i class="fas fa-user"></i>
                <a target="blank" href="${`https://pixabay.com/users/${item.user}-${item.user_id}/`}">${
      item.user
    }</a>
              </div>
              <div class="likes">
                <i class="fas fa-thumbs-up"></i>
                <p>${item.likes}</p>
              </div>

              <div class="favorites">
                <i class="far fa-star"></i>
                <p>${item.favorites}</p>
              </div>

              <div class="comments">
                <i class="far fa-comment"></i>
                <p>${item.comments}</p>
              </div>
              </div>
              `;

    container.appendChild(imagesList);
  });

  const btn = document.createElement('div');
  btn.classList.add('pages');
  mainContainer.appendChild(btn);

  if (items.length > 0 || pageNumber > 1) {
    btn.innerHTML = `

    ${
      pageNumber > 1
        ? `<a href="#main-container" class="page-btn" onclick=prevPage()>Prev Page</a>`
        : ''
    }


    ${
      items.length > 0
        ? `<a href="#main-container" class="page-btn" onclick=nextPage()>Next Page</a>`
        : ''
    }

    
      `;
  }
}

async function nextPage() {
  pageNumber++;

  getDataFromAPI();
}

async function prevPage() {
  pageNumber--;

  getDataFromAPI();
}

// grid Functions

async function dataGrid() {
  const data = await fetch(
    `https://pixabay.com/api/?key=18304010-39ce6aa001c0f76e761359b98&q=${input.value}&image_type=photo&pretty=true&page=${pageNumber}&per_page=${select.value}`
  );
  const res = await data.json();
  const item = res.hits;

  createImgGrid(item);
}

function createImgGrid(items) {
  mainContainer.innerHTML = ``;

  const header = document.createElement('div');
  header.classList.add('header');
  header.innerHTML = `
  

<div class="view">
  <p>View:</p>
  <i class="fas fa-bars"></i>
  <i class="fas fa-th-large active-color"></i>
</div>
  `;
  mainContainer.appendChild(header);

  const container = document.createElement('div');
  container.className = 'image-grid active';
  mainContainer.appendChild(container);

  items.forEach((item) => {
    const imagesList = document.createElement('div');
    imagesList.classList.add('row-grid');

    imagesList.innerHTML = `
    <a target="blank" href="${item.pageURL}"><img src="${
      item.largeImageURL
    }" loading="lazy" alt="Click for Full Size" class="img"/></a>
            

            <div class="img-info">
              <div class="user">
                <i class="fas fa-user"></i>
                <a target="blank" href="${`https://pixabay.com/users/${item.user}-${item.user_id}/`}">${
      item.user
    }</a>
              </div>
              <div class="likes">
                <i class="fas fa-thumbs-up"></i>
                <p>${item.likes}</p>
              </div>

              <div class="favorites">
                <i class="far fa-star"></i>
                <p>${item.favorites}</p>
              </div>

              <div class="comments">
                <i class="far fa-comment"></i>
                <p>${item.comments}</p>
              </div>
              </div>
              `;

    container.appendChild(imagesList);
  });

  const btn = document.createElement('div');
  btn.classList.add('pages');
  mainContainer.appendChild(btn);

  if (items.length > 0 || pageNumber > 1) {
    btn.innerHTML = `

    ${
      pageNumber > 1
        ? `<a href="#main-container" class="page-btn" onclick=prevPageGrid()>Prev Page</a>`
        : ''
    }


    ${
      items.length > 0
        ? `<a href="#main-container" class="page-btn" onclick=nextPageGrid()>Next Page</a>`
        : ''
    }

    
      `;
  }
}

async function nextPageGrid() {
  pageNumber++;

  dataGrid();
}

async function prevPageGrid() {
  pageNumber--;

  dataGrid();
}

mainContainer.addEventListener('click', (e) => {
  if (e.target.closest('.fa-th-large')) {
    dataGrid();
  }
  if (e.target.closest('.fa-bars')) {
    getDataFromAPI();
  }
});

//  * Event Listeners

select.addEventListener('change', getDataFromAPI);
input.addEventListener('input', getDataFromAPI);
