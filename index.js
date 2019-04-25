(function setupCommentsSection() {
  const $postMessage = document.getElementById('post-message');
  const $postCreator = document.getElementById('post-creator');
  const $posts = document.getElementById('posts');
  const $createPost = document.getElementById('js-create-post');
  const postDOM = ({ message, user }) => `
  <div class="pd-l20 post-display pd-b5">
    <p> ${message} </p>
    <p> ${user} </p>
    <button class="pd-0 mr-b5">
      <span class="js-write-reply write-reply-close">
        Reply
      </span>
      <span class="js-write-reply write-reply-open">
        Cancel
      </span>
    </button>
    <div class="reply-container pd-t5 pd-b5">
      <textarea class="reply-message" rows="2" class="wd-100"></textarea>
      <input class="wd-70 reply-creator" type="text"/>
      <button class="wd-29 js-create-reply"> Create reply </button>
    </div>
    <div class="replies pd-b5 pd-r5"></div>
  </div>
  `;

  const replyDOM = ({ message, user }) => `
  <div class="pd-l20 post-display pd-b5">
    <p> ${message} </p>
    <p> ${user} </p>
    <button class="pd-0 mr-b5">
      <span class="js-write-reply write-reply-close">
        Reply
      </span>
      <span class="js-write-reply write-reply-open">
        Cancel
      </span>
    </button>
    <div class="reply-container">
      <textarea class="reply-message" rows="2" class="wd-100"></textarea>
      <input class="wd-70 reply-creator" type="text"/>
      <button class="wd-29 js-create-reply"> Create reply </button>
    </div>
    <div class="replies pd-b5 pd-r5"></div>
  </div>
  `;

  const render = (domElement, post) => domElement.insertAdjacentHTML('beforeend', post);

  const createPost = (event) => {
    event.stopPropagation();
    const message = $postMessage.value || 'Test Message';
    const user = $postCreator.value || 'Test User';
    const post = { message, user };
    render($posts, postDOM(post));
  };

  const toggleReplyContainer = (event) => {
    const postContainer = event.target.closest('.post-display');
    postContainer.classList.toggle('show');
  };

  const createReply = (event) => {
    const replyContainer = event.target.closest('.reply-container');
    const replyMessage = replyContainer.querySelector('.reply-message');
    const replyUser = replyContainer.querySelector('.reply-creator');
    const postContainer = event.target.closest('.post-display');
    const repliesContainer = postContainer.querySelector('.replies');
    const message = replyMessage.value || 'Reply Message';
    const user = replyUser.value || 'Reply User';
    const reply = { message, user };
    toggleReplyContainer(event);
    render(repliesContainer, replyDOM(reply));
  };

  const replyEvents = (event) => {
    event.stopPropagation();
    const elementClasses = event.target.classList;
    if (elementClasses.contains('js-write-reply')) {
      toggleReplyContainer(event);
      return;
    }
    if (elementClasses.contains('js-create-reply')) {
      createReply(event);
      return;
    }
    // eslint-disable-next-line
    console.log('Unnecessary click');
  };

  $createPost.addEventListener('click', createPost);
  $posts.addEventListener('click', replyEvents);
}());
