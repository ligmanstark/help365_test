const getLocale = () => {
  const lan = document.documentElement.lang;
  return lan ? document.documentElement.lang : 'ru';
}

function getProduct() {
  var domenName = window.location.hostname;

  var product;

  switch (domenName) {
    case 'elma-rpa.ai':
      product = {
        name: 'rpa',
        id: '33678c11-fea6-4adb-aa39-adc4e8295b53'
      }
      break;
    case 'www.elma-bpm.ru':
      product = {
        name: 'elma3/4',
        id: '44b97702-146c-414b-9db7-0b09705556ed'
      }
      break;
    default:
      product = {
        name: 'elma365',
        id: '3354c78a-720e-4584-a9c6-83f0f1396d22'
      }
      break;
  }
  return product;
}

document.querySelector('.solution-select').addEventListener('mouseenter', function() {
  this.classList.add('active');
  document.querySelector('.solution-select__list').classList.add('active');
});


document.querySelector('.solution-select__list').addEventListener('mouseleave', function() {
  this.classList.remove('active');
  document.querySelector('.solution-select').classList.remove('active');
});

const titleName =()=>{
  let textSpanTitle = document.querySelector('.solution-select__selected');
  let currentPlace = window.location.pathname.replace('/en/help/','').split('/')[0]
  textSpanTitle.textContent=currentPlace.charAt(0).toUpperCase() + currentPlace.slice(1);
  if(currentPlace==='crm' || 'ecm'){
    textSpanTitle.textContent=currentPlace.toUpperCase()
  }
  if(currentPlace==='business_solutions'){
    let business=currentPlace.replace('_',' ')
    textSpanTitle.textContent=business.charAt(0).toUpperCase()+business.slice(1,8)+' '+business.charAt(9).toUpperCase()+business.slice(10)
  }
}

/*// Commerce version
const files = document.querySelectorAll(".filelink");
if (files.length) {
  files.forEach((file) =>
    file.setAttribute("download", "Postman_collection.json")
  );
}*/

const insertWordBreaks=(selector)=> {
  document.querySelectorAll(selector).forEach((el) => {
     el.innerHTML = el.textContent.replace(/([\/\-=:_])/g, '$1<wbr>');
  });
}

insertWordBreaks('code');

const scrollToLink = () => {
  let myHash = location.hash; //�������� �������� ����
  location.hash = ''; //������� ���
  if (myHash[1]) { //���������, ���� �� � ���� �����-�� ��������
    $('html, body').animate({ scrollTop: $(myHash).offset().top }, 100); //�������� �� ����������
  };
}
// scrollToLink();

const createVersionNode = (title, className) => {
  const articleNode = document.querySelector(".topic__title");
  const pVersion = document.createElement("p");
  pVersion.innerText = title;
  pVersion.classList.add(className);
  articleNode.append(pVersion);
};

const {
  href,
  pathname
} = window.location;
let locale = getLocale();
const pathnameArr = pathname.split('/');
let currentPage = pathnameArr[pathnameArr.length - 1] || null;

//���� �� ��������� ��������, ������ ���������� ������ � �����
const changeHeaderLinks = () => {
  const host = 'elma4.sarl.inner.elma365.com';
  const path = '/ru/platform/'
  const headerLinks = document.querySelector('.header__list');
  const footerList = document.querySelector('.footer-mobile__list');
  const appendList = `<li class="submenu__dropdown""><a>BPM</a><ul class="submenu"><li><a href="https://www.elma-bpm.ru/help4/ecm/elma-ecm.html">ECM+</a></li><li><a href="https://www.elma-bpm.ru/help4/crm/elma-crm.html">CRM+</a></li><li><a href=" https://www.elma-bpm.ru/help4/projects/elma-projects.html">Проекты</a></li></ul></li>`

  if (window.location.host === host) {
    if (window.location.pathname !== path) {

      headerLinks.insertAdjacentHTML('beforeend', appendList)
      footerList.insertAdjacentHTML('beforeend', appendList)
    }
  }
}
//changeHeaderLinks()

// standard example
function findExampleContent(node, container, endString) {
  if (node.classList.contains('p_CodeExample') &&
    node.firstElementChild &&
    node.firstElementChild.innerText.toLowerCase().includes('конец') &&
    node.firstElementChild.innerText.toLowerCase().includes(endString)) {
    node.remove();
    return;
  }
  const nextElement = node.nextElementSibling;
  container.append(node);
  findExampleContent(nextElement, container, endString);
}

function createNotation(item, notationType, endString) {
  const container = document.createElement('div');
  const exampleTitle = item.nextElementSibling;
  const nextSibling = exampleTitle.nextElementSibling;

  container.classList.add(notationType);
  exampleTitle.classList.add(notationType + '__title');
  container.append(exampleTitle);
  findExampleContent(nextSibling, container, endString);
  item.after(container);
  item.remove();
}

function getArticleName(url) {
  const arrFromUrl = url.split('/');
  const lastPath = arrFromUrl[arrFromUrl.length - 1];
  return lastPath.split('.')[0];
}

function removeCollapsedClass(node, tagName, className) {
  const closestNode = node.closest(tagName);
  if (!closestNode) {
    return;
  }
  closestNode.classList.remove(className);
  removeCollapsedClass(closestNode.parentElement, tagName, className);
}

function loadBottomLinks() {
  const toc = document.querySelector('#toc');
  const bottomLinks = document.querySelectorAll('.bottom-nav__link');
  if (toc && bottomLinks.length) {
    bottomLinks.forEach(link => {
      const path = `a[href="${link.innerText}"]`;
      const targetLink = toc.querySelector(path);
      link.innerText = targetLink.innerText;
    })
  }
}

function hideAllSideUls() {
  const hidingMenu = document.querySelectorAll('#toc li ul');
  hidingMenu.forEach(item => {
    item.classList.add('hide-side-menu-item');
    item.closest('li').classList.add('collapsed');
  });
}

function toggleUlsLinksHandler(menu, link) {
  menu.forEach(link => link.classList.remove('active-side-menu'));
  link.classList.add('active-side-menu');
  removeCollapsedClass(link, 'ul', 'hide-side-menu-item');
  if (link.nextElementSibling && link.nextElementSibling.classList.contains('hide-side-menu-item')) {
    removeCollapsedClass(link, 'li', 'collapsed');
    link.nextElementSibling.classList.remove('hide-side-menu-item');
  } else {
    removeCollapsedClass(link, 'li', 'collapsed');
  }
  setTimeout(() => {
    scrollToSelector('.active-side-menu')
  }, 100)
}

function scrollToSelector(selector) {
  // document.body.style.position = 'fixed';
  document.querySelector('.sidebar__wrapper').style.position = 'fixed';
  document.querySelector(selector).scrollIntoView({ behavior: 'smooth', block: "center" })
  document.querySelector('.sidebar__wrapper').style.position = 'sticky';
  // document.body.style.position = 'unset';
}

function toggleUlsHandler() {
  const tocNode = document.querySelector('#toc');
  if (tocNode) {
    const linksMenu = tocNode.querySelectorAll('a');
    const activeItem = getArticleName(window.location.pathname);
    linksMenu.forEach(link => {
      if (getArticleName(link.pathname) === activeItem) {
        toggleUlsLinksHandler(linksMenu, link);
      }
    });
  }
}

function prepareContent() {
  const commerceId = document.getElementById("commerce");
  const communityId = document.getElementById("community");

  href.includes('zoom_highlightsub') && $('body').addClass('--highlight-disabled');

  //Set document title
  const h1pageTitle = document.querySelector('h1 span.f_Heading1');
  if (h1pageTitle) {
    document.querySelector('title').innerText = h1pageTitle.innerText;
  }
  if (commerceId || communityId) {
    commerceId ?
      (commerceId.style.display = "none") :
      (communityId.style.display = "none");
    commerceId ?
      createVersionNode("Enterprise", "pCommerce") :
      createVersionNode("Community Edition", "pCommunity");
  }
  hideAllSideUls();
  toggleUlsHandler();

  const visibleSideBar = (sidebar) => {
    const input = sidebar.querySelector('input[type="checkbox"]');
    let isVisible = false;

    input.addEventListener('change', () => {
      isVisible = !isVisible;

      if (isVisible) {
        sidebar.style.width = 'auto'
      } else {
        sidebar.style.width = 0
      }
    })
  }

  const toc2 = document.getElementById("toc2");
  if (toc2) {
    const toc2Wrapper = document.querySelector(".article__sidebar");
    $("#toc2").tocify({
      context: 'section.article__content',
      selectors: 'h2, h3',
      extendPage: false,
    });
    const points = toc2.querySelectorAll('a');
    if (points.length > 0) {
      points.forEach(point => {
        if (!point.innerText.trim()) {
          point.remove();
        }
      });
      toc2Wrapper.style.display = 'block';
      visibleSideBar(toc2Wrapper);
    } else {
      toc2Wrapper.style.display = 'none';
    }
  }

  const images = document.querySelectorAll('.p_Normal > img');
  images.forEach(image => image.closest('p') && image.closest('p').classList.add('image-container'));

  const breadcrumbs = document.querySelector('.topic__breadcrumbs');
  if (breadcrumbs && breadcrumbs.firstElementChild) {
    breadcrumbs.firstElementChild.childNodes.forEach(node => {
      if (node.nodeValue && node.nodeValue.includes('>')) {
        node.nodeValue = node.nodeValue.replace(">", "/");
      }
    });
  }

  const spans = document.querySelectorAll('span');
  if (spans.length) {
    spans.forEach(span => {
      if (span.innerHTML === '&nbsp;') {
        span.remove();
      }
    });
  }

  // example exapand
  const examplesToggle = document.querySelectorAll('a[class="dropdown-toggle"]');

  if (examplesToggle.length) {
    document.querySelectorAll('.dropdown-toggle-body').forEach(dropdown => dropdown.style.display = 'none');

    examplesToggle.forEach(example => {
      const parentP = example.parentElement.tagName === 'p' ? example.parentElement : example.closest('p');
      const nextSiblingDiv = parentP.nextElementSibling;
      if (nextSiblingDiv && nextSiblingDiv.tagName === 'DIV') {
        parentP.classList.add('example');
        const id = nextSiblingDiv.id;
        const button = document.createElement('a');
        const obj = nextSiblingDiv.attributes;
        let expandState = "0";
        parentP.setAttribute('data-state', expandState);
        button.classList.add('btn-example');
        button.innerHTML = locale === "ru" ?
          '<span class="btn-example__up">Свернуть</span><span class="btn-example__down">Посмотреть полностью</span>' :
          '<span class="btn-example__up">Hide</span><span class="btn-example__down">Show all</span>';
        button.addEventListener('click', (evt) => {
          evt.preventDefault();
          window.HMToggle('toggle', id);
          Object.entries(obj).map(el => {
            if (el[1].name === "hm.state") {
              expandState = el[1].value;
              parentP.setAttribute('data-state', expandState);
            }
          });
        });
        parentP.append(button);
        example.setAttribute('href', 'javascript:void(0)');
        example.after(nextSiblingDiv);
      }
    });
  }

  const pArray = document.querySelectorAll('.p_Normal');
  if (pArray.length) {
    pArray.forEach(p => {
      if (p.innerHTML === '&nbsp;') {
        p.remove();
      }
    })
  }

  const examples = document.querySelectorAll('p.p_CodeExample');
  if (examples.length) {
    examples.forEach(example => {

      const childSpan = example.firstElementChild;
      if (childSpan &&
        childSpan.innerText.toLowerCase().includes('начало') &&
        childSpan.innerText.toLowerCase().includes('примера')) {
        createNotation(example, 'example', 'примера');
      }
      if (childSpan &&
        childSpan.innerText.toLowerCase().includes('начало') &&
        childSpan.innerText.toLowerCase().includes('внимание')) {
        createNotation(example, 'warning', 'внимание');
      }
      if (childSpan &&
        childSpan.innerText.toLowerCase().includes('начало') &&
        childSpan.innerText.toLowerCase().includes('примечание')) {
        createNotation(example, 'comment', 'примечание');
      }
    })
  }

  //small icon
  const icons = document.querySelectorAll('.content img');
  if (icons.length) {
    icons.forEach((icon, idx) => {
      const iconWidth = parseInt(icon.width);
      const floated = icon.style.float;
      (floated !== '') && icon.classList.add('img-float--' + floated);
      if (iconWidth < 200) {
        icon.classList.add('small-img');
        const iconHeight = parseInt(icon.height);
        if (iconWidth > 70 && iconHeight > 70 && iconHeight < 120 && idx === 0) {
          icon.classList.add('float-img');
        }
      }
    })
  }

}

function stickyHeader() {
  var lastScrollTop = 0;
  var delta = 15;
  $(window).on('scroll', function () {
    var st = $(this).scrollTop();
    if (Math.abs(lastScrollTop - st) <= delta)
      return;
    if ((st > lastScrollTop) && (lastScrollTop > 0)) {
      $("body").addClass("--header-hidden");
      $('.solution-select__list').removeClass('active')
      $('.solution-select').removeClass('active')
    } else {
      $("body").removeClass("--header-hidden");
      $('.solution-select__list').removeClass('active')
      $('.solution-select').removeClass('active')
    }
    lastScrollTop = st;
  }).trigger('scroll');
}


// заменяет иконку содержания на мобилках-планшет

if (screen.width < 901) {
  iconsTableOfContents()
}

$(window).resize(function () {

  if (screen.width < 901) {
    iconsTableOfContents()
  }
});

function iconsTableOfContents() {
  const toggledLi = document.querySelectorAll('li[data-bg*="collapsed"]');
  toggledLi.forEach(li => li.classList.add('toggled'));
}

$(document).ready(function () {
  prepareContent();
  toggleUlsHandler();
  stickyHeader();

  $("#side-menu").load("index.html #toc", function () {
    window.addEventListener('popstate', () => {
      // $(".article-inner").empty();
      $('#article').load(`${window.location.href} .article-inner`, function () {
        loadBottomLinks();
        prepareContent();
      });
    })
    loadBottomLinks();
    hideAllSideUls();
    toggleUlsHandler();
    //var pageTitle = document.title;
    //var metaDecsription = $("meta[name='description']");
    //var metaDescriptionInitial = metaDescription.attr('content');

    const menuItems = this.querySelectorAll('a');
    menuItems.forEach(item => {
      item.addEventListener('click', evt => {
        evt.preventDefault();
        const url = evt.target.nodeName === 'A' ? evt.target.href : evt.target.closest('a').href;
        const sideMenu = document.querySelector('.sidebar');
        const htmlTag = document.querySelector('html');
        const toggledLi = document.querySelectorAll('li[data-bg*="collapsed"]');

        window.scrollTo(0, 0);
        htmlTag.classList.remove('--locked');
        $('body').removeClass('index-page search-page');
        sideMenu.classList.remove('show-side-menu');

        if (toggledLi.length) {
          toggledLi.forEach(li => li.classList.add('toggled'));
        }

        toggleUlsHandler();

        if (url !== window.location.href) {
          if (!url.includes('javascript:void')) {
            $(".article-inner").empty();
            $('#article').load(`${url} .article-inner`, function () {
              history.pushState({}, null, url);
              //metaDecsription.attr('content', metaDescriptionInitial);
              loadBottomLinks();
              prepareContent();
            });
          } else {
            const _target = evt.target;
            const _targetUl = _target.parentElement.nextElementSibling;
            if (_target.nodeName === "SPAN" && _targetUl.nodeName === "UL" && _targetUl.classList.contains("hide-side-menu-item")) {
              _targetUl.querySelectorAll('a')[0].click();
            } else {
              const _ul = _target.parentElement.querySelectorAll('a')[0].nextElementSibling;
              if (_ul.nodeName === "UL") {
                _ul.querySelectorAll('a')[0].click();
              };
            }
          }
        }
      });
    });

    $.getScript("zoom_pageinfo.js", function () {
      const obj = pagedata.reduce((acc, words) => {
        const searchObj = {
          title: words[1],
          link: words[0]
        };
        return [...acc, searchObj];
      }, []);
      $('.search-form__input').each(function () {
        var _that = $(this);
        var _searchForm = _that.parent();
        _that.autocomplete({
          autoFocus: false,
          minLength: 2,
          focus: function (event, ui) {
            itemUiLinkSelected = ui.item.link;
          },
          source: function (request, response) {
            const results = obj.filter(item => item.title.toLowerCase().includes(request.term.toLowerCase()) && document.querySelector(`a[href="${item.link.slice(2)}"]`));
            const sliceResults = results.slice(0, 5);
            sliceResults.map(result => {
              const aItem = document.querySelector(`a[href="${result.link.slice(2)}"]`);

              if (aItem) {
                const parent = aItem.closest('li.heading1');
                result.breadcrumb = parent.querySelector('span.heading1').innerText;
              } else { }
            });

            response(sliceResults);
          }
        }).autocomplete("instance")._renderItem = function (ul, item) {
          return $("<li>")
            .append(`<a class="autocomplete__link" href='${item.link}'>${item.title} <span class="autocomplete__subtitle">${item.breadcrumb || ''}</span></a>`)
            .appendTo(ul);
        };

        _searchForm.keydown(function (event) {
          if (event.keyCode == 13 && itemUiLinkSelected !== "") {
            window.location.href = itemUiLinkSelected;
          }
        });
      });
    });

    $('.glossary-abc__nav a').on('click', function (e) {
      e.preventDefault();
      var target = $(this).attr('href');
      console.log($(this).parent().siblings());
      $('.glossary-abc__nav a').removeClass('--active');
      $(this).addClass('--active');
      $('html, body').animate({
        scrollTop: $(target).offset().top - 150
      }, 500);
    });

    // Хлебные крошки на странице поиска
    function findPrevBreadcrumbs(node, breadcrumbs) {
      var breadcrumbsNew = breadcrumbs || $('<div class="search-breadcrumbs"></div>');
      var prevParentEl = node.closest('ul') ? node.closest('ul').prev() : null;
      if (!prevParentEl[0] || prevParentEl[0].tagName !== 'A') {
        return breadcrumbsNew;
      }
      breadcrumbsNew.prepend('<span class="breadcrumbs-slash"> / </span>')
      breadcrumbsNew.prepend(prevParentEl.clone());
      return findPrevBreadcrumbs(prevParentEl, breadcrumbsNew);
    }

    $('.result_title a').each(function () {
      var bc = '';
      var currentArticleName = $(this);
      $('#toc a span').each(function () {
        var tocCurrentNode = $(this);
        if (tocCurrentNode.text().trim() === currentArticleName.text().trim()) {
          bc = findPrevBreadcrumbs(tocCurrentNode);
        }
      })

      bc ? currentArticleName.parent().after(bc) :
        currentArticleName.parent().parent().remove();
    });

  });
});

//let scrollPos = 0;
/* $('body').scroll(function () {
  let st = $(this).scrollTop();
  if (st > scrollPos) {
    $('.scroll-top').hide();
  } else {
    $('.scroll-top').show();
  }
  scrollPos = st;
});

$('.scroll-top').on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  });
}); */



//side menu mobile
const sideMenuIcon = document.querySelector('#side-menu-icon');
const htmlTag = document.querySelector('html');
const sideMenu = document.querySelector('#sidebar');
const closeButton = document.querySelector('#close');

if (sideMenuIcon) {
  sideMenuIcon.addEventListener('click', (evt) => {
    evt.preventDefault();
    sideMenu.classList.toggle('show-side-menu');
    htmlTag.classList.toggle('--locked');
  });
}

if (closeButton) {
  closeButton.addEventListener('click', e => {
    e.preventDefault();
    sideMenu.classList.remove('show-side-menu');
    htmlTag.classList.remove('--locked');
  });
}

var triggerTitleMegaGuide = false;
if (getTitleSite() === 'Mega Guide' || /hmftsearch.html/i.test(href)) {
  triggerTitleMegaGuide = true
}

function getTitleSite() {
  if (Boolean(document.querySelector("meta[property='og:title']"))) {
    return document.querySelector("meta[property='og:title']").getAttribute("content")
  }
}

// добавляет label, чтобы появились иконки поиска и очискти

const currentUrl = window.location.href;

if ( /http:\/\/localhost/i.test(currentUrl)|| /brix365.t-elma365\/en\/help/i.test(currentUrl) || /brix365.com\/en\/help/i.test(currentUrl) || /elma365.com\/ru\/help/i.test(currentUrl) || /elma365.com\/en\/help/i.test(currentUrl) || /elma365\/help\/ru/i.test(currentUrl) || /elma365\/help\/en/i.test(currentUrl) || /([\d+]{3}).(\d).(\d).(\d):([\d+]{4})\/index.html/i.test(currentUrl) || /([\d+]{3}).(\d).(\d).(\d)\/index.html/i.test(currentUrl)) {
  window.addEventListener('load', () => {
    const searchIcon = document.querySelector('#search-icon');
    const searchPanel = document.querySelector('#search-panel');
    const searchInput = searchPanel.querySelector('input[type="text"]');
    const heroSearch = document.querySelector('.hero__search');
    if (searchIcon) {
      searchIcon.addEventListener('click', (evt) => {
        console.log(searchIcon)
        evt.preventDefault()
        searchPanel.classList.toggle('show-search-panel');
        setTimeout(() => searchInput.focus(), 500);

        heroSearch.classList.add('hero__search--active');
      });
    } else {
      console.log('error')
    }
    if (searchInput) {
      const label = searchInput.closest('label');
      searchInput.addEventListener('blur', () => {
        searchPanel.classList.remove('show-search-panel');
        heroSearch.classList.remove('hero__search--active');
        if (searchInput.value) {
          label.classList.add('cross');
        } else {
          label.classList.remove('cross');
        }
      });
      searchInput.addEventListener('focus', () => {
        label.classList.add('cross');
      });
    }

    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.arrow-top').fadeIn()
      } else {
        $('.arrow-top').fadeOut()
      }
    })

    $('.arrow-top').click(function () {
      $('html, body').animate({ scrollTop: 0 }, 600);
      return false;
    })


    // очистить поиск
    if (document.querySelector('#reset-search')) {
      const resetButton = document.querySelector('#reset-search');
      resetButton.addEventListener('click', () => {
        searchInput.value = '';
      });
    }
  })
} else {
  window.addEventListener('load', () => {
    let wrapperSearch = document.querySelector('.ya-site-form__search-input-layout-l' +
      ' .ya-site-form__input');

    wrapperSearch.classList.add('search-form__label');

    const tagSpanIcons = document.createElement('span');
    tagSpanIcons.className = 'search__icon';
    tagSpanIcons.setAttribute('id', 'reset-search');
    wrapperSearch.prepend(tagSpanIcons);

    // const insertInnerHtml = document.querySelector('tr .ya-site-form__search-input-layout-l');
    // const divBlockHeroSearch = document.createElement('div');
    //
    // divBlockHeroSearch.classList.add('hero__search')
    // divBlockHeroSearch.innerHTML = `
    //   <a href="#" id="search-icon" class="hero__search-icon">
    //     <img src="search-black.svg" alt="search string">
    //   </a>
    //   <a href="#" id="side-menu-icon" class="hero__side-icon">
    //     <img src="side-menu-black.svg" alt="side menu">
    //   </a>
    // `;
    // setTimeout(() => {
    //   insertInnerHtml.appendChild(divBlockHeroSearch);
    // }, 1000);

    const searchIcon = document.querySelector('#search-icon');
    const searchPanel = document.querySelector('.ya-site-form.ya-site-form_bg_transparent.ya-site-form_inited_yes');
    const searchInput = searchPanel.querySelector('input[type="search"]');
    const heroSearch = document.querySelector('.hero__search');
    if (searchIcon) {
      searchIcon.addEventListener('click', (evt) => {
        console.log(searchIcon)
        evt.preventDefault()
        searchPanel.classList.toggle('show-search-panel');
        setTimeout(() => searchInput.focus(), 500);
        heroSearch.classList.add('hero__search--active');
      });
    }
    if (searchInput) {
      const div = searchInput.closest('.ya-site-form__input');
      searchInput.addEventListener('blur', searchWatch);

      function searchWatch() {
        searchPanel.classList.remove('show-search-panel');
        heroSearch.classList.remove('hero__search--active');
        if (searchInput.value !== '') {
          div.classList.add('cross');
        } else {
          div.classList.remove('cross');
        }
      }
      searchInput.addEventListener('focus', () => {
        div.classList.add('cross');
      });
    }

    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.arrow-top').fadeIn()
      } else {
        $('.arrow-top').fadeOut()
      }
    })

    $('.arrow-top').click(function () {
      $('html, body').animate({ scrollTop: 0 }, 600);
      return false;
    })

    // очистить поиск
    const resetButton = document.querySelector('#reset-search');
    resetButton.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      baseUrl = window.location.href.split("?")[0];
      window.history.pushState('name', '', baseUrl);
    });
  })

  searchFormHeader()
}

searchFormHeader()

function searchFormHeader() {
  $('.search-form').each(function () {
    $(this).on('submit', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      var searchStr = evt.target[0].value;
      if (searchStr.trim()) {
        if ((/elma365.com\/ru\/help/i.test(window.location.href) || /elma365.com\/en\/help/i.test(window.location.href) || /t-elma365.com/i.test(window.location.href) || /brix365.com\/en\/help/i.test(window.location.href) || /([\d+]{3}).(\d).(\d).(\d)/i.test(window.location.href) || /http:\/\/localhost/i.test(window.location.href)) && !triggerTitleMegaGuide) {
          window.location.href = `./search.html?query=${searchStr}`;
        }
        //фикс поиска, тест
        else {
          // window.location.href = `./hmftsearch.html?zoom_query=${searchStr}&zoom_per_page=10&zoom_and=1&zoom_sort=0`;
          window.location.href = `./search.html?query=${searchStr}`;
        }
      }
    });
  });
}

//search string

if (Boolean(document.querySelector('.ya-site-form__input.search-form__label')) || Boolean(document.querySelector('.searchheading'))) {
  const searchTitle = document.querySelector('.searchheading');
  const queryString = window.location.search;
  let currentPageNumber = null;

  const searchParams = queryString.split('&');
  searchParams.forEach(param => {
    const paramArr = param.split('=');
    if (paramArr[0] === 'zoom_page') {
      currentPageNumber = +paramArr[1];
    }
  })
  const searchWord = decodeURI(searchParams[0].split('=')[1]);
  searchTitle.innerText = locale === 'ru' ? 'Результаты поиска:' : 'Search results for:';
  const searchWordP = document.createElement('p');
  searchWordP.classList.add('search-word');
  searchWordP.innerText = searchWord;
  searchTitle.append(searchWordP);

  let pagesCount = "0";
  const resultPagesCount = document.querySelector('.result_pagescount');
  if (resultPagesCount) {
    pagesCount = parseInt(resultPagesCount.innerText.trim());
    resultPagesCount.remove();
  }

  function stylePagination(currentPage) {
    switch (currentPage) {
      case 'first-page': {
        resultPages[0].textContent = '<< < ';
        const span = document.createElement('span');
        span.classList.add('current-page');
        span.innerText = '1';
        resultPages[0].after(span);
        const aEnd = document.createElement('a');
        const urlEnd = `./hmftsearch.html?zoom_query=${searchWord}&zoom_page=${pagesCount}&zoom_per_page=10&zoom_and=1&zoom_sort=0`;
        aEnd.setAttribute('href', urlEnd);
        aEnd.textContent = ' >>';
        // resultPages[resultPages.length - 1].textContent = ' >>';
        resultPages[resultPages.length - 1].after(aEnd);
        resultPages[resultPages.length - 2].remove();
        resultPages[resultPages.length - 2].textContent = ' > ';
        break;
      }
      case 'last-page': {
        resultPages[resultPages.length - 1].textContent = `  > >>`;
        const span = document.createElement('span');
        span.classList.add('current-page');
        span.innerText = currentPageNumber;
        const aBegin = document.createElement('a');
        const urlBegin = `./hmftsearch.html?zoom_query=${searchWord}&zoom_page=1&zoom_per_page=10&zoom_and=1&zoom_sort=0`;
        aBegin.setAttribute('href', urlBegin);
        aBegin.textContent = '<< ';
        resultPages[resultPages.length - 1].before(span);
        // resultPages[0].textContent = '<< ';
        resultPages[1].before(aBegin);
        resultPages[0].remove();
        resultPages[1].textContent = '< ';
        break;
      }
      case 'default-page': {
        const aBegin = document.createElement('a');
        const aEnd = document.createElement('a');
        const urlBegin = `./hmftsearch.html?zoom_query=${searchWord}&zoom_page=1&zoom_per_page=10&zoom_and=1&zoom_sort=0`;
        const urlEnd = `./hmftsearch.html?zoom_query=${searchWord}&zoom_page=${pagesCount}&zoom_per_page=10&zoom_and=1&zoom_sort=0`;
        aBegin.setAttribute('href', urlBegin);
        aBegin.textContent = '<< ';
        aEnd.setAttribute('href', urlEnd);
        aEnd.textContent = ' >>';
        resultPages[1].before(aBegin);
        resultPages[0].remove();
        //resultPages[0].textContent = '<< ';
        //resultPages[0] = aBegin;
        resultPages[1].textContent = ' < ';
        resultPages[resultPages.length - 2].textContent = ' > ';
        //resultPages[resultPages.length - 1].textContent = ' >> ';
        resultPages[resultPages.length - 2].after(aEnd);
        resultPages[resultPages.length - 1].remove();
        break;
      }
      default:
        break
    }
  }

  const resultPagesNode = document.querySelector('.result_pages');
  const resultPages = resultPagesNode ? document.querySelector('.result_pages').childNodes : [];

  if (resultPages.length) {
    if (resultPages[0] && resultPages[0].textContent.trim() !== 'Result Pages:') {
      currentPage = 'first-page';
    } else if (!resultPages[resultPages.length - 2].innerHTML.includes('Next')) {
      currentPage = 'last-page';
    } else {
      currentPage = 'default-page';
    }

    stylePagination(currentPage);

    if (resultPages.length) {
      resultPages.forEach(node => {
        if (+node.textContent.trim() === currentPageNumber) {
          const nextElement = node.nextSibling;
          const span = document.createElement('span');
          span.classList.add('current-page');
          span.innerText = currentPageNumber;
          nextElement.before(span);
          node.remove();
        }
      })
    }
  }

  const summary = document.querySelectorAll('.summary');
  if (summary.length > 0 && locale === "ru") {
    const count = parseInt(summary[0].innerText.trim());
    summary[0].innerText = count ? `Найдено совпадений: ${count}` : summary.innerText = 'Совпадений не найдено';
  }
}

// подменяет текст в абзаце в зависимости от атрибута lang

// if (document.documentElement.lang === "en") {
//   $('#found_typo').html('<b>Found a typo?</b> Highlight the text, press ctrl + enter and notify us')
// } else if (document.documentElement.lang === "ru") {
//   $('#found_typo').html('<b>Нашли опечатку?</b> Выделите текст, нажмите ctrl + enter и оповестите нас')
// }


$(window).on('load', () => {
  // правит текст в фильтре результатов поиска
  // $('.b-loader__wrapper').css('opacity', 0);
  function replace() {

    var intervalReplace = setInterval(() => {
      if ($('tr td.b-head__r .b-head__found') && $('b-pseudo-link.b-pseudo-link_is-bem_yes.i-bem.b-pseudo-link_js_inited') && $('.b-specification-item_htmlcss_yes')) {
        t();
      }
    }, 200);

    setTimeout(() => {
      clearInterval(intervalReplace);
      // }, 180000);
    }, 10000);

    function t() {

      if (document.documentElement.lang === 'en') {
        textResult('нашёл', 'Matches found', 'all resourses', 13);
        textFindSection('Search through ');
      }

      if (document.documentElement.lang === 'ru') {
        textResult('нашёл', 'Найдено совпадений', 'всем ресурсам', 18);
        textFindSection('Искать по ');
      }

      function textResult(textFound, textFoundRes, textAny, n) {
        var text = $('tr td.b-head__r .b-head__found').text(),
          searchAny = $('.b-dropdowna__switcher .b-pseudo-link_is-bem_yes').text();
        var e = text.replace(textFound, textFoundRes),
          t = searchAny.replace('любой', textAny);
        $('tr td.b-head__r .b-head__found').text(e.substring(0, n) + ': ' + parseInt(text.match(/\d+/)));
        $('.b-dropdowna__switcher .b-pseudo-link_is-bem_yes').text(t);

        if ($('tr td.b-head__r .b-head__found').text().indexOf('найдёт') == 0) {
          $('tr td.b-head__r .b-head__found').css('display', 'none');
        }

        if ($('b-pseudo-link.b-pseudo-link_is-bem_yes.i-bem.b-pseudo-link_js_inited').text().indexOf('любой') == 0) {
          $('tr td.b-head__r .b-head__found').css('display', 'none');
        }

        // скрывает исходники поиска

        $('.b-head_type_search-simple').css('opacity', 1);
      }


      // замена слова Раздел на Искать в

      function textFindSection(textResSection) {
        var element = document.querySelector('.b-specification-item_htmlcss_yes');

        if (Boolean(element)) {
          for (var i = 0; i < element.childNodes.length; ++i) {
            if (i > 0) {
              if (element.childNodes[0].textContent.indexOf('раздел') === 0) {
                var htmlTag = [];
                htmlTag.push(element.childNodes[i]);
                element.textContent = textResSection;
                htmlTag.forEach(item => {
                  element.appendChild(item);
                })
              }
            }
          }
        }
      }
    }
  }

  replace();

  // поиск по url в выводе результатов и подставление перед заголовком результата

  function addElementSubsection() {
    var intervalAddElementSubsection = setInterval(() => {
      if ($('.b-serp-item') && $('.subsection-title')) {
        e();
      }
    }, 200);

    setTimeout(() => {
      clearInterval(intervalAddElementSubsection);
      // }, 180000)
    }, 10000)

    function e() {
      $('yass-li.b-serp-item').each(function (index) {

        // Удаляет 2 элемент у результатов поиска (обычно не ссылка)

        $('.b-serp-url__item[data-mtime]').remove();

        // Поиск по url для вывода разделов

        var textContent = $('yass-li.b-serp-item .b-serp-url__item')[index].textContent;
        switch (true) {

          // ELMA365
          case (/elma365.com\/ru\/help/i.test(textContent)):
            subsectionTitle('Справка');
            break;
          case (/academy.com/i.test(textContent)):
            subsectionTitle('ELMA Academy');
            break;
          case (/tssdk.elma/i.test(textContent)):
            subsectionTitle('TS SDK');
            break;
          case (/exchange.elma/i.test(textContent)):
            subsectionTitle('ELMA365 Exchange');
            break;

          // Английская версия
          case (/en\/help/i.test(textContent)):
            subsectionTitle('Help');
            break;

          // rpa
          case (/rpa.ai\/ru/i.test(textContent)):
            subsectionTitle('RPA');
            break;

          // ELMA4
          case (/ru\/help4\/ecm/i.test(textContent)):
            subsectionTitle('ECM+');
            break;
          case (/ru\/help4\/crm/i.test(textContent)):
            subsectionTitle('CRM+');
            break;
          case (/ru\/help4\/projects/i.test(textContent)):
            subsectionTitle('Проекты');
            break;
          case (/elma-bpm.ru\/help4/i.test(textContent)):
            subsectionTitle('BPM');
            break;
          case (/ru\/KB/i.test(textContent) || /elma-bpm.ru\/…help/i.test(textContent) || /help/i.test(textContent)):
            subsectionTitle('База знаний');
            break;
        }

        function subsectionTitle(text) {
          if ($('.subsection-title')[index]) {
            $('.subsection-title')[index].textContent = text;
          } else {
            var newBlockDiv = document.createElement('div');
            newBlockDiv.classList.add('subsection-title');
            newBlockDiv.textContent = text;
            $('.b-serp-item__title')[index].prepend(newBlockDiv);
          }
        }

        $('.b-serp-item__title-link')[index].removeAttribute('target');
      })
    }
  }

  addElementSubsection();

  // обновляет результат по интервалу при изменении url страницы

  $(window).bind('hashchange', function () {

    if ($('tr td.b-head__r .b-head__found')) {
      var intervalTimer = setInterval(() => {
        replace();
        addElementSubsection();
      }, 200);

      // через 3 минуты интервал останавливается (время взято примерно, чтобы успело все прогрузиться)
      setTimeout(() => {
        clearInterval(intervalTimer);
        // }, 180000);
      }, 10000);
    } else {
      replace();
      addElementSubsection();
    }
  });
})

const leadhandler = "https://web.s-elma365.ru";

var rootNode = document.createElement('div');
document.body.appendChild(rootNode);
var typo = new TypoReporter({
  formId: '1FAIpQLSfXEIXAFoOiHgetf0reIjWrOAw6V7KCZrhAv8VVD6WL7Rs46g', // required, see previous step

  // Optional example stuff below
  locale: getLocale(), // optional language, defaults to 'en'
  // translations: { // optinal object with translated strings
  //     fr: {
  //         // see source code for keys to translate
  //     },
  //     ru: {
  //
  //     }
  // },
  offset: 100, // amount of context text to grab from before and after the selection, defaults to 50
  endpointUrl: leadhandler + '/api/baglist/', // optional, defaults to Google Forms
  snippetFieldName: 'typo', // optional, if using custom form
  commentFieldName: 'comment', // optional, if using custom form
  urlFieldName: 'url' // optional, if using custom form
}, rootNode);

$(document).on("focus", ".fill_listener", function () {
  //console.log("test");
  $(this).parent().addClass('focused');
});

$(document).on("blur", ".fill_listener", function () {
  $(this).parent().removeClass('focused');
});
$(document).on("change", ".fill_listener", function () {
  if ($(this).val().length) {
    $(this).parent().addClass('filled');
  } else {
    $(this).parent().removeClass('filled');
  }
});

function feedbackSubmit() {
  $('#feedback-form').on('submit', function () {
    var $form = $(this);
    var formData = $form.serializeArray().slice(0, -1);
    var context = {};

    $(formData).each(function (index, obj) {
      if (obj.name === 'useful' && obj.value === 'true') {
        context.other = '';
        context.useful = true;
        context.category = [{
          'code': '',
          'name': ''
        }]
      }

      if (obj.name === 'useful' && obj.value === 'false') {
        $(formData).each(function (index, obj) {
          if (obj.name === 'other') {
            context.other = obj.value
          }
          context.useful = false;
          if (obj.name === 'category') {
            context.category = [{
              'code': obj.value,
              'name': $form.find('option[value="' + obj.value + '"]').text()
            }]
          }
        })
      }
    })

    context.produkt = ['6b55aead-f008-42c7-9186-0806c06d4f2c'];
    context.link = window.location.href;
    var data = {
      context
    };
    var request = $.ajax({
      type: "POST",
      url: leadhandler + '/api/feedback/create',
      data: JSON.stringify(data),
    }).fail(function (response) {
      return response;
    }).done(function (response) {
      return response;
    });
    return false;
  });
}

feedbackSubmit()

$(document).ready(function () {
  $('.feedback-popup-close').on('click', function () {
    $(this).parent().hide();
  })

  $('#question__popup, .question-xs').on('submit', function () {
    var $form = $(this),
        textarea = $form.find('textarea[name="help_question"]'),
        //formData = $form.serializeArray().slice(0, -1),
        context = {}

    context.other = textarea.val();
    context.category = [{
      'code': 'question',
      'name': 'Задать вопрос'
    }];
    context.produkt = ['6b55aead-f008-42c7-9186-0806c06d4f2c'];
    context.link = window.location.href;
    var data = {
      context
    };
    var request = $.ajax({
      type: "POST",
      url: leadhandler + '/api/feedback/create',
      data: JSON.stringify(data),
    }).fail(function (response) {
      return response;
    }).done(function () {
      $('.question__popup').parent().find('.question-success').removeClass('hidden')
      setTimeout(() => {
        $('.question-xs').attr('style', 'display:none;')
        textarea.val('')
      })
      setTimeout(() => {
       $('.question__popup').parent().find('.question-success').addClass('hidden')
        $('.question').removeClass('active')
      }, 3000)
    });
    return false;
  })
});

function question() {
  $('.mobile-question-popup').on('click', function () {
    const questionPopup = $(this).parent().find('.question-xs')

    questionPopup.attr('style', 'display:block;')
    setTimeout(() => {
      $(this).parent().find('textarea[name="help_question"]').focus()
    }, 200)
  })

  $(document).mouseup(function (e) {
    let container = $(".question-xs");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.attr('style', 'display:none;')
    }
  })

  $('.question-xs .close').on('click', function () {
    $(this).parent().parent().attr('style', 'display:none;')
  })

  $('.question-xs').on('submit', function () {
    $(this).parent().find('.question-success-xs').removeClass('hidden')
    $(this).removeClass('active')
    setTimeout(() => {
      $(this).parent().find('.question-success-xs').addClass('hidden')
      $(this).addClass('active')
    }, 3000)
  })
}

question()

$(document).click(function (e) {

  if ($(e.target).closest('.ReportTypo-popup').length != 0) return false;
  $('.ReportTypo').fadeOut(100);
});


$(document).click(function (e) {
  if ($(e.target).closest('.ReportTypo-popup').length != 0) return false;
  $('.ReportTypo').fadeOut(100);

});


jQuery(function ($) {
  $(document).mouseup(function (e) { // ������� ����� �� ���-���������
    var div = $("#feedback-form"); // ��� ��������� ID ��������
    if (!div.is(e.target) // ���� ���� ��� �� �� ������ �����
      && div.has(e.target).length === 0) { // � �� �� ��� �������� ���������
      $('.feedback-form').find('input:checked').removeAttr('checked');
    }
  });
});

function feedback() {
  const yesLabel = document.getElementById('feedback__useful_yes');
  const thxWindow = document.getElementById('feedback__popup_thx');
  const noLabel = document.getElementById('feedback__useful_no');
  const feedbackWhyPopup = document.getElementById('feedback__popup_why');
  const form = document.getElementById('feedback-form');
  const otherInput = document.getElementById('other_reason')
  const otherPopup = document.getElementById('feedback__popup-other')
  const feedbackOtherBtn = document.querySelector('.feedback__other-btn')

  const inputs = [...document.querySelectorAll('#feedback__popup_why input[type="radio"]')]
  const allRadio = inputs.filter(item => item.id !== 'other_reason')

  allRadio.forEach(item => item.addEventListener('change', function () {
    $(this).closest('#feedback-form').submit();

    thxWindow.style.display = 'block';

    setTimeout(() => {
      thxWindow.style.display = 'none';
    }, 3000);

  }))

  if (Boolean(otherInput)) {
    otherInput.addEventListener('change', (e) => {
      if (e.target.checked) {
        feedbackWhyPopup.style.display = 'none';
        otherPopup.style.display = 'block';
        $('.feedback__popup').find('textarea[name="other"]').focus()

        feedbackOtherBtn.addEventListener('click', function () {
          otherPopup.style.display = 'none';
          $('#feedback-success-popup').show()
          setTimeout(() => {
            $('#feedback-success-popup').hide()
          }, 3000);
        })
      } else {
        e.target.checked = 'false'
      }

    })
  }

  if (Boolean(feedbackWhyPopup)) {
    document.addEventListener('click', (e) => {
      const target = e.target;
      feedbackWhyPopup.style.display = 'none';
      thxWindow.style.display = 'none';

      if (target.matches('#feedback__useful_no')) {
        feedbackWhyPopup.style.display = 'block';
      }

      if (target.matches('#feedback__useful_yes')) {
        thxWindow.style.display = 'block';

        $('#feedback__useful_yes[type=radio]').on('change', function () {
          $(this).closest('#feedback-form').submit();

          setTimeout(() => {
            thxWindow.style.display = 'none';
          }, 3000);
        });
      }

      if (!target.closest('#feedback__popup-other')) {
        otherPopup.style.display = 'none'
      }
    });
  }
}

feedback()

// находит элемент на странице и добавляет id #table - mobile - desktop_size

$(window).on('load', function () {
  if (/processing-time/i.test(window.location.href) && document.querySelectorAll('main article section div')[1]) {
    let el = document.querySelectorAll('main article section div')[1];
    el.setAttribute('id', 'table-mobile-desktop_size');
  }
});

if (document.querySelector('#side-menu')) {
  let sideMenu = document.querySelector('#side-menu');

  sideMenu.addEventListener('click', e => {
    let elem = e.target.textContent

    if (/обработки обращения/i.test(elem)) {
      var intervalTimer = setInterval(() => {
        if (/processing-time/i.test(window.location.href) && document.querySelectorAll('main article section div')[1]) {
          let el = document.querySelectorAll('main article section div')[1];
          el.setAttribute('id', 'table-mobile-desktop_size');
        }
      }, 200);

      setTimeout(() => {
        clearInterval(intervalTimer);
      }, 10000);
    }
  })
}

//аккордеон

if (document.getElementsByClassName("accordion-btn__show")) {
  var showAccordionBtn = document.querySelector(".accordion-btn__show");
  var elementAccordionHide = document.querySelector('.accordion__hide');
  var linearGradient = document.querySelector('.linear-gradient');
  var heightAccordionElem = document.querySelector('.card-stack-50').scrollHeight


  var t = false;
  showAccordionBtn.addEventListener('click', () => {

    switch (true) {
      case (showAccordionBtn.querySelector('.accordion-btn__text').classList.contains('arrow__show')):
        elementAccordionHide.classList.add('accordion__show');
        elementAccordionHide.style.maxHeight = heightAccordionElem + 'px';
        elementAccordionHide.classList.remove('accordion__hide');
        showAccordionBtn.querySelector('.accordion-btn__text').classList.remove('arrow__show');
        showAccordionBtn.querySelector('.accordion-btn__text').classList.add('arrow__hide');

        setTimeout(() => {
          linearGradient.classList.remove('linear-gradient')
          showAccordionBtn.querySelector('p').textContent = 'Свернуть'
        }, 1000)
        break;

      case (showAccordionBtn.querySelector('.accordion-btn__text').classList.contains('arrow__hide')):
        elementAccordionHide.classList.add('accordion__hide');
        elementAccordionHide.classList.remove('accordion__show');
        elementAccordionHide.style.maxHeight = '';
        showAccordionBtn.querySelector('.accordion-btn__text').classList.add('arrow__show');

        setTimeout(() => {
          showAccordionBtn.querySelector('.accordion-btn__text').classList.remove('arrow__hide');
          linearGradient.classList.add('linear-gradient')
          showAccordionBtn.querySelector('p').textContent = 'Показать всё';
        }, 1000)
        break;
    }
  })
}

//end аккордеон

//accordion

(function () {
  if (document.querySelector('.accordion__items')) {

    var btn = document.querySelectorAll(".accordion__item-question");
    var dehiscentItems = document.querySelectorAll(".accordion__item-question-answer");

    btn.forEach((item, key) => {
      item.addEventListener('click', function () {
        var nextEl = this.nextElementSibling

        if (nextEl.style.maxHeight) {
          removeActiveClass()
        } else {
          removeActiveClass()
          this.classList.toggle('accordion__active')
          nextEl.style.maxHeight = nextEl.scrollHeight + "px";
          nextEl.style.marginBottom = "15px";
        }
      })
    })

    function removeActiveClass() {
      btn.forEach(item => {
        item.classList.remove('accordion__active')
      })

      dehiscentItems.forEach(i => {
        i.style.maxHeight = null
        i.style.marginBottom = null
      })
    }
  }
})()

//accordion
