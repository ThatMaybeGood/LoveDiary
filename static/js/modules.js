// 首页模块
const DashboardModule = {
    async render() {
        try {
            const [diaries, reminders, photos, wishes, messages] = await Promise.all([
                ApiService.get('diaries'),
                ApiService.get('reminders'),
                ApiService.get('photos'),
                ApiService.get('wishes'),
                ApiService.get('messages')
            ]);

            return `
                <div class="dashboard-module">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2 class="mb-0">
                            <i class="fas fa-home text-primary me-2"></i>
                            首页概览
                        </h2>
                        <span class="text-muted">${new Date().toLocaleDateString('zh-CN', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            weekday: 'long'
                        })}</span>
                    </div>

                    <!-- 统计卡片 -->
                    <div class="row mb-4">
                        <div class="col-xl-2 col-md-4 col-6 mb-3">
                            <div class="love-card stats-card text-center">
                                <div class="stats-icon">
                                    <i class="fas fa-book"></i>
                                </div>
                                <div class="stats-number">${diaries.data?.length || 0}</div>
                                <div class="stats-label">共享日记</div>
                            </div>
                        </div>
                        <div class="col-xl-2 col-md-4 col-6 mb-3">
                            <div class="love-card stats-card text-center">
                                <div class="stats-icon">
                                    <i class="fas fa-calendar-heart"></i>
                                </div>
                                <div class="stats-number">${reminders.data?.length || 0}</div>
                                <div class="stats-label">纪念日</div>
                            </div>
                        </div>
                        <div class="col-xl-2 col-md-4 col-6 mb-3">
                            <div class="love-card stats-card text-center">
                                <div class="stats-icon">
                                    <i class="fas fa-images"></i>
                                </div>
                                <div class="stats-number">${photos.data?.length || 0}</div>
                                <div class="stats-label">美好瞬间</div>
                            </div>
                        </div>
                        <div class="col-xl-2 col-md-4 col-6 mb-3">
                            <div class="love-card stats-card text-center">
                                <div class="stats-icon">
                                    <i class="fas fa-gift"></i>
                                </div>
                                <div class="stats-number">${wishes.data?.length || 0}</div>
                                <div class="stats-label">礼物期望</div>
                            </div>
                        </div>
                        <div class="col-xl-2 col-md-4 col-6 mb-3">
                            <div class="love-card stats-card text-center">
                                <div class="stats-icon">
                                    <i class="fas fa-comment-dots"></i>
                                </div>
                                <div class="stats-number">${messages.data?.length || 0}</div>
                                <div class="stats-label">甜蜜留言</div>
                            </div>
                        </div>
                        <div class="col-xl-2 col-md-4 col-6 mb-3">
                            <div class="love-card stats-card text-center">
                                <div class="stats-icon">
                                    <i class="fas fa-heart"></i>
                                </div>
                                <div class="stats-number">328</div>
                                <div class="stats-label">相爱天数</div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <!-- 快速操作 -->
                        <div class="col-lg-6 mb-4">
                            <div class="love-card h-100">
                                <div class="card-header">
                                    <h5 class="mb-0">快速开始</h5>
                                </div>
                                <div class="card-body">
                                    <div class="row g-2">
                                        <div class="col-6">
                                            <button class="btn btn-love w-100 h-100 py-3" onclick="ModuleManager.switchModule('diary')">
                                                <i class="fas fa-edit fa-2x mb-2"></i><br>
                                                写日记
                                            </button>
                                        </div>
                                        <div class="col-6">
                                            <button class="btn btn-outline-love w-100 h-100 py-3" onclick="ModuleManager.switchModule('gallery')">
                                                <i class="fas fa-camera fa-2x mb-2"></i><br>
                                                传照片
                                            </button>
                                        </div>
                                        <div class="col-6">
                                            <button class="btn btn-outline-love w-100 h-100 py-3" onclick="ModuleManager.switchModule('wishlist')">
                                                <i class="fas fa-gift fa-2x mb-2"></i><br>
                                                许个愿
                                            </button>
                                        </div>
                                        <div class="col-6">
                                            <button class="btn btn-outline-love w-100 h-100 py-3" onclick="ModuleManager.switchModule('messages')">
                                                <i class="fas fa-comment-dots fa-2x mb-2"></i><br>
                                                留个言
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 最新动态 -->
                        <div class="col-lg-6 mb-4">
                            <div class="love-card h-100">
                                <div class="card-header">
                                    <h5 class="mb-0">最新动态</h5>
                                </div>
                                <div class="card-body">
                                    ${this.renderRecentActivity(diaries.data, messages.data, reminders.data)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('渲染首页失败:', error);
            return `
                <div class="alert alert-danger">
                    <h4>加载失败</h4>
                    <p>无法加载首页数据</p>
                </div>
            `;
        }
    },

    renderRecentActivity(diaries, messages, reminders) {
        const activities = [];

        // 添加日记活动
        if (diaries && diaries.length > 0) {
            diaries.slice(0, 2).forEach(diary => {
                activities.push({
                    type: 'diary',
                    content: `${diary.author_name} 发布了新日记：${diary.title}`,
                    time: diary.created_at,
                    icon: 'fas fa-book'
                });
            });
        }

        // 添加留言活动
        if (messages && messages.length > 0) {
            messages.slice(0, 2).forEach(message => {
                activities.push({
                    type: 'message',
                    content: `${message.author_name}：${message.content}`,
                    time: message.created_at,
                    icon: 'fas fa-comment'
                });
            });
        }

        // 添加纪念日活动
        if (reminders && reminders.length > 0) {
            const upcoming = reminders.find(r => r.days_left <= 7);
            if (upcoming) {
                activities.push({
                    type: 'reminder',
                    content: `即将到来：${upcoming.title}（${upcoming.days_left}天后）`,
                    time: '即将到来',
                    icon: 'fas fa-calendar-heart'
                });
            }
        }

        if (activities.length === 0) {
            return '<p class="text-muted text-center">暂无最新动态</p>';
        }

        return activities.map(activity => `
            <div class="activity-item d-flex align-items-center mb-3">
                <div class="activity-icon me-3">
                    <i class="${activity.icon} text-primary"></i>
                </div>
                <div class="flex-grow-1">
                    <div class="activity-content">${activity.content}</div>
                    <small class="text-muted">${activity.time}</small>
                </div>
            </div>
        `).join('');
    }
};

// 日记模块
const DiaryModule = {
    async render() {
        try {
            const diaries = await ApiService.get('diaries');

            return `
                <div class="diary-module">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2 class="mb-0">
                            <i class="fas fa-book text-primary me-2"></i>
                            共享日记
                        </h2>
                        <button class="btn btn-love" onclick="DiaryModule.showAddForm()">
                            <i class="fas fa-plus me-2"></i>写新日记
                        </button>
                    </div>

                    <div class="row">
                        <div class="col-lg-8">
                            ${diaries.data && diaries.data.length > 0 ? 
                                diaries.data.map(diary => this.renderDiaryItem(diary)).join('') :
                                '<div class="alert alert-info text-center">还没有日记，快来写第一篇吧！</div>'
                            }
                        </div>

                        <div class="col-lg-4">
                            <div class="love-card mb-4">
                                <div class="card-header">
                                    <h5 class="mb-0">
                                        <i class="fas fa-chart-bar me-2"></i>
                                        日记统计
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div class="text-center">
                                        <div class="display-4 text-primary">${diaries.data?.length || 0}</div>
                                        <p class="text-muted">篇甜蜜日记</p>
                                    </div>
                                </div>
                            </div>

                            <div class="love-card">
                                <div class="card-header">
                                    <h5 class="mb-0">
                                        <i class="fas fa-tags me-2"></i>
                                        心情标签
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-wrap gap-2">
                                        <span class="badge bg-primary">幸福</span>
                                        <span class="badge bg-success">甜蜜</span>
                                        <span class="badge bg-warning">想念</span>
                                        <span class="badge bg-info">感动</span>
                                        <span class="badge bg-secondary">日常</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('渲染日记模块失败:', error);
            return '<div class="alert alert-danger">加载日记失败</div>';
        }
    },

    renderDiaryItem(diary) {
        return `
            <div class="love-card diary-entry mb-4">
                <div class="card-body">
                    <div class="diary-header mb-3">
                        <div>
                            <h4 class="diary-title mb-1">${diary.title}</h4>
                            <div class="diary-meta">
                                <span class="me-3">
                                    <i class="fas fa-user me-1"></i>${diary.author_name}
                                </span>
                                <span>
                                    <i class="fas fa-clock me-1"></i>${Utils.formatDate(diary.created_at)}
                                </span>
                            </div>
                        </div>
                        ${diary.mood ? `<span class="diary-mood badge bg-accent">${diary.mood}</span>` : ''}
                    </div>
                    <div class="diary-content">
                        <p>${diary.content}</p>
                    </div>
                    <div class="diary-actions mt-3 pt-3 border-top">
                        <button class="btn btn-sm btn-outline-primary me-2" onclick="Utils.showNotification('点赞功能开发中...', 'info')">
                            <i class="fas fa-heart me-1"></i>点赞
                        </button>
                        <button class="btn btn-sm btn-outline-secondary" onclick="Utils.showNotification('评论功能开发中...', 'info')">
                            <i class="fas fa-comment me-1"></i>评论
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    showAddForm() {
        const formHTML = `
            <form id="addDiaryForm">
                <div class="mb-3">
                    <label class="form-label">日记标题</label>
                    <input type="text" class="form-control" name="title" placeholder="给日记起个标题..." required>
                </div>
                <div class="mb-3">
                    <label class="form-label">心情</label>
                    <select class="form-select" name="mood">
                        <option value="">选择心情</option>
                        <option value="幸福">😊 幸福</option>
                        <option value="甜蜜">🥰 甜蜜</option>
                        <option value="想念">💭 想念</option>
                        <option value="感动">🥲 感动</option>
                        <option value="开心">😄 开心</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">日记内容</label>
                    <textarea class="form-control" name="content" rows="8" placeholder="记录今天的甜蜜时刻..." required></textarea>
                </div>
            </form>
        `;

        const modal = ModalManager.showModal('写新日记', formHTML);

        modal.setConfirmAction(async () => {
            const form = document.getElementById('addDiaryForm');
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            if (!data.title || !data.content) {
                Utils.showNotification('请填写标题和内容', 'warning');
                return;
            }

            const result = await ApiService.post('diary', data);
            if (result.success) {
                modal.modal.hide();
                Utils.showNotification('日记发布成功！', 'success');
                setTimeout(() => {
                    ModuleManager.switchModule('diary');
                }, 500);
            } else {
                Utils.showNotification('发布失败，请重试', 'error');
            }
        });
    }
};

// 纪念日模块
const RemindersModule = {
    async render() {
        try {
            const reminders = await ApiService.get('reminders');

            return `
                <div class="reminders-module">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2 class="mb-0">
                            <i class="fas fa-calendar-heart text-primary me-2"></i>
                            纪念日提醒
                        </h2>
                        <button class="btn btn-love" onclick="Utils.showNotification('添加纪念日功能开发中...', 'info')">
                            <i class="fas fa-plus me-2"></i>添加纪念日
                        </button>
                    </div>

                    <div class="row">
                        <div class="col-lg-8">
                            <div class="love-card">
                                <div class="card-body">
                                    <h5 class="card-title mb-4">重要日期</h5>
                                    ${reminders.data && reminders.data.length > 0 ? 
                                        reminders.data.map(reminder => this.renderReminderItem(reminder)).join('') :
                                        '<p class="text-muted text-center">还没有添加纪念日</p>'
                                    }
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="love-card">
                                <div class="card-header">
                                    <h5 class="mb-0">
                                        <i class="fas fa-bell me-2"></i>
                                        提醒设置
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div class="mb-3">
                                        <label class="form-label">提前提醒天数</label>
                                        <select class="form-select">
                                            <option>提前1天</option>
                                            <option selected>提前3天</option>
                                            <option>提前7天</option>
                                            <option>提前15天</option>
                                        </select>
                                    </div>
                                    <div class="form-check mb-2">
                                        <input class="form-check-input" type="checkbox" checked>
                                        <label class="form-check-label">邮件提醒</label>
                                    </div>
                                    <div class="form-check mb-2">
                                        <input class="form-check-input" type="checkbox" checked>
                                        <label class="form-check-label">站内提醒</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox">
                                        <label class="form-check-label">短信提醒</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('渲染纪念日模块失败:', error);
            return '<div class="alert alert-danger">加载纪念日失败</div>';
        }
    },

    renderReminderItem(reminder) {
        return `
            <div class="reminder-item d-flex justify-content-between align-items-center p-3 mb-3 border rounded">
                <div class="d-flex align-items-center">
                    <div class="reminder-icon me-3">
                        <i class="fas fa-heart text-danger fa-lg"></i>
                    </div>
                    <div>
                        <h6 class="mb-1">${reminder.title}</h6>
                        <small class="text-muted">${reminder.date}</small>
                    </div>
                </div>
                <div class="text-end">
                    <div class="days-count text-primary fw-bold">${reminder.days_left}天</div>
                    <small class="text-muted">后</small>
                </div>
            </div>
        `;
    }
};

// 相册模块
const GalleryModule = {
    async render() {
        try {
            const photos = await ApiService.get('photos');

            return `
                <div class="gallery-module">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2 class="mb-0">
                            <i class="fas fa-images text-primary me-2"></i>
                            相册回忆
                        </h2>
                        <button class="btn btn-love" onclick="Utils.showNotification('上传照片功能开发中...', 'info')">
                            <i class="fas fa-upload me-2"></i>上传照片
                        </button>
                    </div>

                    <div class="row">
                        ${photos.data && photos.data.length > 0 ? 
                            photos.data.map(photo => this.renderPhotoItem(photo)).join('') :
                            '<div class="col-12"><div class="alert alert-info text-center">还没有照片，快来上传第一张吧！</div></div>'
                        }
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('渲染相册模块失败:', error);
            return '<div class="alert alert-danger">加载相册失败</div>';
        }
    },

    renderPhotoItem(photo) {
        return `
            <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div class="love-card photo-card">
                    <div class="photo-container position-relative overflow-hidden rounded-top">
                        <img src="${photo.url}" class="photo-img w-100" alt="${photo.caption}" 
                             style="height: 200px; object-fit: cover;">
                        <div class="photo-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end">
                            <div class="photo-info w-100 p-3 text-white" 
                                 style="background: linear-gradient(transparent, rgba(0,0,0,0.7));">
                                <p class="mb-1 small">${photo.caption}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// 礼物期望模块
const WishlistModule = {
    async render() {
        try {
            const wishes = await ApiService.get('wishes');

            return `
                <div class="wishlist-module">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2 class="mb-0">
                            <i class="fas fa-gift text-primary me-2"></i>
                            礼物期望
                        </h2>
                        <button class="btn btn-love" onclick="Utils.showNotification('添加礼物功能开发中...', 'info')">
                            <i class="fas fa-plus me-2"></i>添加愿望
                        </button>
                    </div>

                    <div class="row">
                        ${wishes.data && wishes.data.length > 0 ? 
                            wishes.data.map(wish => this.renderWishItem(wish)).join('') :
                            '<div class="col-12"><div class="alert alert-info text-center">还没有礼物愿望，快来添加第一个吧！</div></div>'
                        }
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('渲染礼物模块失败:', error);
            return '<div class="alert alert-danger">加载礼物愿望失败</div>';
        }
    },

    renderWishItem(wish) {
        return `
            <div class="col-lg-6 mb-4">
                <div class="love-card wish-item h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <h5 class="card-title">${wish.title}</h5>
                            <span class="badge bg-primary">${wish.priority}优先级</span>
                        </div>
                        <p class="text-muted mb-3">${wish.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-muted">${wish.price_range}</span>
                            <div class="wish-actions">
                                <button class="btn btn-sm btn-outline-primary me-2" onclick="Utils.showNotification('购买功能开发中...', 'info')">
                                    <i class="fas fa-shopping-cart"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="Utils.showNotification('删除功能开发中...', 'info')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// 愿望清单模块
const BucketlistModule = {
    async render() {
        return `
            <div class="bucketlist-module">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="mb-0">
                        <i class="fas fa-list-check text-primary me-2"></i>
                        愿望清单
                    </h2>
                    <button class="btn btn-love" onclick="Utils.showNotification('添加愿望功能开发中...', 'info')">
                        <i class="fas fa-plus me-2"></i>添加愿望
                    </button>
                </div>
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    愿望清单功能正在开发中，敬请期待！
                </div>
            </div>
        `;
    }
};

// 留言板模块
const MessagesModule = {
    async render() {
        try {
            const messages = await ApiService.get('messages');

            return `
                <div class="messages-module">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2 class="mb-0">
                            <i class="fas fa-comment-dots text-primary me-2"></i>
                            甜蜜留言板
                        </h2>
                    </div>

                    <div class="row">
                        <div class="col-lg-8">
                            <div class="love-card">
                                <div class="card-body">
                                    <div class="messages-container" style="max-height: 500px; overflow-y: auto;">
                                        ${messages.data && messages.data.length > 0 ? 
                                            messages.data.map(message => this.renderMessageItem(message)).join('') :
                                            '<p class="text-muted text-center">还没有留言，快来发第一条吧！</p>'
                                        }
                                    </div>
                                    
                                    <div class="message-form mt-4 pt-4 border-top">
                                        <form id="messageForm">
                                            <div class="input-group">
                                                <textarea class="form-control" placeholder="写下你想说的话..." rows="2" name="content" required></textarea>
                                                <button class="btn btn-love" type="submit">
                                                    <i class="fas fa-paper-plane"></i>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="love-card">
                                <div class="card-header">
                                    <h5 class="mb-0">
                                        <i class="fas fa-users me-2"></i>
                                        在线状态
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div class="d-flex align-items-center mb-3">
                                        <span class="avatar me-3">👦</span>
                                        <div>
                                            <div class="fw-bold">小明</div>
                                            <small class="text-success">
                                                <i class="fas fa-circle me-1"></i>在线
                                            </small>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <span class="avatar me-3">👧</span>
                                        <div>
                                            <div class="fw-bold">小美</div>
                                            <small class="text-success">
                                                <i class="fas fa-circle me-1"></i>在线
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('渲染留言板模块失败:', error);
            return '<div class="alert alert-danger">加载留言板失败</div>';
        }
    },

    renderMessageItem(message) {
        const isCurrentUser = message.author_name === '小明';
        return `
            <div class="message-item mb-4">
                <div class="d-flex align-items-start ${isCurrentUser ? 'flex-row-reverse' : ''}">
                    <div class="avatar me-3 ${isCurrentUser ? 'ms-3' : ''}">${message.author_name === '小明' ? '👦' : '👧'}</div>
                    <div class="flex-grow-1 ${isCurrentUser ? 'text-end' : ''}">
                        <div class="d-flex justify-content-between align-items-center mb-2 ${isCurrentUser ? 'flex-row-reverse' : ''}">
                            <strong>${message.author_name}</strong>
                            <small class="text-muted">${message.created_at}</small>
                        </div>
                        <div class="message-bubble p-3 rounded ${isCurrentUser ? 'bg-primary text-white' : 'bg-light'}">
                            <p class="mb-0">${message.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        // 绑定留言表单提交事件
        setTimeout(() => {
            const form = document.getElementById('messageForm');
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);

                    if (!data.content.trim()) {
                        Utils.showNotification('请输入留言内容', 'warning');
                        return;
                    }

                    const result = await ApiService.post('message', data);
                    if (result.success) {
                        form.reset();
                        Utils.showNotification('留言发送成功！', 'success');
                        ModuleManager.switchModule('messages');
                    } else {
                        Utils.showNotification('发送失败，请重试', 'error');
                    }
                });
            }
        }, 100);
    }
};