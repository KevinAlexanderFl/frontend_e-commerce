document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeMenu = () => {
        sidebar?.classList.remove('open');
        overlay?.classList.remove('show');
    };
    document.getElementById('menuButton')?.addEventListener('click', () => {
        sidebar?.classList.add('open');
        overlay?.classList.add('show');
    });
    overlay?.addEventListener('click', closeMenu);

    document.querySelectorAll('[data-table-search]').forEach(input => {
        input.addEventListener('input', event => {
            const target = event.currentTarget;
            if (!(target instanceof HTMLInputElement)) return;
            const table = document.getElementById(target.dataset.tableSearch ?? '');
            const value = target.value.toLowerCase().trim();
            table?.querySelectorAll('tbody tr').forEach(row => {
                if (row instanceof HTMLElement) row.style.display = row.textContent?.toLowerCase().includes(value) ? '' : 'none';
            });
        });
    });

    window.setTimeout(() => document.querySelectorAll('.alert').forEach(alert => alert.remove()), 4500);
});
