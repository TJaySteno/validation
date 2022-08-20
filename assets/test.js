window.addEventListener('DOMContentLoaded', e => {

  // Pass/fail banner
  const passedEl = document.querySelector('#passed');
  const failedEl = document.querySelector('#failed');
  const allTestsPassed = bool => {
    passedEl.style.display = bool ? '' : 'none';
    failedEl.style.display = !bool ? '' : 'none';
  }

  // Tabs
  function openTab(e, tabName) {
    let i;
    let x = document.getElementsByClassName("tab");
    let tabLinks = document.getElementsByClassName("tabLink");
    console.log(e.currentTarget.className);
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    for (i = 0; i < tabLinks.length; i++) {
      tabLinks[i].className.replace("button-primary", "button-secondary");
    }
    document.getElementById(tabName).style.display = "block";
    e.currentTarget.className.replace("button-secondary", "button-primary");
  }

  document.querySelector('#testTab').addEventListener('click', e => openTab(e, 'test'));
  document.querySelector('#testTab').addEventListener('click', e => openTab(e, 'test'));
  document.querySelector('#ruleTab').addEventListener('click', e => openTab(e, 'rule'));
  document.querySelector('#helpTab').addEventListener('click', e => openTab(e, 'help'));
});
