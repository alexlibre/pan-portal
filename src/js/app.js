import "../scss/style.scss";
// import $ from 'jquery';
import smoothScrollToAnchor from "./utils/smoothScrollToAnchor";
import initDropdowns from "./components/dropdown";
import fixHeader from "./utils/fix-header";
import handleFavorites from './utils/favorites';
import initSelects from './lib/custom-select';
import initDraggables from './utils/draggable';
import initSliders from './utils/carousel';
import initFlats from './utils/flats';
import handleIndexFilter from './components/index-filter';
import filter from './components/filter';
import initMap from './components/map';
import initInputSliders from './components/input-sliders';
import initTables from './components/tables';
import initTabs from './utils/tabs';
import fixComplexNav from './utils/fix-complex-nav';
import toggleBurger from './components/burger';
import SimpleBar from 'simplebar';
import handleSidepanel from './utils/sidepanel';
import initModals from './components/modal';
import initDistMap from './components/distMap';
import initFileUploader from "./components/file-uploader";
import initOrderComments from "./components/order-comments";
import initThemeSwitcher from "./components/theme-switcher.js";
import initInfrastructureMap from "./components/infrastructure-map";
import initClientsTables from "./components/clients-table.js";
import handleClientFavorites from "./utils/clientFavorites";
import initKladr from "./components/kladr";
import initDatePickers from "./components/calendar";
import initPriceSlider from './components/range';
import initGallery from "./components/gallery";
import addField from "./utils/addField";
import goBack from "./utils/historyBack";
import handleUpload from "./components/upload";


import "simplebar/dist/simplebar.css";

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault()
    })
  })

  document.addEventListener("click", function(e) {
    if (e.target.closest(".js-fake-link")) {
      e.stopPropagation();
      e.preventDefault();
      console.log("fake link fired");
    }
  })

  smoothScrollToAnchor();
  initDropdowns();
  fixHeader();
  handleFavorites();
  initSelects();
  initDraggables();
  handleIndexFilter();
  initMap();
  filter();
  initTabs();
  initInputSliders();
  fixComplexNav();
  initTables();
  initFileUploader();
  initOrderComments();
  initThemeSwitcher();
  toggleBurger();
  initModals();
  initDistMap();
  handleSidepanel();
  initInfrastructureMap();
  initClientsTables();
  handleClientFavorites();
  initKladr();
  initDatePickers();
  initGallery();
  addField();
  goBack();
  handleUpload();

  // initFormdrops();


  document.querySelectorAll("form button").forEach(btn => {
    btn.addEventListener("click", event => {
      event.preventDefault();
    });
  });
  initSliders();
  initFlats();

  Array.prototype.forEach.call(
    document.querySelectorAll(".simple-bar-init"),
    el => new SimpleBar()
  );

  initPriceSlider();
});
