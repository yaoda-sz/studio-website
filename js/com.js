document.addEventListener('DOMContentLoaded', function () {
    const navMain = document.querySelector('.nav-main');
    const navLinksBottom = document.querySelector('.nav-links-bottom');
    const navLinksBottomItems = navLinksBottom.querySelectorAll('a');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const logoLink = document.querySelector('.logo a'); // 获取Logo链接

    // 切换导航菜单显示状态
    navMain.addEventListener('click', function () {
        this.textContent = this.textContent === '☰' ? '×' : '☰';
        navLinksBottom.classList.toggle('active');
    });

    // 处理导航链接点击事件
    function handleNavItemClick(event, link) {
        event.preventDefault(); // 阻止默认行为

        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // 关闭底部导航（仅在小屏幕）
            if (window.innerWidth <= 900) {
                navLinksBottom.classList.remove('active');
                navMain.textContent = '☰'; // 恢复为打开图标
            }

            // 更新激活状态
            updateActiveLink(link);

            // 使用 JavaScript 实现带有时长的平滑滚动
            smoothScrollTo(targetElement.offsetTop, 500);
        }
    }

    // 平滑滚动到指定位置
    function smoothScrollTo(endPos, duration) {
        const startPos = window.pageYOffset;
        const distance = endPos - startPos;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPos, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing函数，提供更自然的滚动效果
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // 更新激活状态
    function updateActiveLink(activeLink) {
        // 移除所有导航链接的激活状态
        [...navLinksItems, ...navLinksBottomItems].forEach(item => item.classList.remove('active'));

        // 设置当前点击链接为激活状态
        activeLink.classList.add('active');
    }

    // 初始化激活状态（基于当前URL片段）
    function initializeActiveLink() {
        const currentPath = window.location.hash || '#home';
        const currentLink = [...navLinksItems, ...navLinksBottomItems].find(link => link.getAttribute('href') === currentPath);
        if (currentLink) {
            updateActiveLink(currentLink);
        }
    }

    // 点击底部导航链接时的处理
    navLinksBottomItems.forEach(item => {
        item.addEventListener('click', function (event) {
            handleNavItemClick(event, this);
        });
    });

    // 点击主导航链接时的处理（仅在大屏幕）
    navLinksItems.forEach(item => {
        item.addEventListener('click', function (event) {
            if (window.innerWidth > 900) {
                handleNavItemClick(event, this);
            } else {
                // 在小屏幕下直接允许默认行为，因为底部导航会处理它
                return;
            }
        });
    });

    // 点击Logo时的处理
    logoLink.addEventListener('click', function (event) {
        event.preventDefault(); // 阻止默认行为
        
        // 更新激活状态为首页链接
        const homeLink = document.querySelector('.nav-links a[href="#home"]');
        updateActiveLink(homeLink);

        // 使用 JavaScript 实现带有时长的平滑滚动到首页
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            smoothScrollTo(homeSection.offsetTop, 500);
        }
    });

    // 当窗口大小改变时检查是否需要关闭导航菜单
    window.addEventListener('resize', function () {
        if (window.innerWidth > 900 && navLinksBottom.classList.contains('active')) {
            navLinksBottom.classList.remove('active');
            navMain.textContent = '☰'; // 恢复为打开图标
        }
    });

    // 页面加载时初始化激活状态
    initializeActiveLink();

    // 监听hashchange事件来更新激活状态
    window.addEventListener('hashchange', function () {
        initializeActiveLink();
    });
});