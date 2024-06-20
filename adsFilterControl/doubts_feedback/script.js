// general function to querySelector with less writing
function $(...args) {
  return document.querySelector(...args);
}

// general function to querySelectorAll with less writing
function $All(...args) {
  return document.querySelectorAll(...args);
}

const image = $(`.logo img`);

// Variable used to show the form error message
let errorMessage = null;

// Execution that attempts to get translations and apply them to the page
const userLocale = navigator.language || navigator.userLanguage;
const locale = userLocale.replace(`-`, `_`).split(`_`)[0]; // 'en-US' -> 'en'
const messages = translations[locale] ? translations[locale] : translations[`en`];
document.addEventListener(`DOMContentLoaded`, () => {

  // Execution that updates locale texts of html
  $All(`[locale_text]`).forEach((lt) => {
    const locale_text = lt.getAttribute(`locale_text`);
    const locale_text_value = messages[locale_text]?.message;
    const value = locale_text_value ? locale_text_value : `NO_VALUE`;
    if (locale_text.includes(`-reason_type-`)) {
      lt.previousElementSibling.value = value;
      lt.textContent = value;
    } else if (lt.tagName === `TEXTAREA`) {
      lt.placeholder = value;
    } else {
      lt.textContent = value;
    }
  });

  // Execution that gets and sets Ads Filter Control logo "alt"
  if (image) {
    image.alt = messages[`image_icon_alt`]?.message || `NO_VALUE`;
  }
  errorMessage = messages[`doubts_feedback-error`]?.message || `NO_VALUE`;
  // Execution that updates the lang attribute in the html tag
  document.documentElement.lang = locale;
});

if (image) {
  image.src = `../images/icon.png`;
}

// Function that verifies and "submits" an email pattern
function verifyAndSubmitEmail(event) {
  event.preventDefault();
  const reason_types = event.target.reason_type;
  let checked_reason_type = null;
  for (rt of reason_types) {
    if (rt.checked) {
      checked_reason_type = rt.value;
      break;
    }
  }
  const questions_and_feedback = event.target.questions_and_feedback.value;
  if (!questions_and_feedback || !checked_reason_type) {
    alert(errorMessage);
    return;
  }

  const extension_doubts_feedback = messages[`extension_doubts_feedback`]?.message;
  const emailTo = `didira123321aridid@gmail.com, kaironlorenzo118@gmail.com`;
  const subject = `${extension_doubts_feedback} - ${checked_reason_type}`;
  const body = `${checked_reason_type}: ${questions_and_feedback}`;
  // alert(`mailto:${emailTo}?subject=${subject}&body=${body}`);
  window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

$(`form`).addEventListener(`submit`, verifyAndSubmitEmail);