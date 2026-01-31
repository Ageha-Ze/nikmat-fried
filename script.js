// =========================================
// NIKMAT FRIED CHICKEN - JAVASCRIPT
// =========================================

// Initialize the website
document.addEventListener('DOMContentLoaded', function () {
    // Initialize loading screen
    initLoadingScreen();

    // Initialize other components
    initHeroSlider();
    initNavigation();
    initHamburger();
    initScrollAnimation();
    initOrderModal();
    initCatalogCart();
});

// Loading Screen Function
function initLoadingScreen() {
    // Hide loading screen after 1 second to ensure animation is visible
    setTimeout(function () {
        document.body.classList.add('loaded');

        // Remove loading screen from DOM after transition
        setTimeout(function () {
            const loadingScreen = document.querySelector('.loading-screen');
            if (loadingScreen) {
                loadingScreen.remove();
            }
        }, 500);
    }, 1000);

    // Also hide loading screen when page is fully loaded
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');

        setTimeout(function () {
            const loadingScreen = document.querySelector('.loading-screen');
            if (loadingScreen) {
                loadingScreen.remove();
            }
        }, 500);
    });
}

document.addEventListener('DOMContentLoaded', function () {

    // =========================================
    // MOBILE MENU TOGGLE
    // =========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // =========================================
    // HEADER SCROLL EFFECT
    // =========================================
    const header = document.getElementById('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =========================================
    // ACTIVE NAV LINK ON SCROLL
    // =========================================
    const sections = document.querySelectorAll('section[id]');

    function activeMenu() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', activeMenu);

    // =========================================
    // HERO SLIDER
    // =========================================
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Remove active from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current slide
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Auto slide every 5 seconds
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) currentSlide = 0;
        showSlide(currentSlide);
    }

    let slideInterval = setInterval(nextSlide, 5000);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            clearInterval(slideInterval);
            showSlide(index);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });

    // =========================================
    // SMOOTH SCROLL
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================
    // SCROLL ANIMATIONS
    // =========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.menu-item, .gallery-item, .feature-item').forEach(el => {
        observer.observe(el);
    });

    // =========================================
    // GALLERY LIGHTBOX
    // =========================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const img = this.querySelector('img');
            if (img) {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="lightbox-close">&times;</span>
                        <img src="${img.src}" alt="${img.alt}">
                    </div>
                `;

                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';

                lightbox.addEventListener('click', function (e) {
                    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = 'auto';
                    }
                });
            }
        });
    });

    // =========================================
    // WHATSAPP FLOAT BUTTON
    // =========================================
    const whatsappButton = document.querySelector('.whatsapp-float');

    if (whatsappButton) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                whatsappButton.style.opacity = '1';
                whatsappButton.style.visibility = 'visible';
            } else {
                whatsappButton.style.opacity = '0';
                whatsappButton.style.visibility = 'hidden';
            }
        });

        whatsappButton.style.transition = 'all 0.3s ease';
    }

    // =========================================
    // ORDER MECHANISM FUNCTIONS
    // =========================================
    let currentOrder = {
        name: '',
        price: 0,
        quantity: 1,
        image: '',
        description: ''
    };

    // HANYA SATU CART UNTUK CATALOG
    let catalogCart = [];

    // Catalog Menu Data
    const catalogMenuItems = [
        { id: 1, name: 'Paket Nikmatnya Kebersamaan', price: 150000 },
        { id: 2, name: 'Krispi Bakar Lada Hitam', price: 11000 },
        { id: 3, name: 'Krispi Bakar BBQ', price: 11000 },
        { id: 4, name: 'Ayam Krispi Bumbu Balado', price: 11000 },
        { id: 5, name: 'Sate Mini Krispi', price: 3000 },
        { id: 6, name: 'Geprek Original', price: 11000 },
        { id: 7, name: 'Geprek Bakar Hot BBQ', price: 12000 },
        { id: 8, name: 'Ayam Krispi Original', price: 7500 },
        { id: 9, name: 'Nasi Pulen Kemliket', price: 3000 },
        { id: 10, name: 'Tahu-Tahu Krispi', price: 2000 },
        { id: 11, name: 'Nikmat Kopi', price: 10000 },
        { id: 12, name: 'Palm Sugar', price: 10000 },
        { id: 13, name: 'Iced Latte', price: 10000 },
        { id: 14, name: 'Iced Almond', price: 10000 },
        { id: 15, name: 'Cocopresso', price: 10000 }
    ];

    // Menu Data (sistem lama - tidak dipakai lagi)
    const menuItems = [
        { id: 1, name: 'Sayap', price: 25000, image: 'images/sayap.jpg', description: 'Potongan sayap ayam yang renyah dan gurih dengan bumbu rahasia.' },
        { id: 2, name: 'Paha', price: 22000, image: 'images/paha.jpg', description: 'Potongan paha ayam yang juicy dengan tekstur renyah di luar.' },
        { id: 3, name: 'Dada', price: 20000, image: 'images/dada.jpg', description: 'Potongan dada ayam yang lembut dengan bumbu khas yang meresap.' },
        { id: 4, name: 'Tahu Krispi', price: 8000, image: 'images/tahu-krispi.jpg', description: 'Kamu jangan sok tahu, kalau gak tahu dan belum pernah tahu untuk coba tahu ini. Silahkan mencari tahu biar kamu tahu, tahu-tahu kamu nanti tahu rasanya tahu krispi ini. Cukup tahu saja...' },
        { id: 5, name: 'Krispi Ayam Bakar BBQ', price: 28000, image: 'images/krispi-bbq1.jpg', description: 'Perpaduan ayam krispi dan bakaran bumbu BBQ tanpa sambal pedas, sensasi istimewa untuk kamu yang istimewa dan gak suka huhah!' },
        { id: 6, name: 'Geprek Original', price: 23000, image: 'images/geprek-original2.jpg', description: 'Terkadang digeprek dengan pelampiasan emosi, dibalur dengan sambal bawang pedas nikmat, dan diiringi hijau timun yang memikat.' },
        { id: 7, name: 'Paha Atas', price: 24000, image: 'images/paha-atas.jpg', description: 'Salah satu menu andalan, best seller, dan favorit pelanggan yang suka sesuatu yang lembut tapi badass !!' },
        { id: 8, name: 'Sate Krispi', price: 15000, image: 'images/sate-krispi.jpg', description: 'Jangan kecewa kalo gak kebagian, karena stok menu Sate Krispi ini sangat favorit dan populev dalam 1 RT !' },
        { id: 9, name: 'Nikmat Kopi', price: 15000, image: 'images/kopi1.jpg', description: 'Bagimu penikmat senja, harus siap ditemani dengan minuman yang penuh candu ini' },
        { id: 10, name: 'Kopi Susu', price: 18000, image: 'images/kopi2.jpg', description: 'Perpaduan sempurna antara kopi nikmat dan susu creamy, teman setia di kala malam' }
    ];

    // Initialize cart on page load
    function initializeCart() {
        const savedCart = localStorage.getItem('catalogCart');
        if (savedCart) {
            try {
                catalogCart = JSON.parse(savedCart);
                updateCatalogCartDisplay();
            } catch (e) {
                console.error('Error loading cart from localStorage:', e);
                catalogCart = [];
            }
        }
    }

    // Initialize cart when DOM is loaded
    initializeCart();

    // =========================================
    // LOADING SCREEN
    // =========================================
    function hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            // Add a small delay to ensure the loading animation is visible
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                document.body.classList.add('loaded');
            }, 1000);
        }
    }

    // Hide loading screen when page is fully loaded
    window.addEventListener('load', hideLoadingScreen);

    // Also hide loading screen after 3 seconds as fallback
    setTimeout(hideLoadingScreen, 3000);

    // Open Quantity Modal
    window.openQuantityModal = function (itemId) {
        const item = menuItems.find(m => m.id === itemId);
        if (!item) return;

        currentOrder = {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image,
            description: item.description
        };

        // Set modal content
        document.getElementById('modal-menu-name').textContent = item.name;
        document.getElementById('modal-menu-description').textContent = item.description;
        document.getElementById('modal-menu-image').src = item.image;
        document.getElementById('modal-quantity').textContent = '1';
        updateModalPrice();

        // Show modal
        document.getElementById('order-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Close Order Modal
    window.closeOrderModal = function () {
        document.getElementById('order-modal').classList.remove('active');
        document.body.style.overflow = '';
        currentOrder.quantity = 1;
    };

    // Change Quantity
    window.changeQuantity = function (change) {
        currentOrder.quantity += change;
        if (currentOrder.quantity < 1) currentOrder.quantity = 1;
        document.getElementById('modal-quantity').textContent = currentOrder.quantity;
        updateModalPrice();
    };

    // Update Modal Price
    function updateModalPrice() {
        const totalPrice = currentOrder.price * currentOrder.quantity;
        document.getElementById('modal-total-price').textContent = formatRupiah(totalPrice);
    }

    // Add to Cart
    window.addToCart = function () {
        const existingItem = cart.find(item => item.id === currentOrder.id);

        if (existingItem) {
            existingItem.quantity += currentOrder.quantity;
        } else {
            cart.push({ ...currentOrder });
        }

        updateCartDisplay();
        closeOrderModal();
        alert(`Berhasil menambahkan ${currentOrder.quantity} ${currentOrder.name} ke keranjang!`);
    };

    // Update Cart Display
    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalDisplay = document.getElementById('cart-total');
        const emptyCartMessage = document.getElementById('empty-cart-message');

        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';

            let total = 0;

            cart.forEach(item => {
                total += item.price * item.quantity;

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${formatRupiah(item.price)}</div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-control-cart">
                            <button onclick="changeCartQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="changeCartQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button onclick="removeFromCart(${item.id})" class="btn-remove" style="background: #dc2626; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Hapus</button>
                    </div>
                `;

                cartItemsContainer.appendChild(cartItem);
            });

            cartTotalDisplay.textContent = formatRupiah(total);
        }
    }

    // Change Cart Quantity
    window.changeCartQuantity = function (itemId, change) {
        const cartItem = cart.find(item => item.id === itemId);
        if (cartItem) {
            cartItem.quantity += change;
            if (cartItem.quantity < 1) {
                removeFromCart(itemId);
            } else {
                updateCartDisplay();
            }
        }
    };

    // Remove from Cart
    window.removeFromCart = function (itemId) {
        cart = cart.filter(item => item.id !== itemId);
        updateCartDisplay();
    };

    // Send Order via WhatsApp
    window.sendOrderViaWhatsApp = function () {
        const customerName = document.getElementById('order-name').value.trim();
        const customerAddress = document.getElementById('order-address').value.trim();
        const customerNotes = document.getElementById('order-notes').value.trim();

        if (!customerName || !customerAddress) {
            alert('Mohon lengkapi Nama dan Alamat sebelum memesan.');
            return;
        }

        if (cart.length === 0) {
            alert('Keranjang masih kosong. Silakan pilih menu terlebih dahulu.');
            return;
        }

        let message = `*PESANAN BARU - NIKMAT FRIED CHICKEN*\n=========================\n*Detail Pemesan:*\nNama: *${customerName}*\nAlamat: *${customerAddress}*`;

        if (customerNotes) {
            message += `\nCatatan: *${customerNotes}*`;
        }

        message += `\n=========================\n\n*Rincian Pesanan:*\n`;

        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            message += `*- ${item.name}*\n  (${item.quantity} x ${formatRupiah(item.price)}) = *${formatRupiah(itemTotal)}*\n`;
        });

        message += `\n*TOTAL PESANAN: ${formatRupiah(total)}*\n\n_Mohon ditunggu konfirmasinya. Terima kasih!_`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/628999410174?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    // Format Rupiah
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    }

    // Close modal when clicking outside
    document.getElementById('order-modal').addEventListener('click', function (e) {
        if (e.target.id === 'order-modal') {
            closeOrderModal();
        }
    });
    // =========================================
    // CATALOG CART FUNCTIONS
    // =========================================

    // Add to Catalog Cart
    window.addToCatalogCart = function (itemId) {
        const menuItem = catalogMenuItems.find(item => item.id === itemId);

        if (!menuItem) {
            console.error('Menu item not found:', itemId);
            return;
        }

        const existingItem = catalogCart.find(item => item.id === itemId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            catalogCart.push({
                id: menuItem.id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: 1
            });
        }

        // Save cart to localStorage
        localStorage.setItem('catalogCart', JSON.stringify(catalogCart));

        console.log('Cart updated:', catalogCart); // Debug log
        updateCatalogCartDisplay();

        // Show notification
        showNotification(`${menuItem.name} berhasil ditambahkan ke keranjang!`);
    };

    // Update Catalog Cart Display
    function updateCatalogCartDisplay() {
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
            const cartItemsContainer = document.getElementById('cart-items');
            const cartTotalDisplay = document.getElementById('cart-total');
            const emptyCartMessage = document.getElementById('empty-cart-message');
            const btnOrderWhatsApp = document.getElementById('btnOrderWhatsApp');

            if (!cartItemsContainer || !cartTotalDisplay || !btnOrderWhatsApp) {
                console.error('Cart elements not found in DOM');
                console.log('Available elements:', {
                    cartItemsContainer: !!cartItemsContainer,
                    cartTotalDisplay: !!cartTotalDisplay,
                    emptyCartMessage: !!emptyCartMessage,
                    btnOrderWhatsApp: !!btnOrderWhatsApp
                });
                return;
            }

            cartItemsContainer.innerHTML = '';

            if (catalogCart.length === 0) {
                // Only try to show/hide empty cart message if it exists
                if (emptyCartMessage) {
                    emptyCartMessage.style.display = 'block';
                }
                btnOrderWhatsApp.disabled = true;
                // Set total to 0 when cart is empty
                cartTotalDisplay.textContent = formatRupiah(0);
            } else {
                // Only try to hide empty cart message if it exists
                if (emptyCartMessage) {
                    emptyCartMessage.style.display = 'none';
                }
                btnOrderWhatsApp.disabled = false;

                let total = 0;

                catalogCart.forEach(item => {
                    total += item.price * item.quantity;

                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">${formatRupiah(item.price)} x ${item.quantity}</div>
                        </div>
                        <div class="cart-item-controls">
                            <div class="quantity-control-cart">
                                <button onclick="changeCatalogCartQuantity(${item.id}, -1)">−</button>
                                <span>${item.quantity}</span>
                                <button onclick="changeCatalogCartQuantity(${item.id}, 1)">+</button>
                            </div>
                            <button onclick="removeFromCatalogCart(${item.id})" class="btn-remove">
                                <span>🗑️</span> Hapus
                            </button>
                        </div>
                    `;

                    cartItemsContainer.appendChild(cartItem);
                });

                cartTotalDisplay.textContent = formatRupiah(total);
            }
        }, 50);
    }

    // Change Catalog Cart Quantity
    window.changeCatalogCartQuantity = function (itemId, change) {
        const cartItem = catalogCart.find(item => item.id === itemId);
        if (cartItem) {
            cartItem.quantity += change;
            if (cartItem.quantity < 1) {
                removeFromCatalogCart(itemId);
            } else {
                // Save cart to localStorage
                localStorage.setItem('catalogCart', JSON.stringify(catalogCart));
                updateCatalogCartDisplay();
            }
        }
    };

    // Remove from Catalog Cart
    window.removeFromCatalogCart = function (itemId) {
        const item = catalogCart.find(i => i.id === itemId);
        if (item && confirm(`Hapus ${item.name} dari keranjang?`)) {
            catalogCart = catalogCart.filter(item => item.id !== itemId);
            // Save cart to localStorage
            localStorage.setItem('catalogCart', JSON.stringify(catalogCart));
            updateCatalogCartDisplay();
            showNotification('Item berhasil dihapus dari keranjang');
        }
    };

    // Send Catalog Order via WhatsApp
    window.sendCatalogOrderViaWhatsApp = function () {
        if (catalogCart.length === 0) {
            alert('Keranjang masih kosong. Silakan pilih menu terlebih dahulu.');
            return;
        }

        let message = `*PESANAN BARU - NIKMAT FRIED CHICKEN*\n\nProduk:\n`;

        let total = 0;
        let itemNumber = 1;

        catalogCart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            message += `${itemNumber}. ${item.name} - Jumlah: ${item.quantity} pcs - Harga Satuan: ${formatRupiah(item.price)}\n`;
            itemNumber++;
        });

        message += `\nTotal: *${formatRupiah(total)}*\n`;
        message += `*Belum termasuk ongkos kirim*\n\n`;
        message += `Mohon konfirmasi ketersediaan dan detail pengiriman. Terima kasih!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/628999410174?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');

        // Clear cart after order
        if (confirm('Pesanan sudah dikirim. Kosongkan keranjang?')) {
            catalogCart = [];
            localStorage.setItem('catalogCart', JSON.stringify(catalogCart));
            // Force update the display immediately
            updateCatalogCartDisplay();
            // Auto refresh page after clearing cart
            setTimeout(() => {
                location.reload();
            }, 100);
        }
    };

    // Clear Catalog Cart
    window.clearCatalogCart = function () {
        if (catalogCart.length === 0) {
            alert('Keranjang sudah kosong.');
            return;
        }

        if (confirm('Anda yakin ingin mengosongkan seluruh keranjang?')) {
            catalogCart = [];
            localStorage.setItem('catalogCart', JSON.stringify(catalogCart));
            updateCatalogCartDisplay();
            showNotification('Keranjang berhasil dikosongkan');
        }
    };

    // Show Notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
            z-index: 10000;
            font-weight: 600;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});

// =========================================
// NOTIFICATION ANIMATIONS
// =========================================
const notificationStyles = `
@keyframes slideInRight {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(400px);
        opacity: 0;
    }
}
`;

const notifStyle = document.createElement('style');
notifStyle.textContent = notificationStyles;
document.head.appendChild(notifStyle);

// =========================================
// LIGHTBOX STYLES
// =========================================
const lightboxStyles = `
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    animation: fadeIn 0.3s ease;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
}

.lightbox-content img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 10px;
}

.lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.lightbox-close:hover {
    color: #FDB813;
    transform: rotate(90deg);
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
`;

const style = document.createElement('style');
style.textContent = lightboxStyles;
document.head.appendChild(style);

console.log('🍗 Nikmat Fried Chicken Website Loaded!');