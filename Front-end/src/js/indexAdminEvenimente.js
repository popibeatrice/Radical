import '../js/vreme';
import '../styles/header.css';
import '../styles/indexAdmin.css';
import '../styles/indexAdminEvenimente.css';
import '../styles/tailwind.css';
import axios from 'axios';
// BURGUR
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
const html = document.querySelector('html');
const menuWrap = document.querySelector('#menu_wrap');
const logo = document.querySelector('#logo');
const header = document.querySelector('header');
const headerChild = document.querySelector('#header-child');

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

const gridCont = document.querySelector('.grid-cont');

const RenderEvent = (id) => {
  const img = document.createElement('img');
  const wrap = document.createElement('div');
  const close = document.createElement('div');
  close.textContent = 'X';
  close.classList.add(
    'text-red-500',
    'absolute',
    'z-10',
    'w-10',
    'h-10',
    '-right-6',
    '-top-4',
    'text-4xl',
    'text-bold',
    'cursor-pointer'
  );
  close.addEventListener('click', async () => {
    try {
      await axios.post(
        `/admin/evenimente/delete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      wrap.remove();
    } catch (error) {
      console.log(error);
    }
  });
  wrap.classList.add('relative', 'w-full');

  img.classList.add('object-contain', 'w-full');
  img.src = `https://visitvaslui.fra1.digitaloceanspaces.com/${id}/poster.jpg`;
  wrap.appendChild(img);
  wrap.appendChild(close);
  gridCont.appendChild(wrap);
};

const GetEvents = async () => {
  try {
    const res = await axios.get('/evenimente/events');
    const sights = res.data.events;
    sights.forEach((event) => {
      RenderEvent(event._id);
    });
  } catch (error) {
    console.log(error);
  }
};

GetEvents();
