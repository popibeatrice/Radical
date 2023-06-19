import '../styles/login.css';
import '../styles/tailwind.css';
import axios from 'axios';

const form = document.querySelector('form');
const nume = document.querySelector('#nume');
const parola = document.querySelector('#parola');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/admin/login', {
      nume: nume.value,
      parola: parola.value,
    });
    localStorage.setItem('token', res.data.token);
    if (res.status === 200) location.href = location.origin + '/admin';
  } catch (error) {
    console.log(error);
    alert('Numele sau Parola sunt greșite!');
  }

  form.reset();
});
