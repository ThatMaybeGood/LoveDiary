// 应用状态管理
const AppState = {
    currentModule: 'dashboard',
    currentUser: {
        id: 1,
        name: '小明',
        avatar: '👦'
    }
};

// API 服务
const ApiService = {
    async get(endpoint) {
        try {
            const response = await fetch(`/api/${endpoint}`);
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return { success: false, data: [] };
        }
    },

    async post(endpoint, data) {
        try {
            const response = await fetch(`/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return { success: false };
        }
    }
};

// 工具函数
const Utils = {
    // 格式化日期
    formatDate(dateString) {
        if (!dateString) return '未知时间';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
    },

    // 显示通知
    showNotification(message, type = 'info') {
        // 移除现有的通知
        document.querySelectorAll('.custom-notification').forEach(notification => {
            notification.remove();
        });

        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show custom-notification position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
        `;
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    },

    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// 模块管理器
const ModuleManager = {
    // 切换模块
    async switchModule(moduleName) {
        // 更新状态
        AppState.currentModule = moduleName;

        // 更新导航激活状态
        this.updateNavigation(moduleName);

        // 加载模块内容
        await this.loadModuleContent(moduleName);
    },

    // 更新导航状态
    updateNavigation(moduleName) {
        // 更新主导航
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
        });
        const mainNavLink = document.querySelector(`.navbar-nav .nav-link[data-module="${moduleName}"]`);
        if (mainNavLink) mainNavLink.classList.add('active');

        // 更新侧边栏导航
        document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
        });
        const sidebarLink = document.querySelector(`.sidebar-nav .nav-link[data-module="${moduleName}"]`);
        if (sidebarLink) sidebarLink.classList.add('active');
    },

    // 加载模块内容
    async loadModuleContent(moduleName) {
        const contentArea = document.getElementById('module-content');

        // 显示加载状态
        contentArea.innerHTML = `
            <div class="d-flex justify-content-center align-items-center" style="height: 400px;">
                <div class="text-center">
                    <div class="spinner-border text-primary mb-3"></div>
                    <p>加载中...</p>
                </div>
            </div>
        `;

        try {
            // 模拟加载延迟
            await new Promise(resolve => setTimeout(resolve, 300));

            let html = '';
            switch(moduleName) {
                case 'dashboard':
                    html = await DashboardModule.render();
                    break;
                case 'diary':
                    html = await DiaryModule.render();
                    break;
                case 'reminders':
                    html = await RemindersModule.render();
                    break;
                case 'gallery':
                    html = await GalleryModule.render();
                    break;
                case 'wishlist':
                    html = await WishlistModule.render();
                    break;
                case 'bucketlist':
                    html = await BucketlistModule.render();
                    break;
                case 'messages':
                    html = await MessagesModule.render();
                    break;
                default:
                    html = '<div class="alert alert-info">模块开发中...</div>';
            }

            // 添加动画效果
            contentArea.style.opacity = '0';
            contentArea.innerHTML = html;
            setTimeout(() => {
                contentArea.style.opacity = '1';
                contentArea.style.transition = 'opacity 0.3s ease';
            }, 50);

        } catch (error) {
            console.error('加载模块失败:', error);
            contentArea.innerHTML = `
                <div class="alert alert-danger">
                    <h4>加载失败</h4>
                    <p>无法加载模块内容，请刷新页面重试。</p>
                    <small>错误信息: ${error.message}</small>
                </div>
            `;
        }
    }
};

// 模态框管理器
const ModalManager = {
    // 显示模态框
    showModal(title, content, size = 'modal-lg') {
        // 移除现有的模态框
        const existingModal = document.getElementById('dynamicModal');
        if (existingModal) {
            existingModal.remove();
        }

        const modalHTML = `
            <div class="modal fade" id="dynamicModal" tabindex="-1">
                <div class="modal-dialog ${size}">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            ${content}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" id="modalConfirmBtn">确认</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modal-container').innerHTML = modalHTML;
        const modalElement = document.getElementById('dynamicModal');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();

        return {
            modal: modal,
            element: modalElement,
            setConfirmAction: (action) => {
                document.getElementById('modalConfirmBtn').onclick = action;
            }
        };
    }
};

// 初始化应用
function initApp() {
    console.log('初始化心语时光应用...');

    // 绑定导航事件
    bindNavigationEvents();

    // 默认显示首页
    ModuleManager.switchModule('dashboard');

    // 显示欢迎通知
    setTimeout(() => {
        Utils.showNotification('欢迎使用心语时光！记录你们的每一个甜蜜瞬间～ 💕', 'success');
    }, 1000);
}

// 绑定导航事件
function bindNavigationEvents() {
    // 主导航点击事件
    document.querySelectorAll('.navbar-nav .nav-link, .sidebar-nav .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const moduleName = e.target.closest('a').getAttribute('data-module');
            ModuleManager.switchModule(moduleName);
        });
    });

    // 下拉菜单
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}