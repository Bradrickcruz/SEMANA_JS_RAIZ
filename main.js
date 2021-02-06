const { el, mount, text, setChildren } = redom; // from https://cdnjs.cloudflare.com/ajax/libs/redom/3.27.1/redom.min.js

const categoriesList = [
  { id: '001', label: 'Drama' },
  { id: '002', label: 'Nacional' },
  { id: '003', label: 'Documentário' },
  { id: '004', label: 'Suspense' },
  { id: '005', label: 'Terror' },
  { id: '006', label: 'Infantil' },
  { id: '007', label: 'Aventura' },
  { id: '008', label: 'Comédia' },
  { id: '009', label: 'Anime' },
];
const movies = [
  {
    title: 'Filme XPTO',
    img: 'https://picsum.photos/seed/movie1/300/150',
    categories: ['002', '003'],
  },
  {
    title: 'Filme XYZ',
    img: 'https://picsum.photos/seed/movie2/300/150',
    categories: ['006', '009'],
  },
  {
    title: 'Filme Raíz',
    img: 'https://picsum.photos/seed/movie3/300/150',
    categories: ['004', '005'],
  },
  {
    title: 'Filme A Bordo',
    img: 'https://picsum.photos/seed/movie4/300/150',
    categories: ['008', '009'],
  },
];

const categoriesListHTML = document.querySelector('#categoryListHTML');
const cardsContainer = document.querySelector('#cardsContainer');

setChildren(categoriesListHTML, categoriesList.map(optionComponent));
renderScreen();

document
  .querySelector('#formulario_filme')
  .addEventListener('submit', addMovie);

function getCategoryLabel(categoryId) {
  return categoriesList.find((categoryItem) => categoryItem.id === categoryId)
    .label;
}

function optionComponent(properties) {
  const { id, label } = properties;
  return el('option', { value: id }, text(label));
}

function cardComponent(properties) {
  const { title, img, categories } = properties;
  const categoriesLabels = categories.map(getCategoryLabel);

  return el('.card', [
    el('img.card-img-top', { src: img }),
    el('.card-body', [
      el('h3.card-title', text(title)),
      el(
        'p.card-text',
        categoriesLabels.map((category) =>
          el('a.badge.badge-secondary', { href: '#' }, text(category))
        )
      ),
    ]),
  ]);
}

function renderScreen() {
  setChildren(cardsContainer, movies.map(cardComponent));
}

function addMovie(event) {
  event.preventDefault();
  const { title, img, category } = event.target;
  const newMovie = {};

  newMovie.title = title.value;
  newMovie.img = img.value || `https://picsum.photos/seed/${title.value}/300/150`;
  newMovie.categories = [...category.selectedOptions].map((cat) => cat.value);
  movies.push(newMovie);
  renderScreen();
}
