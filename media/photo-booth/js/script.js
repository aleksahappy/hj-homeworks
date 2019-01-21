'use strict';

const app = document.querySelector('.app'),
      photoList = document.querySelector('.list'),
      errorMessage = document.getElementById('error-message'),
      controls = document.querySelector('.controls'),
      btnTakePhoto = document.getElementById('take-photo');

navigator.mediaDevices
  .getUserMedia({video: true, audio: false})
  .then(initApp)
  .catch(error => {
    errorMessage.textContent = error.message;
    errorMessage.style.display = 'block';
  })

function initApp(stream) {
  const video = document.createElement('video');
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
    controls.style.display = 'flex';
  });
  app.appendChild(video);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  app.appendChild(canvas);

  const audio = document.createElement('audio');
  audio.src = './audio/click.mp3';

  btnTakePhoto.addEventListener('click', () => {
    audio.play();
    audio.currentTime = 0;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    const img = canvas.toDataURL();
    showPhoto(img);
  })
}

function showPhoto(img) {
  const firstPhoto = photoList.firstChild;
  const newPhoto = createPhoto(createPhotoTemplate(img));
  photoList.insertBefore(newPhoto, firstPhoto);

  newPhoto.addEventListener('click', event => {
    if (event.target.textContent === 'file_download') {
      event.target.style.display = 'none';
    }
    if (event.target.textContent === 'file_upload') {
      sendRequest(img, event.target);
    }
    if (event.target.textContent === 'delete') {
      const photoDelete = event.target.closest('figure');
      photoList.removeChild(photoDelete);
    }
  });
}

// Данный запрос не отправляется, сервер выдает ошибку 500 (Internal Server Error)
/* function sendRequest(img, obj) {
  const boundary = String(Math.random()).slice(2);
  const data = "--" + boundary + "\n" + "Content-Disposition: form-data; name=\"image\"; filename=\"snapshot.png\"\n" + "Content-type: image/png\n\n" + img + "\n--" + boundary + "--\n";

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://neto-api.herokuapp.com/photo-booth');
  xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
  xhr.send(data);
  xhr.addEventListener('load', event => {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      obj.style.display = 'none';
    } else {
      console.error(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    }
  });
} */

// Т.к. запрос не отправляется как multipart/form-data, то ниже решение через обычный POST c передачей формата blob
function sendRequest(img, obj) {
  const figure = obj.closest('figure');
  const image = figure.querySelector('img');
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);

  canvas.toBlob(blob => {
    const data = new FormData();
    data.append('image', blob);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://neto-api.herokuapp.com/photo-booth");
    xhr.send(data);
    xhr.addEventListener('load', event => {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        obj.style.display = 'none';
      } else {
        console.error(`Ошибка ${xhr.status}: ${xhr.statusText}`);
      }
    });
  });
}

function createPhotoTemplate(img) {
  return {
    tag: 'figure',
    content: [
      {
        tag: 'img',
        attrs: {src: img}
      },
      {
        tag: 'figcaption',
        content: [
          {
            tag: 'a',
            attrs: {href: img, download: 'snapshot.png'},
            content: {
              tag: 'i',
              attrs: {class: 'material-icons'},
              content: 'file_download'
            }
          },
          {
            tag: 'a',
            attrs: {class: 'material-icons'},
            content: {
              tag: 'i',
              attrs: {class: 'material-icons'},
              content: 'file_upload'
            }
          },
          {
            tag: 'a',
            attrs: {class: 'material-icons'},
            content: {
              tag: 'i',
              attrs: {class: 'material-icons'},
              content: 'delete'
            }
          }
        ]
      }
    ]
  }
}

function createPhoto(node) {
  if ((node === undefined) || (node === null) || (node === false)) {
    return document.createTextNode('');
  }
  if ((typeof node === 'string') || (typeof node === 'number') || (node === true)) {
    return document.createTextNode(node.toString());
  }
  if (Array.isArray(node)) {
    return node.reduce((fragment, element) => {
      fragment.appendChild(createPhoto(element));
      return fragment;
    }, document.createDocumentFragment());
  }

  const element = document.createElement(node.tag);

  if (node.attrs && typeof node.attrs === 'object') {
    Object.keys(node.attrs).forEach(key => element.setAttribute(key, node.attrs[key]));
  }

  if (node.content) {
    element.appendChild(createPhoto(node.content));
  }

  return element;
}
