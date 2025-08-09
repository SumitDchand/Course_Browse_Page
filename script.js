document.addEventListener('DOMContentLoaded', function() {
            
    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    // You can add the mobile menu HTML and toggle logic here if needed.

    // --- Age Filter Generation & Interaction ---
    const ageFiltersContainer = document.getElementById('age-filters');
    const ageRanges = [
        '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10', 
        '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', 
        '17-18', '18-19', '19-20'
    ];
    const borderHexColors = [
        '#FFD400', '#FFD400', '#FFD400',
        '#FF7B00', '#FF7B00', '#FF7B00',
        '#F953E8', '#F953E8', '#F953E8', '#F953E8', '#F953E8',
        '#4ADE80', '#4ADE80', '#4ADE80',
        '#08B3EC', '#08B3EC', '#08B3EC', '#08B3EC', '#08B3EC'
    ];
    const activeColorClasses = [
        'active-yellow', 'active-yellow', 'active-yellow',
        'active-orange', 'active-orange', 'active-orange',
        'active-pink', 'active-pink', 'active-pink', 'active-pink', 'active-pink',
        'active-green', 'active-green', 'active-green',
        'active-sky', 'active-sky', 'active-sky', 'active-sky', 'active-sky'
    ];

    // Generate the buttons
    if (ageFiltersContainer) {
        ageRanges.forEach((range, index) => {
            const button = document.createElement('button');
            const color = borderHexColors[index] || '#D1D5DB'; // Fallback color
            
            // Set base classes without the border color class
            button.className = `age-filter flex-shrink-0 px-2 py-1 rounded-lg font-normal border-2 text-gray-600  transition-all duration-300`;
            
            // Apply the border color directly using the style property
            button.style.borderColor = color;
            
            // Create spans for the number and the word "Years"
            const rangeSpan = document.createElement('span');
            rangeSpan.className = 'block font-normal text-sm';
            rangeSpan.textContent = range;
            
            const yearsSpan = document.createElement('span');
            yearsSpan.className = 'block text-xs';
            yearsSpan.textContent = 'Years';
            
            button.appendChild(rangeSpan);
            button.appendChild(yearsSpan);
            
            button.dataset.range = range;
            // Add a small delay for staggered animation effect
            button.style.animation = `fadeInUp 0.5s ease-out ${index * 0.05}s forwards`;
            button.style.opacity = 0; // Start hidden for animation
            ageFiltersContainer.appendChild(button);
        });

        // Handle click events on the generated buttons
        ageFiltersContainer.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('.age-filter');
            if (clickedButton) {
                const clickedIndex = Array.from(ageFiltersContainer.children).indexOf(clickedButton);
                const activeClass = activeColorClasses[clickedIndex];

                // Remove 'active' class from all buttons
                ageFiltersContainer.querySelectorAll('.age-filter').forEach(btn => {
                    btn.classList.remove('active', 'active-yellow', 'active-orange', 'active-pink', 'active-green', 'active-sky');
                });
                // Add 'active' class and the specific color class to the clicked button
                clickedButton.classList.add('active', activeClass);
                
                // Here you would typically filter courses based on the selected age
                console.log('Selected age range:', clickedButton.dataset.range);
            }
        });

        // Set the '7-8 Years' button as active by default
        const ageButtons = ageFiltersContainer.querySelectorAll('.age-filter');
        ageButtons.forEach((button, index) => {
            if (button.dataset.range === '7-8') {
                button.classList.add('active', activeColorClasses[index]);
            }
        });
    }

    // --- Webinar Carousel Logic ---
    const webinarCarousel = document.getElementById('webinar-carousel');
    const webinarNextBtn = document.getElementById('webinar-next');
    // testing scrolls
    
    // --- Generic Carousel Setup Function ---
    function setupCarousel(carouselId, nextBtnId) {
        const carousel = document.getElementById(carouselId);
        const nextBtn = document.getElementById(nextBtnId);

        if (carousel && nextBtn) {
            const scrollAmount = () => {
                const firstCard = carousel.querySelector(':first-child');
                if (firstCard) {
                    const style = window.getComputedStyle(firstCard);
                    const marginRight = parseInt(style.marginRight, 10) || 32; // 32px is space-x-8
                    return firstCard.offsetWidth + marginRight;
                }
                return 300;
            };

            nextBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
            });
        }
    }

    // --- Initialize all carousels ---
    setupCarousel('new-launches-carousel', 'new-launches-next');
    setupCarousel('featured-courses-carousel', 'featured-courses-next');
    setupCarousel('top-teachers-carousel', 'top-teachers-next');
    setupCarousel('webinar-carousel', 'webinar-next');
    setupCarousel('category-courses-carousel', 'category-courses-next');
    setupCarousel('time-courses-carousel', 'time-courses-next');

     // testing scrolls


    if (webinarCarousel && webinarNextBtn) {
        const scrollAmount = () => {
            // Calculate the width of a single card + its margin
            const firstCard = webinarCarousel.querySelector('.webinar-card');
            if (firstCard) {
                // w-80 is 20rem (320px), space-x-8 is 2rem (32px)
                return firstCard.offsetWidth + 32; 
            }
            return 300; // Fallback value
        };

        webinarNextBtn.addEventListener('click', () => {
            webinarCarousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });
    }

    // --- Popular Categories Filter Logic ---
    const categoriesContainer = document.getElementById('popular-categories');
    const categoryCourses = document.querySelectorAll('#category-courses-carousel .category-course-card');

    if (categoriesContainer && categoryCourses.length > 0) {
        const categoryButtons = categoriesContainer.querySelectorAll('.category-filter');

        categoriesContainer.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('.category-filter');
            if (clickedButton) {
                const selectedCategory = clickedButton.dataset.category;

                // Update active state for buttons
                categoryButtons.forEach(btn => {
                    btn.classList.remove('active', 'coding', 'speaking', 'chess', 'homework', 'app');
                });
                clickedButton.classList.add('active', selectedCategory);
                
                // Filter the course cards
                categoryCourses.forEach(card => {
                    if (card.dataset.category === selectedCategory) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    }
    
    // --- Time Filter Logic ---
    const timeFiltersContainer = document.getElementById('time-filters');
    const timeCourses = document.querySelectorAll('#time-courses-carousel .time-course-card');

    if (timeFiltersContainer && timeCourses.length > 0) {
        const timeFilterButtons = timeFiltersContainer.querySelectorAll('.time-filter');

        timeFiltersContainer.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('.time-filter');
            if (clickedButton) {
                const selectedTime = clickedButton.dataset.time;

                // Update active state for buttons
                timeFilterButtons.forEach(btn => btn.classList.remove('active'));
                clickedButton.classList.add('active');
                
                // Filter the course cards
                timeCourses.forEach(card => {
                    if (card.dataset.time === selectedTime) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    }

});
