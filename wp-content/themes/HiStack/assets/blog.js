document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('searchBlogInput');
    var categoryButtons = document.querySelectorAll('.category-link');
    var posts = document.querySelectorAll('.blog-post');
    var emptyState = document.getElementById('blogEmpty');
    if (!searchInput || !categoryButtons.length || !posts.length) return;

    var ALL = 'sve kategorije';
    var ACTIVE = ['bg-secondary-red', 'text-white'];
    var IDLE = ['bg-red-100', 'text-secondary-red'];
    var state = { category: ALL, query: '' };

    // Uklanja dijakritike i razlike u velikim/malim slovima ("Šta" -> "sta")
    function normalizeText(text) {
        return (text || '')
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .replace(/đ/gi, 'dj')
            .toLowerCase()
            .trim();
    }

    // Normalizacija se radi jednom, ne pri svakom pritisku tastera
    var items = Array.prototype.map.call(posts, function (post) {
        return {
            el: post,
            title: normalizeText(post.getAttribute('data-title')),
            categories: (post.getAttribute('data-categories') || '').split(',').map(normalizeText)
        };
    });

    function render() {
        var visible = 0;
        items.forEach(function (item) {
            var inCategory = state.category === ALL || item.categories.indexOf(state.category) !== -1;
            var inSearch = state.query === '' || item.title.indexOf(state.query) !== -1;
            var show = inCategory && inSearch;
            item.el.classList.toggle('hidden', !show);
            if (show) visible++;
        });
        if (emptyState) emptyState.classList.toggle('hidden', visible !== 0);
    }

    function setActiveButton(activeBtn) {
        categoryButtons.forEach(function (btn) {
            var on = btn === activeBtn;
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
            ACTIVE.forEach(function (c) { btn.classList.toggle(c, on); });
            IDLE.forEach(function (c) { btn.classList.toggle(c, !on); });
        });
    }

    // Pretraga po naslovu (radi zajedno sa izabranom kategorijom)
    searchInput.addEventListener('input', function () {
        state.query = normalizeText(this.value);
        render();
    });

    // Filtriranje po kategoriji, sa vidljivim aktivnim stanjem
    categoryButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            state.category = normalizeText(btn.textContent);
            setActiveButton(btn);
            render();
        });
    });

    render();
});