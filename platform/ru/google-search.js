var currentLocalHref = window.location.href,
    currentLang = document.documentElement.lang;

const LOCALES_SELECT_MENU = {
    ru: {
        platform: 'Платформа',
        ecm: 'ECM',
        crm: 'CRM',
        projects: 'Проекты',
        business_solutions: 'Бизнес-решения',
        service: 'Service',
    },
    en: {
        platform: 'Platform',
        ecm: 'ECM',
        crm: 'CRM',
        projects: 'Projects',
        business_solutions: 'Business Solutions',
        service: 'Service',
    }
}



document.addEventListener('DOMContentLoaded', () => {
    if (document.visibilityState === 'visible') {
        hideAllSideUls();
    }
});

function removeCollapsedClass(node, tagName, className) {
    const closestNode = node.closest(tagName);
    if (!closestNode) return;
    closestNode.classList.remove(className);
    removeCollapsedClass(closestNode.parentElement, tagName, className);
}

function hideAllSideUls() {
    const hidingMenu = document.querySelectorAll('#toc li ul');
    hidingMenu.forEach(item => {
        item.classList.add('hide-side-menu-item');
        item.closest('li').classList.add('collapsed');
    });
}

function expandCurrentActiveLink() {
    const toc = document.querySelector('#toc');
    if (!toc) return;

    const currentPage = location.pathname.split('/').pop();
    let currentLink = toc.querySelector(`a[href="${currentPage}"]`);

    // 👉 Если не нашли текущую ссылку, ищем первую вложенную внутри группы
    if (!currentLink) {
        const groups = toc.querySelectorAll('a[href="javascript:void(0)"]');
        for (const group of groups) {
            const firstChildLink = group.closest('li')?.querySelector('ul a[href]:not([href="javascript:void(0)"])');
            if (firstChildLink?.href.includes(currentPage)) {
                currentLink = firstChildLink;
                break;
            }
        }
    }

    if (!currentLink) return;

    currentLink.classList.add('active-side-menu');

    let node = currentLink.parentElement;
    while (node && node !== toc) {
        if (node.tagName === 'LI') {
            node.classList.remove('collapsed');

            const nestedUl = node.querySelector('ul');
            if (nestedUl) {
                nestedUl.classList.remove('hide-side-menu-item');
            }

            const hasActive = node.querySelector('a.active-side-menu');
            if (hasActive && node.dataset?.bg) {
                const [, collapsedMinus] = node.dataset.bg.split(';');
                node.style = `background:url(collapsed-minus.png) no-repeat;`;
            }
        }

        if (node.tagName === 'UL') {
            node.classList.remove('hide-side-menu-item');
        }

        node = node.parentElement;
    }

    ////твой код
    const parentLi = currentLink.closest('ul')?.closest('li');
    const parentLink = parentLi?.querySelector('a[href="javascript:void(0)"]');
    if (parentLink && parentLi?.dataset?.bg) {
        const [, collapsedMinus] = parentLi.dataset.bg.split(';');
        parentLi.style = `background:url(collapsed-minus.png) no-repeat;`;
        parentLi.classList.remove('collapsed');
        const childUl = parentLi.querySelector('ul');
        if (childUl) childUl.classList.remove('hide-side-menu-item');
    }

    ////твой код

    setTimeout(() => {
        scrollToSelector('.active-side-menu');
    }, 100);
}

function tryHideSideUlsWhenActive() {
    const spanText = document.querySelector('span')?.textContent;
    const headingText = document.querySelector('.f_Heading1')?.textContent;

    const handle = () => {
        hideAllSideUls();
        expandCurrentActiveLink();

    };

    if (document.visibilityState === 'visible') {
        handle();
    } else {
        if (spanText !== headingText) {
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') {
                    handle();
                }
            }, { once: true });
        }
    }
}


document.addEventListener('DOMContentLoaded', tryHideSideUlsWhenActive);

//текст перед результатами поиска
const NOTIFICATION_TEXT = {
    ru: {
        elma365ru: 'Поиск по справке ELMA365, TS&nbsp;SDK, Community и&nbsp;Академии&nbsp;ELMA',
        elma4: 'Поиск по справке ECM+, CRM+, Проектам и&nbsp;Базe&nbsp;знаний',
        rpa: 'Поиск по справке ELMA RPA'
    },
    en: {
        elma365en: 'Search in BRIX365 Help Center, TS&nbsp;SDK',
    },
    error: {
        ru: {
            elma365: ['Произошла ошибка', 'Повторите попытку позже.']
        },
        en: {
            elma365: ['There seems to be an error', 'Try again later']
        }
    },
    noResults: {
        ru: {
            elma365: ['По вашему запросу ничего не найдено', 'Попробуйте изменить условия поиска.']
        },
        en: {
            elma365: ['No matches found for your search', 'Try modifying your search criteria']
        }
    }
}

if (/elma365.com\/ru\/help/i.test(currentLocalHref) || /elma365.com\/en\/help/i.test(currentLocalHref) || /http:\/\/127.0.0.1/i.test(currentLocalHref) || /http:\/\/localhost/i.test(currentLocalHref)) {
    // поиск google

    var widthWindow = window.outerWidth;
    if (widthWindow > 768) {
        var maxVisible = 10;
    } else {
        var maxVisible = 5;
    }

    var outputResultStart = true,
        requestValue;

    var configPaginate = {
        total: 10,
        htmlContent: undefined,
        page: 1,
        totalResults: Number
    }

    var TOTAL_RESULT_G = {
        ru: 'Найдено совпадений:',
        en: 'matches found.'
    }

    var flagCheckTotalRes = true;

    var CONFIG = {
        url: 'https://www.googleapis.com/customsearch/v1?',
        apikey: 'AIzaSyDh75ZnNZYjKkrKswfoMiQ-XBjQpx8V-Vk',
        ru: {
            cx: '9d6b6310512dc5020'
        },
        en: {
            cx: 'd1f232b5a7dd59e18'
        }
    };

    // проверка общего кол-ва результатов с конца пагинации до первого найденного(исключает не рабочую пагинацию)
    async function refinementResults(start) {
        var requestUrl = CONFIG.url + 'key=' + CONFIG.apikey + '&cx=' + CONFIG[currentLang].cx + '&q=' + requestValue + '&start=' + start;

        await getResultsGoogle(requestUrl)
            .then(results => {
                if (results.items !== undefined) {
                    flagCheckTotalRes = false;
                    configPaginate.total = (start - 1) / 10 + 1
                }
            })
    }

    // Запрос к google для получения результатов ч.1
    async function requestServer(start = 0) {
        var requestUrl = CONFIG.url + 'key=' + CONFIG.apikey + '&cx=' + CONFIG[currentLang].cx + '&q=' + requestValue + '&start=' + start;

        await getResultsGoogle(requestUrl)
            .then(async results => {
                await outputResult(results)
            })
            .catch(e => {
                document.querySelector('.search-res__items').innerHTML = `<div class="search-res__notice search-res__notice_error">
        <img src="./warning.svg" alt="warning">
           <div class="search-res__notice-description">
              <p class="notice__title">${NOTIFICATION_TEXT.error[currentLang].elma365[0]}</p>
              <p class="notice__description">${NOTIFICATION_TEXT.error[currentLang].elma365[1]}</p>
           </div>
        </div>`;
            })
    }

    // Запрос к google для получения результатов ч.2
    async function getResultsGoogle(url) {
        try {
            return await $.ajax({
                url: url,
                type: 'GET'
            })
        } catch (error) {
            console.error('Ошибка в получении результатов с google:', error.responseText)
        }
    }

    // Вывод результатов на странице
    async function outputResult(results) {
        var res = results.items,
            itemsSearch = document.querySelector('.search-res__items'),
            html;

        itemsSearch.innerHTML = '';

        // формирует вывод результата
        if (res !== undefined) {
            html = res.map(function (item) {
                return `
     <li class="search-res__item">
       <span class="search-res__item-category">${outputCategoryResult(item['link'])}</span>
       <span class="search-res__item-category search-res__item-category_subcategory">${outputSubCategoryResult(item['link'])}</span>
       <a href="${item['link']}" class="search-res__item-title">${item.title}</a>
       <p class="search-res__item-description">${item.htmlSnippet}</p>
       <p class="search-res__item-link">${item.link}</p>
     </li>
   `
            }).join(' ')
        } else {
            html = `
     <div class="search-res__notice search-res__notice_no-result">
           <div class="search-res__notice-description">
              <p class="notice__title">${NOTIFICATION_TEXT.noResults[currentLang].elma365[0]}</p>
              <p class="notice__description">${NOTIFICATION_TEXT.noResults[currentLang].elma365[1]}</p>
           </div>
        </div>
   `
        }

        // itemsSearch.insertAdjacentHTML('afterbegin', html.join(' '))
        // генерирует кол-во всего страниц в пагинации
        if (Number(results.searchInformation.totalResults) > 100) {
            configPaginate.total = 10;
        } else {
            var t = []
            for (var i = 0; i < Number(results.searchInformation.totalResults); i += 10) {
                t.push(i)
            }
            if (flagCheckTotalRes) {
                for (var i = t.length; i < t.length + 1 && i > 0; i--) {
                    if (flagCheckTotalRes) {
                        if (i > 0) {
                            await refinementResults(i * 10 - 10 + 1)
                        }
                    }
                }
            }
            // configPaginate.total = t.length;
        }

        configPaginate.htmlContent = html
        configPaginate.totalResults = Number(results.searchInformation.totalResults)

        if (outputResultStart) {
            itemsSearch.insertAdjacentHTML('afterbegin', html)
            outputResultStart = false

            if (Number(results.searchInformation.totalResults) > 10) {
                await paginationGenerate(configPaginate)
                // выводит кол-во найденных результатов
                outputAllResults()
            }
        }
    }

    if (configPaginate.totalResults > 10) {
        paginationGenerate(configPaginate)
    }

    // создает пагинацию
    function paginationGenerate({total, page}) {
        $('.pagination__items').bootpag({
            total: total,
            page: page,
            maxVisible: maxVisible,
            leaps: true,
            firstLastUse: true,
            first: '<span class="prev arrow-pagination"><img src="double-arrow-prev.svg" alt="arrow"></span>',
            last: '<span class="prev arrow-pagination"><img src="double-arrow-last.svg" alt="arrow"></span>',
            prev: '<span class="prev arrow-pagination"><img src="one-arrow-prev.svg" alt="arrow"></span>',
            next: '<span class="prev arrow-pagination"><img src="one-arrow-last.svg" alt="arrow"></span>',
            wrapClass: 'pagination',
            activeClass: 'active',
            disabledClass: 'disabled',
            nextClass: 'next',
            prevClass: 'prev',
            lastClass: 'last',
            firstClass: 'first'
        }).on("page", async function (event, num) {
            configPaginate.page = num - 1

            if (configPaginate.page === 0) {
                configPaginate.page = 0
            } else {
                configPaginate.page = configPaginate.page * 10 + 1
            }

            await requestServer(configPaginate.page)
            $(".search-res__items").html(configPaginate.htmlContent);
        }).find('.pagination');
    }

    // выводит кол-во найденных результатов
    function outputAllResults() {
        if (document.documentElement.lang === 'ru') {
            document.querySelector('.search-res__total').innerText = TOTAL_RESULT_G.ru + ' ' + String(configPaginate.totalResults);
        } else {
            document.querySelector('.search-res__total').innerText = configPaginate.totalResults + ' ' + TOTAL_RESULT_G.en;
        }
    }

    //выводит текст перед результатами поиска
    function outputTitleResults() {
        var text = '';

        switch (true) {
            //Рус
            case (/elma365.com\/ru\/help/i.test(currentLocalHref)):
                text = NOTIFICATION_TEXT.ru.elma365ru;
                break;
            case (/ru\/help4\//i.test(currentLocalHref)):
                text = NOTIFICATION_TEXT.ru.elma365en;
                break;
            case (/rpa.ai\/ru/i.test(currentLocalHref)):
                text = NOTIFICATION_TEXT.ru.rpa;
                break;
            case (/localhost/i.test(currentLocalHref) && currentLang === 'ru'):
                text = NOTIFICATION_TEXT.ru.elma365ru;
                break;

            //Анг
            case (/brix365.com\/en\/help/i.test(currentLocalHref)):
                text = NOTIFICATION_TEXT.en.elma365en;
                break;

            case (/localhost:/i.test(currentLocalHref) && currentLang === 'en'):
                text = NOTIFICATION_TEXT.en.elma365en;
                break;
        }

        return text;
    }

    function outputCategoryResult(categoryUrl) {
        var textContent = '';

        switch (true) {
            // ELMA365
            case (/elma365.com\/ru\/help/i.test(categoryUrl)):
                textContent = 'Справка';
                break;
            case (/academy.com/i.test(categoryUrl)):
                textContent = 'ELMA Academy';
                break;
            case (/tssdk.elma/i.test(categoryUrl)):
                textContent = 'TS SDK';
                break;
            case (/community.elma/i.test(categoryUrl)):
                textContent = 'ELMA365 Community';
                break;

            // Английская версия
            case (/en\/help/i.test(categoryUrl)):
                textContent = 'Help';
                break;

            // rpa
            case (/rpa.ai\/ru/i.test(categoryUrl)):
                textContent = 'RPA';
                break;

            // ELMA4
            case (/ru\/help4\/ecm/i.test(categoryUrl)):
                textContent = 'ECM+';
                break;
            case (/ru\/help4\/crm/i.test(categoryUrl)):
                textContent = 'CRM+';
                break;
            case (/ru\/help4\/projects/i.test(categoryUrl)):
                textContent = 'Проекты';
                break;
            case (/elma-bpm.ru\/help4/i.test(categoryUrl)):
                textContent = 'BPM';
                break;
            case (/ru\/KB/i.test(categoryUrl) || /elma-bpm.ru\/…help/i.test(categoryUrl) || /help/i.test(categoryUrl)):
                textContent = 'База знаний';
                break;
        }

        return textContent;
    }

    // Плашка поддерриктории ссылки
    function outputSubCategoryResult(categoryUrl) {
        var textContent = '';

        switch (true) {
            // ELMA365
            case (/elma365.com\/ru\/help\/platform/i.test(categoryUrl)):
                textContent = 'Платформа';
                break;
            case (/elma365.com\/ru\/help\/ecm/i.test(categoryUrl)):
                textContent = 'ECM';
                break;
            case (/elma365.com\/ru\/help\/crm/i.test(categoryUrl)):
                textContent = 'CRM';
                break;
            case (/elma365.com\/ru\/help\/projects/i.test(categoryUrl)):
                textContent = 'Проекты';
                break;

            case (/elma365.com\/ru\/help\/business_solutions/i.test(categoryUrl)):
                textContent = 'Бизнес-решения';
                break;

            case (/elma365.com\/ru\/help\/service/i.test(categoryUrl)):
                textContent = 'Сервис';
                break;

            //  BRIX
            case (/brix365.com\/en\/help\/platform/i.test(categoryUrl)):
                textContent = 'Platform';
                break;
            case (/brix365.com\/en\/help\/ecm/i.test(categoryUrl)):
                textContent = 'ECM';
                break;
            case (/brix365.com\/en\/help\/crm/i.test(categoryUrl)):
                textContent = 'CRM';
                break;
            case (/brix365.com\/en\/help\/projects/i.test(categoryUrl)):
                textContent = 'Projects';
                break;

            case (/brix365.com\/en\/help\/business_solutions/i.test(categoryUrl)):
                textContent = 'Business solutions';
                break;

            case (/brix365.com\/en\/help\/service/i.test(categoryUrl)):
                textContent = 'Service';
                break;
        }

        return textContent;
    }

    //ИГНОР ТЕСТ
    // добавляет плашку в хлебные крошки и если их нет добавляет над тайтлом статьи
    function insertCurrentSubDirectorySearch() {
        let timerId = setInterval(() => {
            var el = document.querySelectorAll('#subcategory')
            if (el && el.length < 1) {
                let href = window.location.href
                if (Boolean(outputSubCategoryResult(href))) {
                    var subcategory = document.createElement('span');
                    var breadcrumbs = document.querySelector('.topic__breadcrumbs');
                    var articleTitle = document.querySelector('.article__header');
                    subcategory.setAttribute('id', 'subcategory')
                    subcategory.className = "search-res__item-category search-res__item-category_subcategory subcategory";
                    subcategory.innerHTML = outputSubCategoryResult(href);

                    clearInterval(timerId)
                }
            }

            if (breadcrumbs) {
                breadcrumbs.prepend(subcategory)
            } else if (articleTitle) {
                articleTitle.prepend(subcategory)
            } else {
                clearInterval(timerId)
            }
        }, 800);
    }

    insertCurrentSubDirectorySearch()
    //ИГНОР ТЕСТ

    document.querySelector('.main').addEventListener('click', function () {
        insertCurrentSubDirectorySearch()
    })

    document.addEventListener('DOMContentLoaded', () => {
        // Функция для определения подкатегории по URL
        function getSubCategoryFromUrl(url) {
            const urlPatterns = [
                { pattern: /(127\.0\.0\.1|localhost)/i, value: 'localhost' },
                { pattern: /elma365\.com\/ru\/help\/platform/i, value: 'Платформа' },
                { pattern: /elma365\.com\/ru\/help\/ecm/i, value: 'ECM' },
                { pattern: /elma365\.com\/ru\/help\/crm/i, value: 'CRM' },
                { pattern: /elma365\.com\/ru\/help\/projects/i, value: 'Проекты' },
                { pattern: /elma365\.com\/ru\/help\/business_solutions/i, value: 'Бизнес-решения' },
                { pattern: /elma365\.com\/ru\/help\/service/i, value: 'Сервис' }
            ];

            const match = urlPatterns.find(item => item.pattern.test(url));
            return match ? match.value : '';
        }

        // Функция вставки/обновления плашки подкатегории
        function updateSubCategory() {
            const text = getSubCategoryFromUrl(window.location.href);
            const existingElement = document.getElementById('subcategory');

            // Если текст пустой - удаляем плашку (если есть)
            if (!text) {
                if (existingElement) existingElement.remove();
                return;
            }

            // Если плашка уже существует с правильным текстом - ничего не делаем
            if (existingElement && existingElement.textContent === text) {
                return;
            }

            // Удаляем старую плашку (если есть)
            if (existingElement) existingElement.remove();

            // Создаем новую плашку
            const newSubcategory = document.createElement('span');
            newSubcategory.id = 'subcategory';
            newSubcategory.className = 'search-res__item-category search-res__item-category_subcategory subcategory';
            newSubcategory.textContent = text;

            // Пытаемся вставить плашку в разные возможные места
            const breadcrumbs = document.querySelector('.topic__breadcrumbs');
            const articleHeader = document.querySelector('.article__header');

            if (breadcrumbs) {
                breadcrumbs.prepend(newSubcategory);
            } else if (articleHeader) {
                articleHeader.prepend(newSubcategory);
            }
        }

        // Инициализация при загрузке
        updateSubCategory();

        // Более надежное отслеживание изменений URL в SPA
        let lastUrl = location.href;
        const observeUrlChanges = () => {
            const currentUrl = location.href;
            if (currentUrl !== lastUrl) {
                lastUrl = currentUrl;
                updateSubCategory();
            }
            setTimeout(observeUrlChanges, 300); // Проверяем URL каждые 300мс
        };

        // Запускаем наблюдатель
        observeUrlChanges();

        // Дополнительно отслеживаем изменения DOM на случай SPA-переходов
        new MutationObserver(() => {
            updateSubCategory();
        }).observe(document.body, { childList: true, subtree: true });

        // Обработка кастомного события
        document.addEventListener('subcategory:update', updateSubCategory);
    });
    ////////////////////////////////////////////////////////////////////////

    // редирект на страницу Help с учетом поддраздела
    function redirectToHelpPage(categoryUrl) {

        switch (true) {
            // ELMA365
            case (/ru\/help\/platform\/platform-help/i.test(categoryUrl)):
                window.location.href = window.location.origin + '/ru/help' + '/platform/platform-distribution.html'
                break;

            case (/ru\/help\/ecm\/platform-help/i.test(categoryUrl)):
                window.location.href = window.location.origin + '/ru/help' + '/platform/platform-distribution.html'
                break;

            case (/ru\/help\/crm\/platform-help/i.test(categoryUrl)):
                window.location.href = window.location.origin + '/ru/help' + '/platform/platform-distribution.html'

                break;
            case (/ru\/help\/projects\/platform-help/i.test(categoryUrl)):
                window.location.href = window.location.origin + '/ru/help' + '/platform/platform-distribution.html'

                break;
            case (/ru\/help\/business_solutions\/platform-help/i.test(categoryUrl)):
                window.location.href = window.location.origin + '/ru/help' + '/platform/platform-distribution.html'

                break;
            case (/ru\/help\/service\/platform-help/i.test(categoryUrl)):
                window.location.href = window.location.origin + '/ru/help' + '/platform/platform-distribution.html'
                break;
        }
    }

    function redirectCheck() {
        var timer = setInterval(() => {
            redirectToHelpPage(window.location.href)
            if (window.location.href.indexOf('platform-distribution.html') !== -1) {
                clearInterval(timer)
            }
        }, 200)
    }

    setTimeout(() => {
        document.querySelector("a[href='platform-help.html']").addEventListener("click", function () {
            redirectCheck()
        });
    }, 200)

    // запускает поиск, если находимся на странице поиска
    window.addEventListener('DOMContentLoaded', function () {
        if (/search.html\?query=/i.test(currentLocalHref)) {

            document.querySelector('.search-res__title').innerHTML = outputTitleResults();

            var positionQuery = currentLocalHref.search(/\?query=/);
            var allRequests = currentLocalHref.slice(positionQuery + 7);
            var requestText = allRequests.replace(/%20/g, ' ');
            document.querySelector('.search-form__label input.search-form__input').value = decodeURI(requestText);
            requestValue = requestText;

            requestServer()
        }
    })
    // end


    // menu select + help menu articles

    $('.solution-select').on('mouseenter', function () {
        $('.solution-select').addClass('active')
        $('.solution-select ul').addClass('active')
    })

    $('.solution-select__list').on('mouseleave', function () {
        $('.solution-select').removeClass('active')
        $('.solution-select ul').removeClass('active')
    })

    function getCurrentLink(url) {
        var textContent = '',
            subDir = ''

        switch (true) {
            case (/help\/platform/i.test(url)):
                textContent = LOCALES_SELECT_MENU[currentLang].platform;
                break;
            case (/help\/ecm/i.test(url)):
                textContent = LOCALES_SELECT_MENU[currentLang].ecm;
                break;
            case (/help\/crm/i.test(url)):
                textContent = LOCALES_SELECT_MENU[currentLang].crm;
                break;
            case (/help\/projects/i.test(url)):
                textContent = LOCALES_SELECT_MENU[currentLang].projects;
                break;

            case (/help\/business_solutions/i.test(url)):
                textContent = LOCALES_SELECT_MENU[currentLang].business_solutions;
                break;

            case (/help\/service/i.test(url)):
                textContent = LOCALES_SELECT_MENU[currentLang].service;
                break;

            default:
                textContent = LOCALES_SELECT_MENU[currentLang].platform;
                break;
        }

        return textContent;
    }

    function subDirName(url) {
        var g = '';

        switch (true) {
            case (/help\/platform/i.test(url)):
                g = 'platform';
                break;
            case (/help\/ecm/i.test(url)):
                g = 'ecm';
                break;
            case (/help\/crm/i.test(url)):
                g = 'crm';
                break;
            case (/help\/projects/i.test(url)):
                g = 'projects';
                break;
            case (/help\/business_solutions/i.test(url)):
                g = 'business_solutions';
                break;

            case (/help\/service/i.test(url)):
                g = 'service';
                break;
        }

        return g;
    }

    function setLinks() {
        $('.solution-select__selected').text(getCurrentLink(window.location.href))
        if ($('.solution-select__selected').text() === getCurrentLink(window.location.href)) {
            var links = $('.solution-select__list a').map(function () {
                return $(this).attr('href');
            }).get();
            var checked = links.find(el => el.includes(subDirName(window.location.href)))
            $(".solution-select__list a[href='" + checked + "']").addClass('checked')
        }
    }

    setLinks()

    function creatHelpMenu() {
        if (!(window.location.href.indexOf('/search.html?') !== -1) && $('#help-menu').length === 0 && currentLang === 'ru') {
            $('.footer').append(
                '    <div id="help-menu">\n' +
                '        <ul class="help-menu">\n' +
                '            <li class="opechatka"><img src="./help-a.svg" alt="side menu opechatka"><div class="fade-in"><span>Нашли опечатку?</span><p>Выделите текст, нажмите <b>ctrl + enter</b> и оповестите нас</p></div></li>\n' +
                '            <li class="question"><img src="./help-mark.svg" alt="side menu question"><form method="POST" action class="question__popup fade-in" id="question__popup"><span class="close"></span><span class="title">Отправить фидбэк</span><textarea name="help_question" id="help_question"></textarea><input type="submit" value="Отправить"></form><div class="hidden question-success" id="feedback-success-popup2"><div class="wrap"><button type="button" class="feedback-popup-close">×</button><svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_212_2187)"><path d="M22 0.6875C10.2294 0.6875 0.6875 10.2294 0.6875 22C0.6875 33.7706 10.2294 43.3125 22 43.3125C33.7706 43.3125 43.3125 33.7706 43.3125 22C43.3125 10.2294 33.7706 0.6875 22 0.6875ZM22 40.5625C11.8023 40.5625 3.4375 32.3078 3.4375 22C3.4375 11.8024 11.6922 3.4375 22 3.4375C32.1977 3.4375 40.5625 11.6922 40.5625 22C40.5625 32.1976 32.3078 40.5625 22 40.5625ZM34.1713 16.933L18.6613 32.3186C18.257 32.7197 17.604 32.7171 17.203 32.3128L9.82283 24.873C9.42176 24.4686 9.42434 23.8157 9.82867 23.4146L10.5609 22.6884C10.9652 22.2873 11.6181 22.2899 12.0192 22.6942L17.9468 28.6697L31.9926 14.7366C32.3969 14.3356 33.0498 14.3382 33.4509 14.7425L34.1772 15.4747C34.5783 15.879 34.5757 16.532 34.1713 16.933Z" fill="#27AE60"/></g><defs><clipPath id="clip0_212_2187"><rect width="44" height="44" fill="white"/></clipPath></defs></svg><p>Ваш отзыв успешно отправлен!</p><span>Спасибо за обратную связь.</span></div></div></li>\n' +
                '            <li class="dialog"><img src="./help-dialog.svg" alt="side menu dialog"><div class="fade-in"><a href="https://community.elma365.com/ru/" target="_blank">Перейти  в  ELMA Community</a></div></li>\n' +
                '        </ul>\n' +
                '    </div>'
            )

            const list = document.querySelectorAll('.help-menu li')
            list.forEach(item => {
                item.addEventListener('click', (e) => {
                    list.forEach(el => {
                        el.classList.remove('active')
                    })
                    item.classList.add('active')
                })
            })

            $('.question').on('click', function () {
                $(this).find('textarea[name="help_question"]').focus()
            })

            $('.question__popup .close').on('click', function () {
                setTimeout(() => {
                    $('.question__popup').parent().removeClass('active')
                }, 10)
            })

            $(document).mouseup(function (e) {
                let container = $(".help-menu li.active");
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    container.removeClass('active')
                    container.find('.question-success').addClass('hidden')
                }
            });

            if (window.matchMedia('(max-width: 900px)')) {
                $('.help-menu').addClass('help-menu_xs')
                $('.help-menu').find('.dialog').addClass('hide-xs')
            }
        }
    }

    creatHelpMenu()


    const elem = document.getElementById('article')

    var mutationObserver = new MutationObserver(function(mutations) {

        if (mutations[0]) {
            feedbackSubmit()
            feedback()
        }
    });

    // Запускаем наблюдение за изменениями в корневом HTML-элементе страницы
    mutationObserver.observe(elem, {
        childList: true,
    });

    document.body.addEventListener('click', eventsResetHandler)

    function eventsResetHandler() {
        setTimeout(() => {
            setLinks()
            creatHelpMenu()
        }, 200)
    }
    // end
}

if ((window.location.href.indexOf('/search.html?') !== -1)) {
    $('#feedback').css('display', 'none')
}
