/**
 * Image Gallery Modal Functionality
 * Handles clickable images with modal overlay and navigation
 */

(function() {
    'use strict';

    // Gallery modal functionality
    class GalleryModal {
        constructor() {
            this.modal = document.getElementById('gallery-modal');
            this.modalImage = document.getElementById('modal-image');
            this.modalClose = document.getElementById('modal-close');
            this.modalPrev = document.getElementById('modal-prev');
            this.modalNext = document.getElementById('modal-next');
            this.modalCounter = document.getElementById('modal-counter');
            this.modalThumbnails = document.getElementById('modal-thumbnails');
            
            this.currentIndex = 0;
            this.images = [];
            this.currentGallery = '';
            
            // Swipe detection variables
            this.touchStartX = 0;
            this.touchStartY = 0;
            this.touchEndX = 0;
            this.touchEndY = 0;
            this.minSwipeDistance = 50;
            
            // Scroll sensitivity variables
            this.scrollAccumulator = 0;
            this.scrollThreshold = 100; // Higher value = less sensitive
            
            this.init();
        }

        init() {
            // Bind event listeners
            this.bindEvents();
            
            // Collect all gallery images
            this.collectImages();
        }

        bindEvents() {
            // Close modal events
            this.modalClose.addEventListener('click', () => this.closeModal());
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });

            // Navigation events
            this.modalPrev.addEventListener('click', () => this.previousImage());
            this.modalNext.addEventListener('click', () => this.nextImage());

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!this.modal.classList.contains('active')) return;
                
                switch(e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            });

            // Scroll navigation
            this.modal.addEventListener('wheel', (e) => {
                if (!this.modal.classList.contains('active')) return;
                
                e.preventDefault();
                
                // Accumulate scroll delta
                this.scrollAccumulator += e.deltaY;
                
                // Check if threshold is reached
                if (Math.abs(this.scrollAccumulator) >= this.scrollThreshold) {
                    if (this.scrollAccumulator > 0) {
                        // Scroll down - go to next image
                        this.nextImage();
                    } else {
                        // Scroll up - go to previous image
                        this.previousImage();
                    }
                    // Reset accumulator after navigation
                    this.scrollAccumulator = 0;
                }
            }, { passive: false });

            // Gallery image click events
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('gallery-image')) {
                    e.preventDefault();
                    this.openModal(e.target);
                }
            });

            // Touch events for swipe gestures
            this.modalImage.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
            this.modalImage.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
            
            // Mouse events for desktop swipe simulation
            this.modalImage.addEventListener('mousedown', (e) => this.handleMouseDown(e));
            this.modalImage.addEventListener('mouseup', (e) => this.handleMouseUp(e));
            this.modalImage.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
        }

        collectImages() {
            // This will be populated when a gallery is opened
            this.images = [];
        }

        openModal(clickedImage) {
            const galleryName = clickedImage.getAttribute('data-gallery');
            const imageIndex = parseInt(clickedImage.getAttribute('data-index'));
            
            // Collect all images in this gallery
            this.images = Array.from(document.querySelectorAll(`[data-gallery="${galleryName}"]`))
                .map(img => ({
                    src: img.src,
                    alt: img.alt
                }));
            
            this.currentGallery = galleryName;
            this.currentIndex = imageIndex;
            
            // Show modal
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Create thumbnails
            this.createThumbnails();
            
            // Update image and counter
            this.updateImage();
            this.updateCounter();
            this.updateThumbnails();
        }

        closeModal() {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        updateImage() {
            if (this.images.length > 0) {
                const currentImage = this.images[this.currentIndex];
                this.modalImage.src = currentImage.src;
                this.modalImage.alt = currentImage.alt;
            }
        }

        updateCounter() {
            if (this.images.length > 0) {
                this.modalCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
            }
        }

        createThumbnails() {
            // Clear existing thumbnails
            this.modalThumbnails.innerHTML = '';
            
            // Create thumbnail for each image
            this.images.forEach((image, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = image.src;
                thumbnail.alt = image.alt;
                thumbnail.className = 'modal-thumbnail';
                thumbnail.dataset.index = index;
                
                // Add click event to thumbnail
                thumbnail.addEventListener('click', () => {
                    this.currentIndex = index;
                    this.updateImage();
                    this.updateCounter();
                    this.updateThumbnails();
                });
                
                this.modalThumbnails.appendChild(thumbnail);
            });
        }

        updateThumbnails() {
            // Remove active class from all thumbnails
            const thumbnails = this.modalThumbnails.querySelectorAll('.modal-thumbnail');
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            
            // Add active class to current thumbnail
            if (thumbnails[this.currentIndex]) {
                thumbnails[this.currentIndex].classList.add('active');
                
                // Scroll thumbnail into view if needed
                thumbnails[this.currentIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }

        previousImage() {
            if (this.images.length === 0) return;
            
            this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
            this.updateImage();
            this.updateCounter();
            this.updateThumbnails();
        }

        nextImage() {
            if (this.images.length === 0) return;
            
            this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
            this.updateImage();
            this.updateCounter();
            this.updateThumbnails();
        }

        // Touch event handlers
        handleTouchStart(e) {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        }

        handleTouchEnd(e) {
            this.touchEndX = e.changedTouches[0].clientX;
            this.touchEndY = e.changedTouches[0].clientY;
            this.handleSwipe();
        }

        // Mouse event handlers for desktop
        handleMouseDown(e) {
            this.touchStartX = e.clientX;
            this.touchStartY = e.clientY;
            this.isMouseDown = true;
        }

        handleMouseUp(e) {
            if (!this.isMouseDown) return;
            this.touchEndX = e.clientX;
            this.touchEndY = e.clientY;
            this.isMouseDown = false;
            this.handleSwipe();
        }

        handleMouseLeave(e) {
            this.isMouseDown = false;
        }

        // Swipe detection logic
        handleSwipe() {
            const deltaX = this.touchEndX - this.touchStartX;
            const deltaY = this.touchEndY - this.touchStartY;
            const absDeltaX = Math.abs(deltaX);
            const absDeltaY = Math.abs(deltaY);

            // Only trigger if horizontal swipe is more significant than vertical
            if (absDeltaX > this.minSwipeDistance && absDeltaX > absDeltaY) {
                if (deltaX > 0) {
                    // Swipe right - go to previous image
                    this.previousImage();
                } else {
                    // Swipe left - go to next image
                    this.nextImage();
                }
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new GalleryModal());
    } else {
        new GalleryModal();
    }

})();
