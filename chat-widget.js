// VendorHub shared customer chat widget — a floating icon that lets a
// customer enter a phone number (to see all their conversations across every
// vendor they've ordered from) or an order code + phone (to jump straight
// into one conversation). Include this script on any customer-facing page
// and call initChatWidget() once the page has loaded.

(function () {
    // Computed lazily, not once at load time — chat-widget.js can be loaded
    // in <head>, before the page's own API_URL is declared further down. If
    // this were a plain const set once, it would always fall back to '/api'.
    // Calling this fresh inside each function guarantees API_URL already
    // exists by then, since nothing here can run before a user interacts
    // with the widget, by which point the whole page has finished loading.
    function getChatApi() {
        return (typeof API_URL !== 'undefined' && API_URL) || '/api';
    }
    let widgetPhone = sessionStorage.getItem('vh_widget_phone') || '';
    let activeOrderId = null;
    let activeOrderCode = null;
    let pollTimer = null;

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function widgetHTML() {
        return `
        <div id="vhChatIcon" style="position:fixed;bottom:24px;right:24px;width:58px;height:58px;border-radius:50%;background:var(--primary,#F68B1E);color:white;display:flex;align-items:center;justify-content:center;font-size:26px;box-shadow:0 4px 16px rgba(0,0,0,0.2);cursor:pointer;z-index:9998;">
            <span>💬</span>
            <span id="vhUnreadBadge" style="display:none;position:absolute;top:-4px;right:-4px;background:#e53935;color:white;border-radius:10px;min-width:20px;height:20px;font-size:0.72rem;font-weight:700;align-items:center;justify-content:center;padding:0 4px;">0</span>
        </div>
        <div id="vhChatPanel" style="display:none;position:fixed;bottom:96px;right:24px;width:340px;max-width:calc(100vw - 32px);height:460px;background:white;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.25);z-index:9999;flex-direction:column;overflow:hidden;font-family:inherit;">
            <div style="background:var(--primary,#F68B1E);color:white;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;">
                <strong id="vhChatTitle">Messages</strong>
                <span id="vhChatClose" style="cursor:pointer;font-size:20px;line-height:1;">&times;</span>
            </div>
            <div id="vhChatBody" style="flex:1;overflow-y:auto;padding:14px;background:#faf9f7;"></div>
        </div>`;
    }

    function lookupView() {
        return `
            <p style="font-size:0.85rem;color:#555;margin-bottom:10px;">Enter your phone number to see your orders and chat with vendors.</p>
            <input id="vhWidgetPhone" type="tel" placeholder="Phone number" value="${escapeHtml(widgetPhone)}" style="width:100%;padding:10px;border:1.5px solid #ddd;border-radius:8px;margin-bottom:8px;box-sizing:border-box;">
            <button id="vhFindOrders" style="width:100%;padding:10px;border:none;border-radius:8px;background:var(--primary,#F68B1E);color:white;font-weight:600;cursor:pointer;">Find My Orders</button>
            <p style="font-size:0.78rem;color:#888;margin-top:14px;">Or jump straight to one order:</p>
            <input id="vhWidgetOrderCode" type="text" placeholder="Order code (e.g. ABC12345)" style="width:100%;padding:10px;border:1.5px solid #ddd;border-radius:8px;margin-bottom:8px;box-sizing:border-box;">
            <button id="vhOpenByCode" style="width:100%;padding:10px;border:1.5px solid var(--primary,#F68B1E);border-radius:8px;background:white;color:var(--primary,#F68B1E);font-weight:600;cursor:pointer;">Open That Order's Chat</button>
        `;
    }

    async function findOrders() {
        const phoneInput = document.getElementById('vhWidgetPhone');
        const phone = phoneInput ? phoneInput.value.trim() : widgetPhone;
        if (!phone) return;
        await loadConversationList(phone);
    }

    // Fetches and renders the conversation list for a given phone number.
    // Used both by the lookup screen's "Find My Orders" button and by the
    // chat screen's back button — the latter has no phone input on screen
    // (the customer may have arrived here directly via order-code search),
    // so it must not depend on reading one from the DOM.
    async function loadConversationList(phone) {
        widgetPhone = phone;
        sessionStorage.setItem('vh_widget_phone', phone);
        refreshWidgetBadge();

        document.getElementById('vhChatBody').innerHTML = '<p style="text-align:center;color:#999;">Loading your orders...</p>';
        try {
            const res = await fetch(`${getChatApi()}/customer/conversations?phone=${encodeURIComponent(phone)}`);
            const orders = await res.json();
            renderOrderList(orders);
        } catch (err) {
            document.getElementById('vhChatBody').innerHTML = '<p style="text-align:center;color:#c00;">Could not load orders. Try again.</p>';
        }
    }

    function renderOrderList(orders) {
        document.getElementById('vhChatTitle').textContent = 'Your Conversations';
        const body = document.getElementById('vhChatBody');
        if (!orders || orders.length === 0) {
            body.innerHTML = '<p style="text-align:center;color:#999;">No orders found for that number.</p><button id="vhBackToLookup" style="margin-top:10px;width:100%;padding:8px;border:1px solid #ddd;border-radius:8px;background:white;cursor:pointer;">&larr; Back</button>';
            document.getElementById('vhBackToLookup').onclick = showLookup;
            return;
        }
        body.innerHTML = orders.map(o => `
            <div class="vh-conv-item" data-order-id="${o.order_id}" data-order-code="${o.order_code}" style="background:white;border:1px solid #eee;border-radius:10px;padding:10px 12px;margin-bottom:8px;cursor:pointer;position:relative;">
                <div style="display:flex;justify-content:space-between;font-size:0.85rem;font-weight:700;">
                    <span>${escapeHtml(o.business_name)} ${o.unread_count > 0 ? `<span style="background:#e53935;color:white;border-radius:10px;padding:1px 7px;font-size:0.7rem;margin-left:4px;">${o.unread_count}</span>` : ''}</span>
                    <span style="color:#999;font-weight:500;">${o.order_code}</span>
                </div>
                <div style="font-size:0.8rem;color:#666;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                    ${o.last_message ? escapeHtml(o.last_message) : 'No messages yet — say hello!'}
                </div>
            </div>
        `).join('') + '<button id="vhBackToLookup" style="width:100%;padding:8px;border:1px solid #ddd;border-radius:8px;background:white;cursor:pointer;margin-top:4px;">&larr; Back</button>';

        document.querySelectorAll('.vh-conv-item').forEach(el => {
            el.onclick = () => openConversation(el.dataset.orderId, el.dataset.orderCode);
        });
        document.getElementById('vhBackToLookup').onclick = showLookup;
    }

    function openConversation(orderId, orderCode) {
        activeOrderId = orderId;
        activeOrderCode = orderCode;
        document.getElementById('vhChatTitle').textContent = `Order ${orderCode}`;
        document.getElementById('vhChatBody').innerHTML = `
            <div id="vhMessages" style="margin-bottom:8px;"></div>
        `;
        renderChatInput();
        loadMessages();
        if (pollTimer) clearInterval(pollTimer);
        pollTimer = setInterval(loadMessages, 5000);
    }

    function renderChatInput() {
        const panel = document.getElementById('vhChatPanel');
        let inputBar = document.getElementById('vhChatInputBar');
        if (!inputBar) {
            inputBar = document.createElement('div');
            inputBar.id = 'vhChatInputBar';
            inputBar.style.cssText = 'display:flex;gap:6px;padding:10px;border-top:1px solid #eee;background:white;';
            inputBar.innerHTML = `
                <button id="vhBackFromChat" style="border:none;background:none;font-size:18px;cursor:pointer;padding:0 4px;">&larr;</button>
                <input id="vhChatInput" type="text" placeholder="Type a message..." style="flex:1;padding:8px 10px;border:1.5px solid #ddd;border-radius:20px;">
                <button id="vhChatSend" style="border:none;background:var(--primary,#F68B1E);color:white;border-radius:20px;padding:8px 14px;cursor:pointer;">Send</button>
            `;
            panel.appendChild(inputBar);
            document.getElementById('vhChatSend').onclick = sendWidgetMessage;
            document.getElementById('vhChatInput').addEventListener('keypress', e => { if (e.key === 'Enter') sendWidgetMessage(); });
            document.getElementById('vhBackFromChat').onclick = () => {
                inputBar.remove();
                if (pollTimer) clearInterval(pollTimer);
                if (widgetPhone) {
                    loadConversationList(widgetPhone);
                } else {
                    // Shouldn't normally happen — order-code search also requires a
                    // phone number — but fall back to the lookup screen rather than
                    // leaving the widget stuck with nothing to show.
                    showLookup();
                }
            };
        }
    }

    async function loadMessages() {
        if (!activeOrderId) return;
        try {
            const res = await fetch(`${getChatApi()}/messages/${activeOrderId}?order_code=${activeOrderCode}&phone=${encodeURIComponent(widgetPhone)}`);
            const messages = await res.json();
            const container = document.getElementById('vhMessages');
            if (!container) return;
            if (messages.length === 0) {
                container.innerHTML = '<p style="text-align:center;color:#999;font-size:0.85rem;">No messages yet. Say hello!</p>';
            } else {
                container.innerHTML = messages.map(m => `
                    <div style="margin-bottom:8px;text-align:${m.sender_type === 'customer' ? 'right' : 'left'};">
                        <div style="display:inline-block;padding:8px 12px;border-radius:14px;font-size:0.85rem;max-width:80%;${m.sender_type === 'customer' ? 'background:var(--primary,#F68B1E);color:white;' : 'background:white;border:1px solid #eee;'}">${escapeHtml(m.content)}</div>
                        <div style="font-size:0.68rem;color:#999;margin-top:2px;">${escapeHtml(m.sender_name)} · ${new Date(m.created_at).toLocaleTimeString()}</div>
                    </div>
                `).join('');
                container.scrollTop = container.scrollHeight;
            }
            refreshWidgetBadge(); // opening this conversation just marked the other party's messages read server-side
        } catch (err) { console.error(err); }
    }

    async function sendWidgetMessage() {
        const input = document.getElementById('vhChatInput');
        const content = input.value.trim();
        if (!content || !activeOrderId) return;
        try {
            await fetch(`${getChatApi()}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order_code: activeOrderCode, phone_number: widgetPhone, content })
            });
            input.value = '';
            loadMessages();
        } catch (err) { console.error(err); }
    }

    async function openByCode() {
        const code = document.getElementById('vhWidgetOrderCode').value.trim();
        const phone = document.getElementById('vhWidgetPhone').value.trim();

        if (!code && !phone) {
            alert('Enter your order code, your phone number, or both.');
            return;
        }

        // No code given, just a phone number — that's really a "find my orders"
        // request, so reuse that flow instead of blocking them here.
        if (!code) {
            await findOrders();
            return;
        }

        // Order code alone is enough to look an order up — phone is optional
        // here and, when given, just narrows verification further.
        if (phone) {
            widgetPhone = phone;
            sessionStorage.setItem('vh_widget_phone', phone);
            refreshWidgetBadge();
        }
        openConversation(null, code);
        // Resolve the order_id via the tracking endpoint so message polling has a real id
        try {
            const res = await fetch(`${getChatApi()}/orders/track/${code}${phone ? '?phone=' + encodeURIComponent(phone) : ''}`);
            const data = await res.json();
            if (res.ok) {
                activeOrderId = data.id;
                if (!phone && data.phone_number) {
                    // We didn't have a phone number going in — the order record has
                    // one, so use it going forward so messaging keeps working.
                    widgetPhone = data.phone_number;
                    sessionStorage.setItem('vh_widget_phone', data.phone_number);
                }
            }
            loadMessages();
        } catch (err) { console.error(err); }
    }

    function showLookup() {
        const inputBar = document.getElementById('vhChatInputBar');
        if (inputBar) inputBar.remove();
        if (pollTimer) clearInterval(pollTimer);
        activeOrderId = null;
        document.getElementById('vhChatTitle').textContent = 'Messages';
        document.getElementById('vhChatBody').innerHTML = lookupView();
        document.getElementById('vhFindOrders').onclick = findOrders;
        document.getElementById('vhOpenByCode').onclick = openByCode;
    }

    async function refreshWidgetBadge() {
        if (!widgetPhone) return;
        try {
            const res = await fetch(`${getChatApi()}/customer/messages/unread-count?phone=${encodeURIComponent(widgetPhone)}`);
            const data = await res.json();
            const badge = document.getElementById('vhUnreadBadge');
            if (!badge) return;
            if (data.count > 0) {
                badge.textContent = data.count > 99 ? '99+' : data.count;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        } catch (err) { console.error(err); }
    }

    function initChatWidget() {
        if (document.getElementById('vhChatIcon')) return; // already initialized
        const wrapper = document.createElement('div');
        wrapper.innerHTML = widgetHTML();
        document.body.appendChild(wrapper);

        document.getElementById('vhChatIcon').onclick = () => {
            const panel = document.getElementById('vhChatPanel');
            const isOpen = panel.style.display === 'flex';
            panel.style.display = isOpen ? 'none' : 'flex';
            if (!isOpen && !activeOrderId) showLookup();
        };
        document.getElementById('vhChatClose').onclick = () => {
            document.getElementById('vhChatPanel').style.display = 'none';
        };

        refreshWidgetBadge(); // show a badge immediately if we already know this browser's phone number
        setInterval(refreshWidgetBadge, 15000); // and keep checking every 15s, even while the panel is closed
    }

    window.initChatWidget = initChatWidget;
})();
