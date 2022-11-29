import '../style.css';

import createHeader from './components/createHeader';
import createFooter from './components/createFooter';
import { clearStorage } from './utils/storage';

createHeader();
createFooter();

const logOutBtn = document.querySelectorAll('.logOutBtn');

if (logOutBtn) {
  logOutBtn.forEach(function (currentBtn) {
    currentBtn.addEventListener('click', () => {
      clearStorage();
      location.reload();
    });
  });
}
