'use strict';

const eyes = document.querySelectorAll('.cat_eye');

window.addEventListener('mousemove', event => drag(event.pageX, event.pageY));

const drag = throttle((x, y) => {
  let area;
  for (let eye of eyes) {
    if (eye.classList.contains('cat_eye_left')) {
      area = eye.closest('.cat_position_for_left_eye');
    }
    if (eye.classList.contains('cat_eye_right')) {
      area = eye.closest('.cat_position_for_right_eye');
    }
    const areaBounds = area.getBoundingClientRect();

		if (x < areaBounds.left) {
			eye.style.left = '0px';
		} else if (x > areaBounds.right) {
			eye.style.left = '50%';
		} else {
			eye.style.left = '25%';
		}

		if (y < areaBounds.top) {
			eye.style.top = '0px';
		} else if (y > areaBounds.bottom) {
			eye.style.top = '50%';
		} else {
			eye.style.top = '25%';
		}
  }
});
  
function throttle(callback) {
  let isWaiting = false;
  return function () {
    if (!isWaiting) {
      callback.apply(this, arguments);
      isWaiting = true;
      requestAnimationFrame(() => {
        isWaiting = false;
      });
    }
  };
}
