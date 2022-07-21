const write = document.querySelector('.write');
const topFold = document.querySelector('.top-fold');
const bottomFold = document.querySelector('.bottom-fold');
const textarea = document.getElementById('thoughts');

const button = document.querySelector('.spread');
button.addEventListener('click', handleClick);

let folded, sent, received;

function fetchStationery() {
  return new Promise((resolve, reject) => {
    write.classList.remove('sent');
    textarea.disabled = true;
    textarea.value = '';
    sent = false;

    button.innerText = 'Release This Thought';
    resolve(true);
  });
}

async function handleClick(event) {
  if (sent) {
    received = await fetchStationery();
    folded = await unfoldWrite();
    if (!folded) {
      window.setTimeout(() => {
        textarea.disabled = false;
        textarea.placeholder = 'Click here and write down a thought you want to let go of. What you write is deleted, without being sent to any servers.';
        textarea.focus();
      }, 250);
    }
  }
  else {
    folded = await foldWrite();
    if (folded) {
      button.innerText = 'Send another';
      sent = await sendWrite();
    }
  }
}

function foldWrite() {
  return new Promise((resolve, reject) => {
    bottomFold.classList.add('bottom-folded');
    window.setTimeout(() => {
      topFold.classList.add('top-folded');
      resolve(true);
    }, 750);
  });
}

function unfoldWrite() {
  return new Promise((resolve, reject) => {
    topFold.classList.remove('top-folded');
    textarea.placeholder = '';
    window.setTimeout(() => {
      bottomFold.classList.remove('bottom-folded');
      resolve(false);
    }, 750);
  });
}

function sendWrite() {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      write.classList.add('sent');
      received = false;
      resolve(true);
    }, 500);
  });
}

document.querySelectorAll('.button').forEach(button => {

    let getVar = variable => getComputedStyle(button).getPropertyValue(variable);

    button.addEventListener('click', e => {

        if(!button.classList.contains('active')) {

            button.classList.add('active');

            gsap.to(button, {
                keyframes: [{
                    '--left-wing-first-x': 50,
                    '--left-wing-first-y': 100,
                    '--right-wing-second-x': 50,
                    '--right-wing-second-y': 100,
                    duration: .2,
                    onComplete() {
                        gsap.set(button, {
                            '--left-wing-first-y': 0,
                            '--left-wing-second-x': 40,
                            '--left-wing-second-y': 100,
                            '--left-wing-third-x': 0,
                            '--left-wing-third-y': 100,
                            '--left-body-third-x': 40,
                            '--right-wing-first-x': 50,
                            '--right-wing-first-y': 0,
                            '--right-wing-second-x': 60,
                            '--right-wing-second-y': 100,
                            '--right-wing-third-x': 100,
                            '--right-wing-third-y': 100,
                            '--right-body-third-x': 60
                        })
                    }
                }, {
                    '--left-wing-third-x': 20,
                    '--left-wing-third-y': 90,
                    '--left-wing-second-y': 90,
                    '--left-body-third-y': 90,
                    '--right-wing-third-x': 80,
                    '--right-wing-third-y': 90,
                    '--right-body-third-y': 90,
                    '--right-wing-second-y': 90,
                    duration: .2
                }, {
                    '--rotate': 50,
                    '--left-wing-third-y': 95,
                    '--left-wing-third-x': 27,
                    '--right-body-third-x': 45,
                    '--right-wing-second-x': 45,
                    '--right-wing-third-x': 60,
                    '--right-wing-third-y': 83,
                    duration: .25
                }, {
                    '--rotate': 55,
                    '--plane-x': -8,
                    '--plane-y': 24,
                    duration: .2
                }, {
                    '--rotate': 40,
                    '--plane-x': 45,
                    '--plane-y': -180,
                    '--plane-opacity': 0,
                    duration: .3,
                    onComplete() {
                        setTimeout(() => {
                            button.removeAttribute('style');
                            gsap.fromTo(button, {
                                opacity: 0,
                                y: -8
                            }, {
                                opacity: 1,
                                y: 0,
                                clearProps: true,
                                duration: .3,
                                onComplete() {
                                    button.classList.remove('active');
                                }
                            })
                        }, 2000)
                    }
                }]
            })

            gsap.to(button, {
                keyframes: [{
                    '--text-opacity': 0,
                    '--border-radius': 0,
                    '--left-wing-background': getVar('--primary-darkest'),
                    '--right-wing-background': getVar('--primary-darkest'),
                    duration: .1
                }, {
                    '--left-wing-background': getVar('--primary'),
                    '--right-wing-background': getVar('--primary'),
                    duration: .1
                }, {
                    '--left-body-background': getVar('--primary-dark'),
                    '--right-body-background': getVar('--primary-darkest'),
                    duration: .4
                }, {
                    '--success-opacity': 1,
                    '--success-scale': 1,
                    duration: .25,
                    delay: .25
                }]
            })

        }

    })

});

// Unsplash 
const numImagesAvailable = 982  //how many photos are total in the collection
const numItemsToGenerate = 1; //how many photos you want to display
const collectionID = 583204   //the collection ID from the original url
const galleryContainer = document.querySelector('.gallery-container')
function renderGalleryItem(randomNumber){ 
  fetch(`https://source.unsplash.com/collection/${583204}/?sig=${randomNumber}`)
    .then((response) => {
      console.log(response.url)
      document.body.style.backgroundImage = `url(${response.url})`;
      document.body.style.backgroundRepeat = "no-repeat"
      document.body.style.backgroundPosition = "top center"
      document.body.style.backgroundSize = "cover"
    })
  }
for(let i=0; i < numItemsToGenerate; i++){
    let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);
renderGalleryItem(randomImageIndex);
  }

window.addEventListener('resize', fitAppToWindow);

function fitAppToWindow() {
  // First, get the viewport height and multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

fitAppToWindow();