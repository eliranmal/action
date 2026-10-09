const SAVE_BUTTON_ID = 'save-button';

const FORM_ID = 'settings-form';
const FORM = document.getElementById(FORM_ID);

const SCRIPT_TEXTAREA_NAME = 'custom-script';

async function updateUi() {
  // Access settings from storage with default values.
  const { type, script } = await chrome.storage.local.get({
    script: "alert('hi');"
  });

  // Update UI with current values.
  FORM.elements[SCRIPT_TEXTAREA_NAME].value = script;
}

async function onSave() {
  // Get values from form.
  const script = FORM.elements[SCRIPT_TEXTAREA_NAME].value;

  // Save to storage.
  chrome.storage.local.set({
    script
  });

  // todo - implement
}

// Update UI immediately, and on any storage changes.
updateUi();
chrome.storage.local.onChanged.addListener(updateUi);

// Register listener for save button click.
document.getElementById(SAVE_BUTTON_ID).addEventListener('click', onSave);
