/**
 * Fetch nav items from json file
 */
async function getNavItems() {
  let url = './navigation.json';
  let options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    let res = await fetch(url, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
/**
 * Render nav items on page
 */
async function renderNavItems() {
  let items = await getNavItems();
  let locations = items.cities;
  let html = '<ul>';
  locations.forEach(location => {
    let htmlSegment = `
        <li><a href="">${location.label}</a></li>
      `;
    html += htmlSegment;
  });
  html += '</ul>';
  let container = document.getElementById('nav');
  container.innerHTML = html;
  navEventListeners();
}
renderNavItems();
/**
 * Add event listener to rendered items
 */
const navLine = document.getElementById("nav-target");
function navEventListeners() {
  const links = document.querySelectorAll("#nav li > a");
  for (let i = 0; i < links.length; i++) {
    let el = links[i];
    links[i].addEventListener("click", (e) => {
      e.preventDefault()
      navClickHandler(e.target, links)
    });
  }
}
/**
 * Nav item click function for creating size of nav line
 */
function navClickHandler(el, links) {
  if (!el.parentNode.classList.contains("active")) {
    for (let i = 0; i < links.length; i++) {
      if (links[i].parentNode.classList.contains("active")) {
        links[i].parentNode.classList.remove("active");
      }
      //links[i].style.opacity = "0.25";
    }

    el.parentNode.classList.add("active");
    //el.style.opacity = "1";

    const width = el.getBoundingClientRect().width;
    const height = el.getBoundingClientRect().height;
    const left = el.getBoundingClientRect().left + window.pageXOffset;
    const top = el.getBoundingClientRect().top + window.pageYOffset;
    //const color = colors[Math.floor(Math.random() * colors.length)];

    navLine.style.width = `${width}px`;
    //target.style.height = `${height}px`;
    navLine.style.left = `${left}px`;
    navLine.style.top = `${top + height}px`;
    navLine.style.transform = "none";
  }
}

function resizeFunc() {
  const active = document.querySelector("#nav li.active a");

  if (active) {
    const left = active.getBoundingClientRect().left + window.pageXOffset;
    const top = active.getBoundingClientRect().top + window.pageYOffset;
    const height = active.getBoundingClientRect().height;

    navLine.style.left = `${left}px`;
    navLine.style.top = `${top}px`;
    navLine.style.top = `${top + height}px`;
  }
}

window.addEventListener("resize", resizeFunc);