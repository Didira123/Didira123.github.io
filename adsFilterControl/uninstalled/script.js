// general function to querySelector with less writing
function $(...args) {
  return document.querySelector(...args);
}

// general function to querySelectorAll with less writing
function $All(...args) {
  return document.querySelectorAll(...args);
}

const image = $(`.logo img`);

// Execution that attempts to load translations and apply them to the page
document.addEventListener(`DOMContentLoaded`, () => {
  const userLocale = navigator.language || navigator.userLanguage;
  const locale = userLocale.replace(`-`, `_`).split(`_`)[0]; // 'en-US' -> 'en'
  const messages = _locales[locale] ? _locales[locale] : _locales[`en`];

  // Execution that updates locale texts of html
  $All(`[locale_text]`).forEach((lt) => {
    const locale_text_value = messages[lt.getAttribute(`locale_text`)]?.message;
    const value = locale_text_value ? locale_text_value : `NO_VALUE`;
    if (lt.tagName === `TEXTAREA`) {
      lt.placeholder = value;
    } else {
      lt.textContent = value;
    }
  });

  // Execution that gets and sets Ads Filter Control logo "alt"
  if (image) {
    image.alt = messages[`image_icon_alt`]?.message;
  }

  // Execution that updates the lang attribute in the html tag
  document.documentElement.lang = locale;
});

if (image) {
  image.src = `../images/icon.png`;
}

$All(`input[name="reason"]`).forEach(inp => {
  if (inp.checked && inp.getAttribute(`ask_for_details`) !== null) {
    $(`textarea[name="more_details"]`).style.display = `block`;
  }
  inp.addEventListener(`click`, (event) => {
    if (event.target.getAttribute(`ask_for_details`) !== null) {
      $(`textarea[name="more_details"]`).style.display = `block`;
    } else {
      $(`textarea[name="more_details"]`).style.display = `none`;
    }
  })
});