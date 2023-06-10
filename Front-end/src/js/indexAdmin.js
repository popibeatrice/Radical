import '../js/vreme';
import '../styles/header.css';
import '../styles/indexAdmin.css';
import '../styles/tailwind.css';
import axios from 'axios';
import editIcon from '../assets/edit.svg';
import biserica from '../assets/icons8-church.svg';
import castel from '../assets/icons8-castle.svg';
import fotbal from '../assets/icons8-stadium.svg';

const IsLogged = async () => {
  const token = localStorage.getItem('token');
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
      location.href = location.origin + '/login.html';
    }
  } catch (error) {
    location.href = location.origin + '/login.html';
  }
};
IsLogged();

const gridCont = document.querySelector('.grid-cont');

const RenderCard = (id, titlu, type) => {
  // ELEMENTE
  const card = document.createElement('div');
  const edit = document.createElement('a');
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
    'gap-2',
    'rounded-xl',
    'border',
    'border-zinc-400',
    'py-4',
    'px-4'
  );

  title.classList.add('font-title', 'text-lg', 'xxs:text-xl', 'md:text-2xl');
  title.textContent = titlu;

  icon.classList.add('w-14');
  if (type === 'religie') icon.src = biserica;
  else if (type === 'istorie') icon.src = castel;
  else icon.src = fotbal;

  edit.href = location.origin + '/admin/edit/?variable=' + id;
  edit.classList.add('w-10', 'h-10', 'bg-cover', 'bg-center');
  edit.style.backgroundImage = `url('${editIcon}')`;

  card.appendChild(icon);
  card.appendChild(title);
  card.appendChild(edit);
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
