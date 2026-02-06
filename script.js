document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolio script loaded successfully");

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('theme-toggle');

    // Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Dark Mode Toggle
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // Scroll Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Edit Profile Logic
    const editBtn = document.getElementById('edit-profile-btn');
    const editModal = document.getElementById('edit-modal');
    const closeModal = document.querySelector('.close-modal');
    const editForm = document.getElementById('edit-form');
    
    // Elements to edit
    const heroPhoto = document.getElementById('hero-photo');
    const profileName = document.getElementById('hero-name');
    const profileRole = document.getElementById('hero-role');
    const profileAbout = document.getElementById('about-desc');
    const navLogo = document.getElementById('nav-logo');
    const expRole = document.getElementById('exp-role');
    const expCompany = document.getElementById('exp-company');
    const expList = document.getElementById('exp-list');
    const eduDegree = document.getElementById('edu-degree');
    const eduUniversity = document.getElementById('edu-university');
    const eduCourses = document.getElementById('edu-courses');

    // Load saved data from LocalStorage
    const savedPhoto = localStorage.getItem('portfolio_photo');
    const savedName = localStorage.getItem('portfolio_name');
    const savedRole = localStorage.getItem('portfolio_role');
    const savedAbout = localStorage.getItem('portfolio_about');
    const savedExpRole = localStorage.getItem('portfolio_exp_role');
    const savedExpCompany = localStorage.getItem('portfolio_exp_company');
    const savedExpList = localStorage.getItem('portfolio_exp_list');
    const savedEduDegree = localStorage.getItem('portfolio_edu_degree');
    const savedEduUniversity = localStorage.getItem('portfolio_edu_university');
    const savedEduCourses = localStorage.getItem('portfolio_edu_courses');

    if (savedPhoto && heroPhoto) heroPhoto.src = savedPhoto;
    if (savedName) {
        if (profileName) profileName.textContent = savedName;
        if (navLogo) navLogo.textContent = savedName;
    }
    if (savedRole && profileRole) profileRole.textContent = savedRole;
    if (savedAbout && profileAbout) profileAbout.textContent = savedAbout;
    if (savedExpRole && expRole) expRole.textContent = savedExpRole;
    if (savedExpCompany && expCompany) expCompany.textContent = savedExpCompany;
    if (savedEduDegree && eduDegree) eduDegree.textContent = savedEduDegree;
    if (savedEduUniversity && eduUniversity) eduUniversity.textContent = savedEduUniversity;
    if (savedEduCourses && eduCourses) eduCourses.textContent = savedEduCourses;
    
    // Helper to render list from text
    const renderList = (text, ulElement) => {
        ulElement.innerHTML = '';
        const items = text.split('\n');
        items.forEach(item => {
            if (item.trim()) {
                const li = document.createElement('li');
                li.textContent = item;
                ulElement.appendChild(li);
            }
        });
    };

    if (savedExpList && expList) renderList(savedExpList, expList);

    // Open Modal
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            if (profileName) document.getElementById('name-input').value = profileName.textContent;
            if (profileRole) document.getElementById('role-input').value = profileRole.textContent;
            if (profileAbout) document.getElementById('about-input').value = profileAbout.textContent;
            if (expRole) document.getElementById('exp-role-input').value = expRole.textContent;
            if (expCompany) document.getElementById('exp-company-input').value = expCompany.textContent;
            if (expList) {
                const items = expList.querySelectorAll('li');
                const listText = Array.from(items).map(li => li.textContent).join('\n');
                document.getElementById('exp-list-input').value = listText;
            }
            if (eduDegree) document.getElementById('edu-degree-input').value = eduDegree.textContent;
            if (eduUniversity) document.getElementById('edu-university-input').value = eduUniversity.textContent;
            if (eduCourses) document.getElementById('edu-courses-input').value = eduCourses.textContent;
            editModal.style.display = 'block';
        });
    }

    // Close Modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            editModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target == editModal) {
            editModal.style.display = 'none';
        }
    });

    // Save Changes
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Handle Photo Upload
            const photoInput = document.getElementById('photo-input');
            if (photoInput.files && photoInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const base64String = e.target.result;
                    try {
                        localStorage.setItem('portfolio_photo', base64String);
                        if (heroPhoto) heroPhoto.src = base64String;
                    } catch (err) {
                        console.error("Image too large for localStorage", err);
                        alert("Image is too large to save. Please choose a smaller image.");
                    }
                };
                reader.readAsDataURL(photoInput.files[0]);
            }

            const newName = document.getElementById('name-input').value;
            const newRole = document.getElementById('role-input').value;
            const newAbout = document.getElementById('about-input').value;
            const newExpRole = document.getElementById('exp-role-input').value;
            const newExpCompany = document.getElementById('exp-company-input').value;
            const newExpList = document.getElementById('exp-list-input').value;
            const newEduDegree = document.getElementById('edu-degree-input').value;
            const newEduUniversity = document.getElementById('edu-university-input').value;
            const newEduCourses = document.getElementById('edu-courses-input').value;

            // Update DOM
            if (profileName) profileName.textContent = newName;
            if (navLogo) navLogo.textContent = newName;
            if (profileRole) profileRole.textContent = newRole;
            if (profileAbout) profileAbout.textContent = newAbout;
            if (expRole) expRole.textContent = newExpRole;
            if (expCompany) expCompany.textContent = newExpCompany;
            if (expList) renderList(newExpList, expList);
            if (eduDegree) eduDegree.textContent = newEduDegree;
            if (eduUniversity) eduUniversity.textContent = newEduUniversity;
            if (eduCourses) eduCourses.textContent = newEduCourses;

            // Save to LocalStorage
            localStorage.setItem('portfolio_name', newName);
            localStorage.setItem('portfolio_role', newRole);
            localStorage.setItem('portfolio_about', newAbout);
            localStorage.setItem('portfolio_exp_role', newExpRole);
            localStorage.setItem('portfolio_exp_company', newExpCompany);
            localStorage.setItem('portfolio_exp_list', newExpList);
            localStorage.setItem('portfolio_edu_degree', newEduDegree);
            localStorage.setItem('portfolio_edu_university', newEduUniversity);
            localStorage.setItem('portfolio_edu_courses', newEduCourses);

            editModal.style.display = 'none';
        });
    }
});