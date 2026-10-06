const USER_SCRIPT_ID = 'default';
const SAVE_BUTTON_ID = 'save-button';

const FORM_ID = 'settings-form';
const FORM = document.getElementById(FORM_ID);

const SCRIPT_TEXTAREA_NAME = 'custom-script';

/**
 * Checks if the user has developer mode enabled, which is required to use the
 * User Scripts API.
 *
 * @returns If the chrome.userScripts API is available.
 */
function isUserScriptsAvailable() {
  try {
    // Property access which throws if developer mode is not enabled.
    chrome.userScripts;
    return true;
  } catch {
    // Not available, so hide UI and show error.
    document.getElementById('warning').style.display = 'block';
    FORM.style.display = 'none';
    return false;
  }
}

async function updateUi() {
  if (!isUserScriptsAvailable()) return;

  // Access settings from storage with default values.
  const { script } = await chrome.storage.local.get({
    script: "alert('hi');"
  });

  // Update UI with current values.
  FORM.elements[SCRIPT_TEXTAREA_NAME].value = script;
}

async function onSave() {
  if (!isUserScriptsAvailable()) return;

  // Get values from form.
  const script = FORM.elements[SCRIPT_TEXTAREA_NAME].value;

  // Save to storage.
  chrome.storage.local.set({
    script
  });

  const existingScripts = await chrome.userScripts.getScripts({
    ids: [USER_SCRIPT_ID]
  });

  if (existingScripts.length > 0) {
    // Update existing script.
    await chrome.userScripts.update([
      {
        id: USER_SCRIPT_ID,
        // matches: ['https://example.com/*'],
        js: [{ code: script }]
      }
    ]);
  } else {
    // Register new script.
    await chrome.userScripts.register([
      {
        id: USER_SCRIPT_ID,
        // matches: ['https://example.com/*'],
        js: [{ code: script }]
      }
    ]);
  }
}

// Update UI immediately, and on any storage changes.
updateUi();
chrome.storage.local.onChanged.addListener(updateUi);

// Register listener for save button click.
document.getElementById(SAVE_BUTTON_ID).addEventListener('click', onSave);
