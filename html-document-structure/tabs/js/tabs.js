'use strict';

const tabs = document.getElementById('tabs');
const tabsNav = tabs.querySelector('.tabs-nav');
const tabsContent = tabs.querySelector('.tabs-content');
const demoTab = tabsNav.removeChild(tabsNav.firstElementChild);

createTabsNav();

for (const tab of tabsNav.children) {
  tab.addEventListener('click', showTab);
}

function createTabsNav() {
  for (const content of tabsContent.children) {
    const tab = demoTab.cloneNode(true);
    const tabContent = tab.firstElementChild;

    tabContent.textContent = content.dataset.tabTitle;
    tabContent.classList.add(content.dataset.tabIcon);
    tabsNav.appendChild(tab);
    content.classList.add('hidden');
  }
  tabsNav.firstElementChild.classList.add('ui-tabs-active');
  tabsContent.querySelector(`[data-tab-title=${tabsNav.firstElementChild.textContent}]`).classList.remove('hidden');
}

function showTab(event) {
  for (const tab of tabsNav.children) {
    tab.classList.remove('ui-tabs-active');
  }
  event.currentTarget.classList.add('ui-tabs-active');

  for (const content of tabsContent.children) {
    content.classList.add('hidden');
  }
  tabsContent.querySelector(`[data-tab-title=${event.currentTarget.textContent}]`).classList.remove('hidden');
}
