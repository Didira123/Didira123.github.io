// general function to querySelector with less writing
function $(...args) {
  return document.querySelector(...args);
}

// general function to querySelectorAll with less writing
function $All(...args) {
  return document.querySelectorAll(...args);
}

const image = $(`.logo img`);

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
    if (locale_text.startsWith(`reason-`)) {
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
  errorMessage = messages[`form_error`]?.message || `NO_VALUE`;
  // Execution that updates the lang attribute in the html tag
  document.documentElement.lang = locale;
});

if (image) {
  image.src = `../images/icon.png`;
}

// Execution that checks if the checked input has the `ask_for_details` parameter, to then display the textarea field
$All(`input[name="reason"]`).forEach(inp => {
  if (inp.checked && inp.getAttribute(`ask_for_details`)) {
    $(`textarea[name="more_details"]`).style.display = `block`;
  }
  inp.addEventListener(`click`, (event) => {
    $(`textarea[name="more_details"]`).style.display = (event.target.getAttribute(`ask_for_details`)) ? `block` : `none`;
  })
});

// Function that verifies and "submits" an email
function verifyAndSubmitEmail(event) {
  event.preventDefault();
  const reasons = event.target.reason;
  let checkedReason = null;
  for (r of reasons) {
    if (r.checked) {
      checkedReason = r;
      break;
    }
  }
  let more_details = null;
  if (checkedReason && checkedReason.getAttribute(`ask_for_details`)) {
    more_details = $(`textarea[name="more_details"]`).value;
  }
  const questions_and_feedback = event.target.questions_and_feedback.value;
  if (!checkedReason && !questions_and_feedback) {
    alert(errorMessage);
    return;
  }
  const reason = checkedReason ? messages[`reason`]?.message : ``;
  const questionsFeedback = questions_and_feedback ? messages[`questions_and_feedback`]?.message : ``;
  const extension_uninstalled = messages[`extension_uninstalled`]?.message;
  const emailTo = `didira123321aridid@gmail.com`;
  const subject = `${extension_uninstalled || ``} ${reason ? `- ` + reason : ``}${questionsFeedback ? `- ` + questionsFeedback : ``}`;
  const body = `${checkedReason ? `${reason}: ${checkedReason.value}\n${more_details ? more_details+`\n` : ``}` : ``}${questions_and_feedback ? `${questionsFeedback}: ${questions_and_feedback}` : ``}`;
  alert(`mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

$(`form`).addEventListener(`submit`, verifyAndSubmitEmail);