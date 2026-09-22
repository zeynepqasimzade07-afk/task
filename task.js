document.addEventListener('DOMContentLoaded', function () {

    // Bloklari ac/bagla (1., 2., 3. kimi əsas başlıqlar)
    document.querySelectorAll('.tree-block-header').forEach(function (header) {
        header.addEventListener('click', function () {
            const block = header.closest('.tree-block');
            const isOpen = block.classList.toggle('open');
            header.querySelector('.chevron').innerHTML = isOpen ? '&#8964;' : '&#8250;';
        });
    });

    // Mobil menyu (drawer) idaretmesi
    const sidebarEl = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const menuBtn = document.getElementById('menuBtn');
    const mobileTitle = document.getElementById('mobileTitle');

    function openSidebar() {
        if (sidebarEl) sidebarEl.classList.add('open');
        if (overlay) overlay.classList.add('visible');
    }

    function closeSidebar() {
        if (sidebarEl) sidebarEl.classList.remove('open');
        if (overlay) overlay.classList.remove('visible');
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', function () {
            if (sidebarEl && sidebarEl.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // Alt-basliga basanda saga uygun bolmeni goster
    const placeholder = document.getElementById('placeholder');

    document.querySelectorAll('.tree-sub').forEach(function (subItem) {
        subItem.addEventListener('click', function () {
            const targetId = subItem.dataset.target;

            // aktiv sidebar elementini isaretle
            document.querySelectorAll('.tree-sub.active').forEach(function (n) {
                n.classList.remove('active');
            });
            subItem.classList.add('active');

            // mobil yuxari paneldeki basligi yenile
            if (mobileTitle) mobileTitle.textContent = subItem.textContent;

            // butun bolmeleri gizlet
            document.querySelectorAll('.qa-section').forEach(function (section) {
                section.classList.remove('visible');
            });
            if (placeholder) placeholder.style.display = 'none';

            // secilmis bolmeni goster
            const target = document.getElementById(targetId);
            if (target) {
                target.classList.add('visible');
                target.scrollIntoView({ behavior: 'instant', block: 'start' });
            }

            // mobil rejimde secimdən sonra menyunu bagla
            closeSidebar();
        });
    });

});