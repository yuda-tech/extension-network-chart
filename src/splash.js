const template = `
<div id="extension-network-chart-loading-modal" class="rain rain-loader qv-block-ui extension-network-chart">
<div class="qv-animate progress-loader qv-loader-container qv-loader-huge qv-fade-in">
<div class="one">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 210 210" xml:space="preserve">
<g>
<path class="path" d="M105,205c-26.7,0-51.8-10.4-70.7-29.3C15.4,156.8,5,131.7,5,105s10.4-51.8,29.3-70.7C53.2,15.4,78.3,5,105,5 c55.1,0,100,44.9,100,100S160.1,205,105,205z M105,23.7c-44.8,0-81.3,36.5-81.3,81.3c0,44.8,36.5,81.3,81.3,81.3 c44.8,0,81.3-36.5,81.3-81.3C186.3,60.2,149.8,23.7,105,23.7z"></path>
</g>
</svg>
</div>
<div class="two">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 210 210" xml:space="preserve">
<g>
<path class="path" d="M105,205C49.9,205,5,160.1,5,105C5,49.9,49.9,5,105,5c55.1,0,100,44.9,100,100C205,160.1,160.1,205,105,205z M105,19.4c-47.2,0-85.6,38.4-85.6,85.6c0,47.2,38.4,85.6,85.6,85.6c47.2,0,85.6-38.4,85.6-85.6C190.6,57.8,152.2,19.4,105,19.4z"></path>
</g>
</svg>
</div>
<div class="three">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 210 210" xml:space="preserve">
<g>
<path class="path" d="M105,205c-26.7,0-51.8-10.4-70.7-29.3C15.4,156.8,5,131.7,5,105s10.4-51.8,29.3-70.7C53.2,15.4,78.3,5,105,5 c55.1,0,100,44.9,100,100S160.1,205,105,205z"></path>
</g>
</svg>
</div>
<div class="four">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 210 210" xml:space="preserve">
<g>
<path class="path" d="M105,205C49.9,205,5,160.1,5,105C5,49.9,49.9,5,105,5c55.1,0,100,44.9,100,100C205,160.1,160.1,205,105,205z M105,19.4c-47.2,0-85.6,38.4-85.6,85.6c0,47.2,38.4,85.6,85.6,85.6c47.2,0,85.6-38.4,85.6-85.6C190.6,57.8,152.2,19.4,105,19.4z"></path>
</g>
</svg>
</div>
<div class="five">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 210 210" xml:space="preserve">
<g>
<path class="path" d="M105 205C49.9 205 5 160.1 5 105C5 49.9 49.9 5 105 5c55.1 0 100 44.9 100 100C205 160.1 160.1 205 105 205z M105 10.5c-52.1 0-94.5 42.4-94.5 94.5c0 52.1 42.4 94.5 94.5 94.5c52.1 0 94.5-42.4 94.5-94.5C199.5 52.9 157.1 10.5 105 10.5z"></path>
</g>
</svg>
</div>
<div class="six">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 210 210" xml:space="preserve">
<g>
<path class="path" d="M105,205c-26.7,0-51.8-10.4-70.7-29.3C15.4,156.8,5,131.7,5,105s10.4-51.8,29.3-70.7C53.2,15.4,78.3,5,105,5 c55.1,0,100,44.9,100,100S160.1,205,105,205z"></path>
</g>
</svg>
</div>
<div class="seven">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 210 210" xml:space="preserve">
<g>
<path class="path" d="M105,205C49.9,205,5,160.1,5,105C5,49.9,49.9,5,105,5c55.1,0,100,44.9,100,100C205,160.1,160.1,205,105,205z M105,19.4c-47.2,0-85.6,38.4-85.6,85.6c0,47.2,38.4,85.6,85.6,85.6c47.2,0,85.6-38.4,85.6-85.6C190.6,57.8,152.2,19.4,105,19.4z"></path>
</g>
</svg>
</div>
</div>
<div style="color: #ddd;" class="qv-loader-text qv-loader-huge qv-fade-in">
<div id="extension-network-chart-splash-title"></div>
<div id="extension-network-chart-splash-message"></div>
</div>
</div>`;

const htmlToElement = (html) => {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

export const showSplash = ({ containerId, title, message }) => {
  const el = htmlToElement(template);
  if (!el) {
    return;
  }
  const modalEl = document.getElementById('extension-network-chart-loading-modal');
  if (modalEl) {
    document.getElementById('extension-network-chart-splash-title').innerText = title;
    document.getElementById('extension-network-chart-splash-message').innerText = message || '';
    return;
  }
  document.getElementById(containerId).append(el);
  document.getElementById('extension-network-chart-splash-title').innerText = title;
  document.getElementById('extension-network-chart-splash-message').innerText = message || '';
};

export const hideSplash = () => {
  const el = document.getElementById('extension-network-chart-loading-modal');
  el?.classList.add('extension-network-chart-delete');
  setTimeout(() => {
    el?.remove();
  }, 1000);
};
