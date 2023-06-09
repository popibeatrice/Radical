import '../js/vreme';
import '../styles/header.css';
import '../styles/indexAdmin.css';
import '../styles/tailwind.css';
import axios from 'axios';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/icons8-delete.svg';
import biserica from '../assets/icons8-church.svg';
import castel from '../assets/icons8-castle.svg';
import fotbal from '../assets/icons8-stadium.svg';

const religieBtn = document.querySelector('#religie');
const agrementBtn = document.querySelector('#agrement');
const istorieBtn = document.querySelector('#istorie');
const toateBtn = document.querySelector('#toate');
const cardCont = document.querySelector('.grid-cont');
const search = document.querySelector('#search');

const token = localStorage.getItem('token');
const IsLogged = async () => {
  try {
    const res = await axios.post(
      '/admin',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status !== 200) {
      location.href = location.origin + '/admin/login';
    }
  } catch (error) {
    location.href = location.origin + '/admin/login';
  }
};
IsLogged();

const gridCont = document.querySelector('.grid-cont');

const filterTodos = (term) => {
  Array.from(cardCont.children)
    .filter((card) => {
      return !card.childNodes[1].textContent.toLowerCase().includes(term);
    })
    .forEach((card) => {
      if (!card.classList.contains('ascuns')) card.classList.add('hidden');
    });

  Array.from(cardCont.children)
    .filter((card) => {
      return card.childNodes[1].textContent.toLowerCase().includes(term);
    })
    .forEach((card) => {
      if (!card.classList.contains('ascuns')) card.classList.remove('hidden');
    });
};

const RenderCard = (id, titlu, type) => {
  // ELEMENTE
  const card = document.createElement('div');
  const edit = document.createElement('a');
  const deleteBtn = document.createElement('button');
  const wrap = document.createElement('div');
  const title = document.createElement('h2');
  const icon = document.createElement('img');

  // CLASE
  card.classList.add(
    'relative',
    'flex',
    'w-full',
    'max-w-4xl',
    'items-center',
    'justify-between',
    'gap-3',
    'rounded-xl',
    'border',
    'border-zinc-400',
    'py-4',
    'px-4'
  );

  if (type === 'religie') card.classList.add('religie');
  else if (type === 'agrement') card.classList.add('agrement');
  else card.classList.add('istorie');

  title.classList.add(
    'font-title',
    'xs:text-lg',
    'sm:text-xl',
    'md:text-2xl',
    'xs:text-center'
  );
  title.textContent = titlu;

  icon.classList.add('w-10', 'hidden', 'xs:block', 'sm:w-12');
  if (type === 'religie') icon.src = biserica;
  else if (type === 'istorie') icon.src = castel;
  else icon.src = fotbal;

  edit.href = location.origin + '/admin/edit/?variable=' + id;
  edit.classList.add(
    'w-8',
    'h-8',
    'bg-cover',
    'bg-center',
    'sm:w-10',
    'sm:h-10'
  );
  edit.style.backgroundImage = `url('${editIcon}')`;

  deleteBtn.classList.add(
    'w-8',
    'h-8',
    'bg-cover',
    'bg-center',
    'sm:w-10',
    'sm:h-10'
  );
  deleteBtn.style.backgroundImage = `url('${deleteIcon}')`;
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.addEventListener('click', async () => {
    try {
      await axios.post(
        `/admin/delete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      card.remove();
    } catch (error) {
      console.log(error);
    }
  });

  wrap.classList.add(
    'flex',
    'flex-col',
    'xs:flex-row',
    'items-center',
    'justify-center',
    'gap-3'
  );
  wrap.appendChild(deleteBtn);
  wrap.appendChild(edit);

  card.appendChild(icon);
  card.appendChild(title);
  card.appendChild(wrap);
  gridCont.appendChild(card);
};

const GetSights = async () => {
  try {
    const res = await axios.get('/sights/card');
    const sights = res.data.sights;
    sights.forEach((sight) => {
      RenderCard(sight._id, sight.titleRo, sight.type);
    });
  } catch (error) {
    console.log(error);
  }
};

GetSights();
// BURGUR
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
const html = document.querySelector('html');
const menuWrap = document.querySelector('#menu_wrap');
const logo = document.querySelector('#logo');
const header = document.querySelector('header');
const headerChild = document.querySelector('#header-child');

const body = document.body;
let lastScroll = 0;

menuBtn.addEventListener('click', () => {
  if (!menuOpen) {
    menuOpen = true;
    header.style.transitionProperty = 'none';
    body.classList.remove('scroll-up');
    menuBtn.classList.add('open');
    html.classList.add('overflow-y-hidden');
    menuWrap.classList.add('translate-x-[-100vw]');
    logo.classList.add('hidden');
    headerChild.classList.remove('justify-between');
    headerChild.classList.add('justify-end');
    headerChild.classList.remove('grid-cols-[1fr_50px]');
    headerChild.classList.add('grid-cols-1');
    header.classList.remove('left-0');
    header.classList.add('right-[5%]');
    header.classList.remove('w-screen');
  } else {
    menuOpen = false;
    if (window.pageYOffset > 0) body.classList.add('scroll-up');
    header.style.transitionProperty = 'all';
    header.classList.remove('resize-animation-stopper');
    menuBtn.classList.remove('open');
    menuWrap.classList.remove('translate-x-[-100vw]');
    html.classList.remove('overflow-y-hidden');
    logo.classList.remove('hidden');
    headerChild.classList.add('justify-between');
    headerChild.classList.remove('justify-end');
    headerChild.classList.add('grid-cols-[1fr_50px]');
    headerChild.classList.remove('grid-cols-1');
    header.classList.add('left-0');
    header.classList.remove('right-[5%]');
    header.classList.add('w-screen');
  }
});

let resizeTimer;
window.addEventListener('resize', () => {
  document.body.classList.add('resize-animation-stopper');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('resize-animation-stopper');
  }, 100);
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1280) {
    menuOpen = false;
    menuBtn.classList.remove('open');
    menuWrap.classList.remove('translate-x-[-100vw]');
    html.classList.remove('overflow-y-hidden');
    logo.classList.remove('hidden');
    headerChild.classList.add('justify-between');
    headerChild.classList.remove('justify-end');
    headerChild.classList.add('grid-cols-[1fr_50px]');
    headerChild.classList.remove('grid-cols-1');
    header.classList.add('left-0');
    header.classList.remove('right-[5%]');
    header.classList.add('w-screen');
  }
});

// SHOW / HIDE HEADER
window.addEventListener('scroll', () => {
  if (!body.classList.contains('resize-animation-stopper')) {
    const currentScroll = window.scrollY;
    if (currentScroll <= 0) {
      body.classList.remove('scroll-up');
      body.classList.remove('scroll-down');
      return;
    }

    if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
      body.classList.remove('scroll-up');
      body.classList.add('scroll-down');
    } else if (
      currentScroll < lastScroll &&
      body.classList.contains('scroll-down')
    ) {
      body.classList.remove('scroll-down');
      body.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
  }
});

if (window.scrollY > 0) {
  body.classList.add('scroll-up');
}
//keyup event
search.addEventListener('keyup', () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
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
