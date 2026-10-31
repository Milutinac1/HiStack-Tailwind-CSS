(function () {
      var data = [
        { name: 'E-trgovina', items: [['credit-card','Platni procesori'],['box-open','Praćenje zaliha'],['tags','Upravljanje popustima'],['cart-plus','Korpa za kupovinu'],['shipping-fast','Kalkulator isporuke'],['file-invoice-dollar','Fakturisanje'],['store','POS integracija']] },
        { name: 'Marketing i analitika', items: [['chart-line','Integracija analitike'],['bullhorn','Marketing alati'],['users','CRM alati'],['envelope-open-text','Obaveštenja putem emaila'],['bell','Push obaveštenja'],['link','Affiliate linkovi'],['sitemap','Generator mape sajta']] },
        { name: 'Sigurnost', items: [['lock','Šifrovanje podataka'],['certificate','SSL sertifikati'],['shield-check','Praćenje sigurnosti'],['user-shield','Pristup zasnovan na ulogama'],['user-check','Verifikacija identiteta'],['shield-alt','Detekcija prevara'],['cloud-upload-alt','Bekap u oblaku']] },
        { name: 'Korisnici', items: [['headset','Uživo ćaskanje'],['robot','Četbotovi'],['user-plus','Upravljanje korisnicima'],['globe','Podrška za više jezika'],['phone','VoIP integracija'],['star-half-alt','Recenzije i ocene'],['heart','Lista želja']] },
        { name: 'Operacije i podaci', items: [['sync-alt','API integracije'],['database','Upravljanje bazom podataka'],['project-diagram','Upravljanje projektima'],['calendar-alt','Planiranje događaja'],['file-export','Izvoz podataka'],['cogs','Prilagođeni tokovi rada'],['th','Widgeti za kontrolnu tablu']] }
      ];
      var tabs = document.getElementById('intg-tabs'), panel = document.getElementById('intg-panel');
      if (!tabs || !panel) return;
      var on = 'bg-secondary-red text-white border-secondary-red', off = 'bg-white text-[#333333] border-red-100 hover:border-secondary-red';
      var base = 'px-4 py-2 rounded-full border text-sm lg:text-base font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81534]/40 ';
      function show(i) {
        [].forEach.call(tabs.children, function (b, j) {
          b.className = base + (j === i ? on : off);
          b.setAttribute('aria-selected', j === i ? 'true' : 'false');
        });
        panel.innerHTML = '';
        data[i].items.forEach(function (it) {
          var s = document.createElement('span');
          s.className = 'inline-flex items-center gap-2 bg-white text-gray-500 font-semibold lg:text-lg px-5 py-3 rounded-full border border-red-100 shadow-[0_1px_10px_rgba(0,0,0,0.04)]';
          s.innerHTML = '<i class="fal fa-' + it[0] + ' text-secondary-red" aria-hidden="true"></i>' + it[1];
          panel.appendChild(s);
        });
      }
      data.forEach(function (d, i) {
        var b = document.createElement('button');
        b.type = 'button'; b.setAttribute('role', 'tab'); b.textContent = d.name;
        b.addEventListener('click', function () { show(i); });
        tabs.appendChild(b);
      });
      show(0);
    })();