let documentReady = false;

async function importJSFiles() {
  const headerServiceResponse = import("../components/header.js");
  const navServiceResponse = import("../components/nav.js");
  const footerServiceResponse = import("../components/footer.js");
  headerService = (await headerServiceResponse).headerService;
  navService = (await navServiceResponse).navService;
  footerService = (await footerServiceResponse).footerService;
}

export function onLoad() {
  const loadData = async () => {
    await importJSFiles();

    const header = document.getElementById("header");
    header.parentNode.replaceChild(await headerService.getHeader(), header);

    const nav = document.getElementById("nav");
    nav.parentNode.replaceChild(await navService.getNav(), nav);

    const footer = document.getElementById("footer");
    footer.parentNode.replaceChild(await footerService.getFooter(), footer);
  };
  if (!documentReady) loadData();
  documentReady = true;
}
let headerService = null;
let navService = null;
let footerService = null;

onLoad();
