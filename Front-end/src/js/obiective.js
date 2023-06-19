import '../styles/header.css';
import '../styles/obiective.css';
import '../styles/tailwind.css';
import './vreme';
import './header';

import axios from 'axios';

// EN SWITCH
const enSwitchs = document.querySelectorAll('.en-switch');

enSwitchs.forEach((enSwitch) => {
  enSwitch.addEventListener('click', () => {
    location.href = location.origin + '/en';
  });
});

// SLIDER POP
const body = document.body;
const html = document.querySelector('html');
const cardCont = document.querySelector('.grid-cont');
const slideUp = document.querySelector('.slide-up ');
const slideWrap = document.querySelector('.slide-wrap');
const slideTitle = document.querySelector('.slide-up .title');
const slideDescps = document.querySelectorAll('.slide-up .descp');
const galerie = document.querySelector('.galerie');

const religieBtn = document.querySelector('#religie');
const agrementBtn = document.querySelector('#agrement');
const istorieBtn = document.querySelector('#istorie');
const toateBtn = document.querySelector('#toate');

let map;
const markers = [];

const search = document.querySelector('#search');

function RemoveMarkers() {
  markers.forEach(function (marker) {
    marker.setMap(null);
  });
  markers.length = 0;
}
function AddMarker(position) {
  const marker = new google.maps.Marker({
    position: position,
    map: map,
  });
  markers.push(marker);
}
function ChangeMapCenter(center) {
  map.setCenter(center);
}
const MapInit = () => {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.7749, lng: -122.4194 }, // Set the center of the map to a specific location
    zoom: 12, // Set the initial zoom level
  });
};

const filterTodos = (term) => {
  Array.from(cardCont.children)
    .filter((card) => {
      return !card.childNodes[1].childNodes[0].textContent
        .toLowerCase()
        .includes(term);
    })
    .forEach((card) => {
      if (!card.classList.contains('ascuns')) card.classList.add('hidden');
    });

  Array.from(cardCont.children)
    .filter((card) => {
      return card.childNodes[1].childNodes[0].textContent
        .toLowerCase()
        .includes(term);
    })
    .forEach((card) => {
      if (!card.classList.contains('ascuns')) card.classList.remove('hidden');
    });
};

const GetExtra = async (id) => {
  const res = await axios.post('/sights/extra', {
    id,
  });
  return res.data.files;
};

const RenderCard = (title, descp, id, lat, lng, type) => {
  // COMPONENTE
  const card = document.createElement('div');
  const cardWrap = document.createElement('div');
  const cardInfo = document.createElement('div');
  const cardTitle = document.createElement('h2');
  const cardBtn = document.createElement('button');

  // CARD
  card.style.backgroundImage = `url('https://visitvaslui.fra1.digitaloceanspaces.com/${id}/cover.jpg')`;
  card.style.backgroundSize = 'cover';
  card.style.backgroundPosition = 'center';
  card.style.backgroundRepeat = 'no-repeat';

  card.classList.add(
    'group',
    'relative',
    'h-[500px]',
    'overflow-hidden',
    'rounded-md',
    'shadow-lg',
    'shadow-zinc-500'
  );

  if (type === 'religie') card.classList.add('religie');
  else if (type === 'agrement') card.classList.add('agrement');
  else card.classList.add('istorie');

  // CARD DARK WRAP
  cardWrap.classList.add(
    'absolute',
    'inset-0',
    'bg-black',
    'bg-opacity-10',
    'transition-all',
    'duration-1000',
    'group-hover:bg-opacity-60'
  );

  // CARD INFO CONTAINER
  cardInfo.classList.add(
    'absolute',
    'bottom-0',
    'left-0',
    'right-0',
    'mx-auto',
    'flex',
    'h-full',
    'w-[90%]',
    'flex-col',
    'items-center',
    'justify-center',
    'gap-4',
    'py-10',
    'text-white'
  );

  // TITLU
  cardTitle.classList.add(
    'max-w-[90%]',
    'text-center',
    'font-title',
    'text-3xl',
    'tracking-wider'
  );
  cardTitle.textContent = title;
  cardBtn.classList.add(
    'rounded-lg',
    'bg-green-500',
    'px-4',
    'py-2',
    'font-title',
    'font-bold',
    'tracking-wider',
    'transition-colors',
    'duration-300',
    'hover:bg-white',
    'hover:text-green-500'
  );
  // BUTON
  cardBtn.setAttribute('type', 'button');
  cardBtn.textContent = 'Descopera';
  cardBtn.addEventListener('click', async () => {
    AddMarker({ lat: lat, lng: lng });
    ChangeMapCenter({ lat: lat, lng: lng });
    const imgNames = await GetExtra(id);
    imgNames.forEach((name) => {
      const img = document.createElement('img');
      img.src = `https://visitvaslui.fra1.digitaloceanspaces.com/${name}`;
      img.classList.add(
        'h-[300px]',
        'w-full',
        'rounded-md',
        'object-cover',
        'object-center',
        'shadow-lg',
        'shadow-zinc-500',
        'xl:h-[400px]',
        'destroyer'
      );
      galerie.appendChild(img);
    });
    slideTitle.textContent = title;
    slideDescps.forEach((descriere) => {
      descriere.textContent = descp;
    });
    slideUp.classList.remove('h-0');
    slideUp.classList.add('h-[65vh]');
    slideUp.classList.add('pt-10', 'lg:pt-12');
    slideWrap.classList.remove('pointer-events-none');
    slideWrap.classList.add('bg-black', 'bg-opacity-80');
    html.style.overflowY = 'hidden';
    body.style.overflowY = 'hidden';
  });

  // INSERATE
  cardInfo.appendChild(cardTitle);
  cardInfo.appendChild(cardBtn);
  card.appendChild(cardWrap);
  card.appendChild(cardInfo);
  cardCont.appendChild(card);
};

const GetSights = async () => {
  try {
    const res = await axios.get('/sights/card');
    const sights = res.data.sights;
    sights.forEach((sight) => {
      const lat = parseFloat(sight.lat['$numberDecimal']);
      const lng = parseFloat(sight.lng['$numberDecimal']);
      RenderCard(sight.titleRo, sight.descpRo, sight._id, lat, lng, sight.type);
    });
  } catch (error) {
    console.log(error);
  }
};

GetSights();

MapInit();

//keyup event
search.addEventListener('keyup', () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});

slideWrap.addEventListener('click', () => {
  slideUp.classList.add('h-0');
  slideUp.classList.remove('h-[65vh]');
  slideWrap.classList.remove('bg-black', 'bg-opacity-80');
  slideUp.classList.remove('pt-10', 'lg:pt-12');
  slideWrap.classList.add('pointer-events-none');
  html.style.overflowY = '';
  body.style.overflowY = '';
  document.querySelectorAll('.destroyer').forEach((img) => {
    img.remove();
  });
  RemoveMarkers();
});

religieBtn.addEventListener('click', () => {
  const agrement = document.querySelectorAll('.agrement');
  const istorie = document.querySelectorAll('.istorie');
  const religie = document.querySelectorAll('.religie');
  agrement.forEach((card) => {
    card.classList.add('hidden', 'ascuns');
  });
  istorie.forEach((card) => {
    card.classList.add('hidden', 'ascuns');
  });
  religie.forEach((card) => {
    card.classList.remove('hidden', 'ascuns');
  });

  const term = search.value;
  if (term) filterTodos(term.trim().toLowerCase());

  religieBtn.classList.add('bg-green-500', 'text-white', 'border-0');
  religieBtn.classList.remove('bg-white', 'text-black', 'border-2');
  agrementBtn.classList.remove('bg-green-500', 'text-white', 'border-0');
  istorieBtn.classList.remove('bg-green-500', 'text-white', 'border-0');
  agrementBtn.classList.add('bg-white', 'text-black', 'border-2');
  istorieBtn.classList.add('bg-white', 'text-black', 'border-2');
  toateBtn.classList.remove('bg-green-500', 'text-white', 'border-0');
  toateBtn.classList.add('bg-white', 'text-black', 'border-2');
});

istorieBtn.addEventListener('click', () => {
  const agrement = document.querySelectorAll('.agrement');
  const istorie = document.querySelectorAll('.istorie');
  const religie = document.querySelectorAll('.religie');
  agrement.forEach((card) => {
    card.classList.add('hidden', 'ascuns');
  });
  religie.forEach((card) => {
    card.classList.add('hidden', 'ascuns');
  });
  istorie.forEach((card) => {
    card.classList.remove('hidden', 'ascuns');
  });

  const term = search.value;
  if (term) filterTodos(term.trim().toLowerCase());

  istorieBtn.classList.add('bg-green-500', 'text-white', 'border-0');
  istorieBtn.classList.remove('bg-white', 'text-black', 'border-2');
  agrementBtn.classList.remove('bg-green-500', 'text-white', 'border-0');
  religieBtn.classList.remove('bg-green-500', 'text-white', 'border-0');
  agrementBtn.classList.add('bg-white', 'text-black', 'border-2');
  religieBtn.classList.add('bg-white', 'text-black', 'border-2');
  toateBtn.classList.remove('bg-green-500', 'text-white', 'border-0');
  toateBtn.classList.add('bg-white', 'text-black', 'border-2');
});

agrementBtn.addEventListener('click', () => {
  const agrement = document.querySelectorAll('.agrement');
  const istorie = document.querySelectorAll('.istorie');
  const religie = document.querySelectorAll('.religie');
  religie.forEach((card) => {
    card.classList.add('hidden', 'ascuns');
  });
  istorie.forEach((card) => {
    card.classList.add('hidden', 'ascuns');
  });
  agrement.forEach((card) => {
    card.classList.remove('hidden', 'ascuns');
  });

  const term = search.value;
  if (term) filterTodos(term.trim().toLowerCase());

  agrementBtn.classList.add('bg-green-500', 'text-white', 'border-0');
  agrementBtn.classList.remove('bg-white', 'text-black', 'border-2');
  religieBtn.classList.remove('bg-green-500', 'text-white', 'border-0');
  istorieBtn.classList.remove('bg-green-500', 'text-white', 'border-0');
  religieBtn.classList.add('bg-white', 'text-black', 'border-2');
  istorieBtn.classList.add('bg-white', 'text-black', 'border-2');
  toateBtn.classList.remove('bg-green-500', 'text-white', 'border-0');
  toateBtn.classList.add('bg-white', 'text-black', 'border-2');
});

toateBtn.addEventListener('click', () => {
  const agrement = document.querySelectorAll('.agrement');
  const istorie = document.querySelectorAll('.istorie');
  const religie = document.querySelectorAll('.religie');
  religie.forEach((card) => {
    card.classList.remove('hidden', 'ascuns');
  });
  istorie.forEach((card) => {
    card.classList.remove('hidden', 'ascuns');
  });
  agrement.forEach((card) => {
    card.classList.remove('hidden', 'ascuns');
  });

  const term = search.value;
  if (term) filterTodos(term.trim().toLowerCase());

  toateBtn.classList.add('bg-green-500', 'text-white', 'border-0');
  toateBtn.classList.remove('bg-white', 'text-black', 'border-2');
  agrementBtn.classList.remove('bg-green-500', 'text-white', 'border-0');
  istorieBtn.classList.remove('bg-green-500', 'text-white', 'border-0');
  agrementBtn.classList.add('bg-white', 'text-black', 'border-2');
  istorieBtn.classList.add('bg-white', 'text-black', 'border-2');
  religieBtn.classList.remove('bg-green-500', 'text-white', 'border-0');
  religieBtn.classList.add('bg-white', 'text-black', 'border-2');
});

window.onload = () => {
  search.value = null;
};
