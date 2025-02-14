document.addEventListener('DOMContentLoaded', function() {
    // Funkcija za normalizaciju teksta, uklanja dijakritičke znakove
    function normalizeText(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    // Funkcija za pretragu postova po imenu
    document.getElementById('searchBlogInput').addEventListener('input', function() {
        const searchTerm = normalizeText(this.value); // Normalizujemo unos pretrage
        console.log('Pretraga:', searchTerm);  // Loguj vrednost pretrage
  
        const posts = document.querySelectorAll('.blog-post');
        posts.forEach(post => {
            const title = normalizeText(post.getAttribute('data-title')); // Normalizujemo naslov posta
            if (title.includes(searchTerm)) {
                post.style.display = ''; // Prikazati post
            } else {
                post.style.display = 'none'; // Sakriti post
            }
        });
    });
  
    // Funkcija za filtriranje postova po kategorijama
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function() {
            const selectedCategory = normalizeText(this.textContent.trim()); // Normalizujemo selektovanu kategoriju
            console.log('Kategorija:', selectedCategory);  // Loguj selektovanu kategoriju
  
            const posts = document.querySelectorAll('.blog-post');
            posts.forEach(post => {
                const categories = normalizeText(post.getAttribute('data-categories')); // Normalizujemo kategorije posta
                if (selectedCategory === 'sve kategorije' || categories.includes(selectedCategory)) {
                    post.style.display = ''; // Prikazati post
                } else {
                    post.style.display = 'none'; // Sakriti post
                }
            });
        });
    });
});