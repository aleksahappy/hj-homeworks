'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  const comments = createComment(list.map(createTemplate));
  commentsContainer.appendChild(comments);
}

function createTemplate(comment) {
  const textComment = comment.text.split('\n').map(element => {
    return {
      tag: 'span',
      content: [element, {tag: 'br'}]
    }
  });

  return {
    tag: 'div',
    cls: 'comment-wrap',
    content: [
      {
        tag: 'div',
        cls: 'photo',
        attrs: {title: comment.author.name},
        content: {
          tag: 'div',
          cls: 'avatar',
          attrs: {style: `background-image: url('${comment.author.pic}')`}
        }
      },
      {
        tag: 'div',
        cls: 'comment-block',
        content: [
          {
            tag: 'p',
            cls: 'comment-text',
            content: textComment
          },
          {
            tag: 'div',
            cls: 'bottom-comment',
            content: [
              {
                tag: 'div',
                cls: 'comment-date',
                content: new Date(comment.date).toLocaleString('ru-Ru')
              },
              {
                tag: 'ul',
                cls: 'comment-actions',
                content: [
                  {
                    tag: 'li',
                    cls: 'complain',
                    content: 'Пожаловаться'
                  },
                  {
                    tag: 'li',
                    cls: 'reply',
                    content: 'Ответить'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

function createComment(block) {
  if ((block === undefined) || (block === null) || (block === false)) {
    return document.createTextNode('');
  }
  if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
    return document.createTextNode(block.toString());
  }
  if (Array.isArray(block)) {
    return block.reduce((fragment, element) => {
      fragment.appendChild(createComment(element));
      return fragment;
    }, document.createDocumentFragment());
  }

  const element = document.createElement(block.tag || 'div');

  if (block.cls) {
    element.classList.add(...[].concat(block.cls).filter(Boolean));
  }
  
  if (block.attrs) {
    Object.keys(block.attrs).forEach(key => {
      element.setAttribute(key, block.attrs[key])
    });
  }

  if (block.content) {
    element.appendChild(createComment(block.content));
  }

  return element;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
