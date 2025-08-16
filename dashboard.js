document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Initialize dashboard functionality
    initializeDashboard();
    
    // Initialize Meet (replaces chat widget)
    initializeMeet();
    
    // Initialize file upload
    initializeFileUpload();
    
    // Initialize event handlers
    initializeEventHandlers();

    // Initialize user search
    initializeUserSearch();

    // Initialize mobile menu
    initializeMobileMenu();

    // Initialize Profile and Settings
    initializeProfileAndSettings();

    // Initialize Post System
    initializePostSystem();

    // Initialize Calendar
    initializeCalendar();
    
    // Add mobile-specific enhancements
    initializeMobileEnhancements();
    
    // Initialize network monitoring
    initializeNetworkMonitoring();
});

// Initialize Profile and Settings Management
function initializeProfileAndSettings() {
    // Load user data
    loadUserData();
    
    // Modal event listeners
    const editProfileBtn = document.getElementById('editProfile');
    const openSettingsBtn = document.getElementById('openSettings');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', openProfileModal);
    }
    
    if (openSettingsBtn) {
        openSettingsBtn.addEventListener('click', openSettingsModal);
    }
    
    // Profile modal events
    const closeProfileModalBtn = document.getElementById('closeProfileModal');
    const cancelProfileBtn = document.getElementById('cancelProfile');
    const profileForm = document.getElementById('profileForm');
    const avatarInput = document.getElementById('avatarInput');
    
    if (closeProfileModalBtn) {
        closeProfileModalBtn.addEventListener('click', closeProfileModal);
    }
    
    if (cancelProfileBtn) {
        cancelProfileBtn.addEventListener('click', closeProfileModal);
    }
    
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileSubmit);
    }
    
    if (avatarInput) {
        avatarInput.addEventListener('change', handleAvatarUpload);
    }
    
    // Settings modal events
    const closeSettingsModalBtn = document.getElementById('closeSettingsModal');
    if (closeSettingsModalBtn) {
        closeSettingsModalBtn.addEventListener('click', closeSettingsModal);
    }
    
    // Settings tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', switchSettingsTab);
    });
    
    // Account settings
    const accountForm = document.getElementById('accountForm');
    if (accountForm) {
        accountForm.addEventListener('submit', handleAccountUpdate);
    }
    
    // Privacy settings
    const savePrivacyBtn = document.getElementById('savePrivacy');
    if (savePrivacyBtn) {
        savePrivacyBtn.addEventListener('click', savePrivacySettings);
    }
    
    // Accessibility settings
    const decreaseFontBtn = document.getElementById('decreaseFont');
    const increaseFontBtn = document.getElementById('increaseFont');
    const saveAccessibilityBtn = document.getElementById('saveAccessibility');
    const resetAccessibilityBtn = document.getElementById('resetAccessibility');
    
    if (decreaseFontBtn) {
        decreaseFontBtn.addEventListener('click', decreaseFontSize);
    }
    
    if (increaseFontBtn) {
        increaseFontBtn.addEventListener('click', increaseFontSize);
    }
    
    if (saveAccessibilityBtn) {
        saveAccessibilityBtn.addEventListener('click', saveAccessibilitySettings);
    }
    
    if (resetAccessibilityBtn) {
        resetAccessibilityBtn.addEventListener('click', resetAccessibilitySettings);
    }
    
    // Notification settings
    const saveNotificationsBtn = document.getElementById('saveNotifications');
    if (saveNotificationsBtn) {
        saveNotificationsBtn.addEventListener('click', saveNotificationSettings);
    }
    
    // Load saved settings
    loadAccessibilitySettings();
    applyAccessibilitySettings();
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Profile and Settings Variables
let currentUser = null;
let accessibilitySettings = {
    fontSize: 'medium',
    highContrast: false,
    colorBlindFriendly: false,
    reduceMotion: false,
    screenReaderSupport: false,
    keyboardNavigation: false
};

// Load user data
function loadUserData() {
    const user = JSON.parse(localStorage.getItem('currentUser') || localStorage.getItem('studymate_user') || '{}');
    currentUser = {
        firstName: user.firstName || user.name || 'User',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        bio: user.bio || '',
        institution: user.institution || '',
        major: user.major || '',
        year: user.year || '',
        location: user.location || '',
        interests: user.interests || '',
        skills: user.skills || '',
        avatar: user.avatar || 'https://via.placeholder.com/120',
        ...user
    };
    
    // Update UI with user data
    updateUserInterface();
}

// Update user interface
function updateUserInterface() {
    // Update navigation
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(element => {
        element.textContent = currentUser.firstName;
    });
    
    const userAvatarElements = document.querySelectorAll('.user-avatar');
    userAvatarElements.forEach(element => {
        element.src = currentUser.avatar;
    });
    
    // Update dashboard header
    const dashboardHeader = document.querySelector('.dashboard-header h1');
    if (dashboardHeader) {
        dashboardHeader.textContent = `Welcome back, ${currentUser.firstName}!`;
    }
}

// Profile Modal Functions
function openProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        populateProfileForm();
        modal.style.display = 'block';
        
        // Add real-time preview updates
        addRealTimeProfileUpdates();
    }
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.style.display = 'none';
        // Remove real-time update listeners
        removeRealTimeProfileUpdates();
    }
}

function populateProfileForm() {
    const fields = [
        'profileFirstName', 'profileLastName', 'profileEmail', 'profilePhone',
        'profileDateOfBirth', 'profileGender', 'profileBio', 'profileUniversity',
        'profileField', 'profileYear', 'profileLocation', 'profileInterests', 
        'profileSkills', 'profileGoals'
    ];
    
    fields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            const fieldName = fieldId.replace('profile', '').toLowerCase();
            element.value = currentUser[fieldName] || '';
        }
    });
    
    const profileAvatar = document.getElementById('profileAvatar');
    if (profileAvatar) {
        profileAvatar.src = currentUser.avatar || 'https://via.placeholder.com/120';
    }
}

// Add real-time profile updates
function addRealTimeProfileUpdates() {
    const fields = [
        'profileFirstName', 'profileLastName', 'profileEmail', 'profilePhone',
        'profileDateOfBirth', 'profileGender', 'profileBio', 'profileUniversity',
        'profileField', 'profileYear', 'profileLocation', 'profileInterests', 
        'profileSkills', 'profileGoals'
    ];
    
    fields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.addEventListener('input', updateProfilePreview);
            element.addEventListener('change', updateProfilePreview);
        }
    });
}

// Remove real-time profile updates
function removeRealTimeProfileUpdates() {
    const fields = [
        'profileFirstName', 'profileLastName', 'profileEmail', 'profilePhone',
        'profileDateOfBirth', 'profileGender', 'profileBio', 'profileUniversity',
        'profileField', 'profileYear', 'profileLocation', 'profileInterests', 
        'profileSkills', 'profileGoals'
    ];
    
    fields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.removeEventListener('input', updateProfilePreview);
            element.removeEventListener('change', updateProfilePreview);
        }
    });
}

// Update profile preview in real-time
function updateProfilePreview() {
    const firstName = document.getElementById('profileFirstName')?.value || currentUser.firstName || '';
    const lastName = document.getElementById('profileLastName')?.value || currentUser.lastName || '';
    const bio = document.getElementById('profileBio')?.value || currentUser.bio || '';
    const university = document.getElementById('profileUniversity')?.value || currentUser.university || '';
    const field = document.getElementById('profileField')?.value || currentUser.field || '';
    const location = document.getElementById('profileLocation')?.value || currentUser.location || '';
    
    // Update dashboard header in real-time
    const dashboardHeader = document.querySelector('.dashboard-header h1');
    if (dashboardHeader && firstName) {
        dashboardHeader.textContent = `Welcome back, ${firstName}!`;
    }
    
    // Update user name elements in real-time
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(element => {
        element.textContent = firstName || 'User';
    });
    
    // Show preview notification
    showNotification('Profile preview updated!', 'info');
}

function handleProfileSubmit(e) {
    e.preventDefault();
    
    // Validate required fields
    const firstName = document.getElementById('profileFirstName')?.value.trim();
    const lastName = document.getElementById('profileLastName')?.value.trim();
    const email = document.getElementById('profileEmail')?.value.trim();
    
    if (!firstName || !lastName || !email) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Show loading state
    const saveBtn = document.querySelector('#profileModal .btn-primary');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;
    
    // Update user data
    currentUser = {
        ...currentUser,
        firstName,
        lastName,
        email,
        phone: document.getElementById('profilePhone')?.value.trim() || '',
        dateOfBirth: document.getElementById('profileDateOfBirth')?.value || '',
        gender: document.getElementById('profileGender')?.value || '',
        bio: document.getElementById('profileBio')?.value.trim() || '',
        university: document.getElementById('profileUniversity')?.value.trim() || '',
        field: document.getElementById('profileField')?.value || '',
        year: document.getElementById('profileYear')?.value || '',
        location: document.getElementById('profileLocation')?.value.trim() || '',
        interests: document.getElementById('profileInterests')?.value.trim() || '',
        skills: document.getElementById('profileSkills')?.value.trim() || '',
        goals: document.getElementById('profileGoals')?.value.trim() || ''
    };
    
    // Save to Firebase database
    if (window.firebaseDB) {
        window.firebaseDB.updateUser(email, currentUser).then(result => {
            if (result.success) {
                console.log('Profile updated in Firebase database');
            } else {
                console.error('Failed to update profile in database:', result.error);
            }
        });
    }
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('studymate_user', JSON.stringify(currentUser));
    
    // Update UI
    updateUserInterface();
    
    // Reset button
    saveBtn.textContent = originalText;
    saveBtn.disabled = false;
    
    // Close modal
    closeProfileModal();
    
    showNotification('Profile updated successfully!', 'success');
}

// Enhanced avatar upload with preview
function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            showNotification('Please select a valid image file.', 'error');
            return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('Image size should be less than 5MB.', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const avatarUrl = e.target.result;
            
            // Update profile avatar preview
            const profileAvatar = document.getElementById('profileAvatar');
            if (profileAvatar) {
                profileAvatar.src = avatarUrl;
            }
            
            // Update all user avatars in real-time
            const userAvatarElements = document.querySelectorAll('.user-avatar, .post-avatar');
            userAvatarElements.forEach(element => {
                element.src = avatarUrl;
            });
            
            // Save to user data
            currentUser.avatar = avatarUrl;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            localStorage.setItem('studymate_user', JSON.stringify(currentUser));
            
            // Update UI
            updateUserInterface();
            
            showNotification('Avatar updated successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }
}

// Settings Modal Functions
function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        loadSettingsData();
        modal.style.display = 'block';
    }
}

function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function switchSettingsTab(e) {
    const tabName = e.target.dataset.tab;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    const targetTab = document.getElementById(`${tabName}-tab`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
}

function loadSettingsData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || localStorage.getItem('studymate_user') || '{}');
    
    if (window.firebaseDB && currentUser.email) {
        // Load from Firebase database
        window.firebaseDB.getUserSettings(currentUser.email).then(result => {
            if (result.success) {
                const settings = result.settings;
                
                // Load privacy settings
                if (settings.privacy) {
                    const privacyFields = ['profileVisibility', 'showOnlineStatus', 'shareActivity', 'searchVisibility', 'resourceSharing', 'groupInvitations'];
                    privacyFields.forEach(field => {
                        const element = document.getElementById(field);
                        if (element) {
                            if (element.type === 'checkbox') {
                                element.checked = settings.privacy[field] !== false;
                            } else {
                                element.value = settings.privacy[field] || '';
                            }
                        }
                    });
                }
                
                // Load notification settings
                if (settings.notifications) {
                    const notificationFields = ['emailNotifications', 'groupNotifications', 'eventNotifications', 'resourceNotifications', 'partnerNotifications'];
                    notificationFields.forEach(field => {
                        const element = document.getElementById(field);
                        if (element) {
                            element.checked = settings.notifications[field] !== false;
                        }
                    });
                }
                
                // Load accessibility settings
                if (settings.accessibility) {
                    accessibilitySettings = { ...accessibilitySettings, ...settings.accessibility };
                    const accessibilityFields = ['highContrast', 'colorBlindFriendly', 'reduceMotion', 'screenReaderSupport', 'keyboardNavigation'];
                    accessibilityFields.forEach(field => {
                        const element = document.getElementById(field);
                        if (element) {
                            element.checked = accessibilitySettings[field];
                        }
                    });
                    updateFontSizeDisplay();
                    applyAccessibilitySettings();
                }
            }
        });
    } else {
        // Fallback to localStorage
        const privacySettings = JSON.parse(localStorage.getItem('privacySettings')) || {};
        const notificationSettings = JSON.parse(localStorage.getItem('notificationSettings')) || {};
        
        // Load privacy settings
        const privacyFields = ['profileVisibility', 'showOnlineStatus', 'shareActivity', 'searchVisibility', 'resourceSharing', 'groupInvitations'];
        privacyFields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = privacySettings[field] !== false;
                } else {
                    element.value = privacySettings[field] || '';
                }
            }
        });
        
        // Load notification settings
        const notificationFields = ['emailNotifications', 'groupNotifications', 'eventNotifications', 'resourceNotifications', 'partnerNotifications'];
        notificationFields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                element.checked = notificationSettings[field] !== false;
            }
        });
    }
}

function handleAccountUpdate(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword')?.value;
    const newPassword = document.getElementById('newPassword')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    const newEmail = document.getElementById('newEmail')?.value.trim();
    
    // Validate current password (simplified - in real app, verify with backend)
    if (!currentPassword) {
        showNotification('Please enter your current password.', 'error');
        return;
    }
    
    // Validate new password if provided
    if (newPassword) {
        if (newPassword.length < 8) {
            showNotification('New password must be at least 8 characters long.', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showNotification('New passwords do not match.', 'error');
            return;
        }
        
        // Password strength validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
        if (!passwordRegex.test(newPassword)) {
            showNotification('Password must include uppercase, lowercase, number, and special character.', 'error');
            return;
        }
    }
    
    // Update user data
    if (newEmail) {
        currentUser.email = newEmail;
    }
    
    // Save updated user data
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('studymate_user', JSON.stringify(currentUser));
    
    // Clear form
    e.target.reset();
    
    showNotification('Account updated successfully!', 'success');
}

function savePrivacySettings() {
    const privacySettings = {
        profileVisibility: document.getElementById('profileVisibility')?.value || 'public',
        showOnlineStatus: document.getElementById('showOnlineStatus')?.checked || false,
        shareActivity: document.getElementById('shareActivity')?.checked || false,
        searchVisibility: document.getElementById('searchVisibility')?.checked || false,
        resourceSharing: document.getElementById('resourceSharing')?.checked || false,
        groupInvitations: document.getElementById('groupInvitations')?.checked || false
    };
    
    // Save to Firebase database
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || localStorage.getItem('studymate_user') || '{}');
    if (window.firebaseDB && currentUser.email) {
        window.firebaseDB.saveUserSettings(currentUser.email, { privacy: privacySettings }).then(result => {
            if (result.success) {
                console.log('Privacy settings saved to Firebase database');
            } else {
                console.error('Failed to save privacy settings:', result.error);
            }
        });
    }
    
    localStorage.setItem('privacySettings', JSON.stringify(privacySettings));
    showNotification('Privacy settings saved!', 'success');
}

function saveNotificationSettings() {
    const notificationSettings = {
        emailNotifications: document.getElementById('emailNotifications')?.checked || false,
        groupNotifications: document.getElementById('groupNotifications')?.checked || false,
        eventNotifications: document.getElementById('eventNotifications')?.checked || false,
        resourceNotifications: document.getElementById('resourceNotifications')?.checked || false,
        partnerNotifications: document.getElementById('partnerNotifications')?.checked || false
    };
    
    // Save to Firebase database
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || localStorage.getItem('studymate_user') || '{}');
    if (window.firebaseDB && currentUser.email) {
        window.firebaseDB.saveUserSettings(currentUser.email, { notifications: notificationSettings }).then(result => {
            if (result.success) {
                console.log('Notification settings saved to Firebase database');
            } else {
                console.error('Failed to save notification settings:', result.error);
            }
        });
    }
    
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
    showNotification('Notification settings saved!', 'success');
}

// Accessibility Functions
function loadAccessibilitySettings() {
    const saved = JSON.parse(localStorage.getItem('accessibilitySettings'));
    if (saved) {
        accessibilitySettings = { ...accessibilitySettings, ...saved };
    }
    
    // Update UI
    updateFontSizeDisplay();
}

function applyAccessibilitySettings() {
    const body = document.body;
    
    // Remove existing classes
    body.classList.remove(
        'accessibility-high-contrast',
        'accessibility-colorblind',
        'accessibility-reduce-motion',
        'accessibility-keyboard-nav',
        'font-size-small',
        'font-size-medium',
        'font-size-large',
        'font-size-xlarge',
        'font-size-xxlarge'
    );
    
    // Apply current settings
    if (accessibilitySettings.highContrast) {
        body.classList.add('accessibility-high-contrast');
    }
    
    if (accessibilitySettings.colorBlindFriendly) {
        body.classList.add('accessibility-colorblind');
    }
    
    if (accessibilitySettings.reduceMotion) {
        body.classList.add('accessibility-reduce-motion');
    }
    
    if (accessibilitySettings.keyboardNavigation) {
        body.classList.add('accessibility-keyboard-nav');
    }
    
    // Apply font size
    body.classList.add(`font-size-${accessibilitySettings.fontSize}`);
}

function updateFontSizeDisplay() {
    const display = document.getElementById('fontSizeDisplay');
    if (display) {
        const sizeLabels = {
            'small': 'Small',
            'medium': 'Medium',
            'large': 'Large',
            'xlarge': 'Extra Large',
            'xxlarge': 'XXL'
        };
        display.textContent = sizeLabels[accessibilitySettings.fontSize] || 'Medium';
    }
}

function decreaseFontSize() {
    const sizes = ['small', 'medium', 'large', 'xlarge', 'xxlarge'];
    const currentIndex = sizes.indexOf(accessibilitySettings.fontSize);
    if (currentIndex > 0) {
        accessibilitySettings.fontSize = sizes[currentIndex - 1];
        updateFontSizeDisplay();
        applyAccessibilitySettings();
    }
}

function increaseFontSize() {
    const sizes = ['small', 'medium', 'large', 'xlarge', 'xxlarge'];
    const currentIndex = sizes.indexOf(accessibilitySettings.fontSize);
    if (currentIndex < sizes.length - 1) {
        accessibilitySettings.fontSize = sizes[currentIndex + 1];
        updateFontSizeDisplay();
        applyAccessibilitySettings();
    }
}

function saveAccessibilitySettings() {
    // Get current settings from form
    accessibilitySettings.highContrast = document.getElementById('highContrast')?.checked || false;
    accessibilitySettings.colorBlindFriendly = document.getElementById('colorBlindFriendly')?.checked || false;
    accessibilitySettings.reduceMotion = document.getElementById('reduceMotion')?.checked || false;
    accessibilitySettings.screenReaderSupport = document.getElementById('screenReaderSupport')?.checked || false;
    accessibilitySettings.keyboardNavigation = document.getElementById('keyboardNavigation')?.checked || false;
    
    // Save to Firebase database
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || localStorage.getItem('studymate_user') || '{}');
    if (window.firebaseDB && currentUser.email) {
        window.firebaseDB.saveUserSettings(currentUser.email, { accessibility: accessibilitySettings }).then(result => {
            if (result.success) {
                console.log('Accessibility settings saved to Firebase database');
            } else {
                console.error('Failed to save accessibility settings:', result.error);
            }
        });
    }
    
    // Save to localStorage
    localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings));
    
    // Apply settings
    applyAccessibilitySettings();
    
    showNotification('Accessibility settings saved!', 'success');
}

function resetAccessibilitySettings() {
    accessibilitySettings = {
        fontSize: 'medium',
        highContrast: false,
        colorBlindFriendly: false,
        reduceMotion: false,
        screenReaderSupport: false,
        keyboardNavigation: false
    };
    
    // Update form
    const accessibilityFields = ['highContrast', 'colorBlindFriendly', 'reduceMotion', 'screenReaderSupport', 'keyboardNavigation'];
    accessibilityFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.checked = false;
        }
    });
    
    updateFontSizeDisplay();
    applyAccessibilitySettings();
    
    localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings));
    showNotification('Accessibility settings reset to default!', 'success');
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS animation for notifications
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyle);

// Initialize Event Handlers
function initializeEventHandlers() {
    // Add any general event handlers here
    console.log('Event handlers initialized');
}

// Initialize Dashboard
function initializeDashboard() {
    // Initialize statistics
    initializeStats();
    
    // Initialize activity feed
    initializeActivityFeed();
    
    // Initialize real-time updates
    initializeRealTimeUpdates();
}

// Initialize Statistics
function initializeStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Animate number counting
function animateNumber(element) {
    const target = parseInt(element.textContent);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateNumber = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target;
        }
    };
    
    updateNumber();
}

// Initialize Activity Feed
function initializeActivityFeed() {
    // Simulate real-time activity updates
    setInterval(() => {
        updateActivityFeed();
    }, 30000); // Update every 30 seconds
}

// Update activity feed with new activities
function updateActivityFeed() {
    const activities = [
        'Joined "Physics Study Group"',
        'Shared "Chemistry Notes.pdf"',
        'Commented on "Biology Lab Report"',
        'Attended "Math Workshop"',
        'Created "Study Schedule"'
    ];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    const activityFeed = document.querySelector('.activity-feed');
    
    if (activityFeed) {
        const newActivity = document.createElement('div');
        newActivity.className = 'activity-item';
        newActivity.innerHTML = `
            <i class="fas fa-plus-circle"></i>
            <span>${randomActivity}</span>
            <small>Just now</small>
        `;
        
        // Add new activity at the top
        activityFeed.insertBefore(newActivity, activityFeed.firstChild);
        
        // Remove old activities if more than 5
        const activityItems = activityFeed.querySelectorAll('.activity-item');
        if (activityItems.length > 5) {
            activityFeed.removeChild(activityItems[activityItems.length - 1]);
        }
        
        // Animate new activity
        newActivity.style.opacity = '0';
        newActivity.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            newActivity.style.transition = 'all 0.3s ease';
            newActivity.style.opacity = '1';
            newActivity.style.transform = 'translateX(0)';
        }, 100);
    }
}

// Initialize Real-time Updates
function initializeRealTimeUpdates() {
    // Simulate real-time data updates
    setInterval(() => {
        updateStats();
        updateEvents();
        updateResources();
    }, 60000); // Update every minute
}

// Update statistics
function updateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const currentValue = parseInt(stat.textContent);
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const newValue = Math.max(0, currentValue + change);
        
        if (change !== 0) {
            stat.textContent = newValue;
            
            // Update change indicator
            const changeElement = stat.nextElementSibling;
            if (changeElement) {
                const isPositive = change > 0;
                changeElement.textContent = `${isPositive ? '+' : ''}${change} this hour`;
                changeElement.className = `stat-change ${isPositive ? 'positive' : 'negative'}`;
            }
        }
    });
}

// Update events
function updateEvents() {
    const eventItems = document.querySelectorAll('.event-item');
    eventItems.forEach(event => {
        const attendeesElement = event.querySelector('.event-meta span:last-child');
        if (attendeesElement) {
            const currentAttendees = parseInt(attendeesElement.textContent.match(/\d+/)[0]);
            const change = Math.floor(Math.random() * 3);
            const newAttendees = currentAttendees + change;
            attendeesElement.innerHTML = `<i class="fas fa-users"></i> ${newAttendees} attending`;
        }
    });
}

// Update resources
function updateResources() {
    const resourceItems = document.querySelectorAll('.resource-item');
    resourceItems.forEach(resource => {
        const downloadsElement = resource.querySelector('.resource-meta span:last-child');
        if (downloadsElement) {
            const currentDownloads = parseInt(downloadsElement.textContent.match(/\d+/)[0]);
            const change = Math.floor(Math.random() * 5);
            const newDownloads = currentDownloads + change;
            downloadsElement.innerHTML = `<i class="fas fa-download"></i> ${newDownloads} downloads`;
        }
    });
}

// Initialize Meet
function initializeMeet() {
    console.log('Meet functionality initialized');
}

// Initialize File Upload
function initializeFileUpload() {
    console.log('File upload functionality initialized');
}

// Initialize User Search
function initializeUserSearch() {
    console.log('User search functionality initialized');
}

// Initialize Mobile Menu
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        // Toggle mobile menu
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Initialize Post System
function initializePostSystem() {
    console.log('Post system initialized');
    
    // Initialize post form
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', handlePostSubmit);
    }
    
    // Initialize image upload
    const postImageInput = document.getElementById('postImageInput');
    if (postImageInput) {
        postImageInput.addEventListener('change', handleImageUpload);
    }
    
    // Initialize file upload
    const postFileInput = document.getElementById('postFileInput');
    if (postFileInput) {
        postFileInput.addEventListener('change', handleFileUpload);
    }
    
    // Load existing posts
    loadPosts();
}

// Handle post submission
function handlePostSubmit(e) {
    e.preventDefault();
    
    const postText = document.getElementById('postText')?.value.trim();
    const postImage = document.getElementById('postImageInput')?.files[0];
    const postFile = document.getElementById('postFileInput')?.files[0];
    
    if (!postText && !postImage && !postFile) {
        showNotification('Please add some content to your post.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.post-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';
    submitBtn.disabled = true;
    
    // Create post object
    const post = {
        id: Date.now().toString(),
        text: postText,
        author: currentUser.firstName + ' ' + currentUser.lastName,
        authorEmail: currentUser.email,
        authorAvatar: currentUser.avatar,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
        image: null,
        file: null
    };
    
    // Handle image upload
    if (postImage) {
        const reader = new FileReader();
        reader.onload = function(e) {
            post.image = e.target.result;
            createPost(post);
        };
        reader.readAsDataURL(postImage);
    } else if (postFile) {
        // Handle file upload
        const reader = new FileReader();
        reader.onload = function(e) {
            post.file = {
                name: postFile.name,
                type: postFile.type,
                size: postFile.size,
                data: e.target.result
            };
            createPost(post);
        };
        reader.readAsDataURL(postFile);
    } else {
        createPost(post);
    }
}

// Create and display post
function createPost(post) {
    // Save to Firebase if available
    if (window.firebaseDB) {
        window.firebaseDB.createPost(post).then(result => {
            if (result.success) {
                console.log('Post saved to Firebase');
            } else {
                console.error('Failed to save post:', result.error);
            }
        });
    }
    
    // Save to localStorage
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.unshift(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    
    // Display post
    displayPost(post);
    
    // Reset form
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.reset();
    }
    
    // Reset button
    const submitBtn = document.querySelector('.post-submit-btn');
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    showNotification('Post created successfully!', 'success');
}

// Display a single post
function displayPost(post) {
    const feed = document.getElementById('feed');
    if (!feed) return;
    
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.dataset.postId = post.id;
    
    postElement.innerHTML = `
        <div class="post-header">
            <img src="${post.authorAvatar || 'https://via.placeholder.com/40'}" alt="Avatar" class="post-avatar">
            <div class="post-info">
                <h4 class="post-author">${post.author}</h4>
                <span class="post-time">${formatTime(post.timestamp)}</span>
            </div>
        </div>
        <div class="post-content">
            ${post.text ? `<p class="post-text">${post.text}</p>` : ''}
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image" onclick="openImageModal('${post.image}')">` : ''}
            ${post.file ? `
                <div class="post-file">
                    <i class="fas fa-file"></i>
                    <span>${post.file.name}</span>
                    <button onclick="downloadFile('${post.file.name}', '${post.file.data}')" class="btn btn-sm btn-primary">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            ` : ''}
        </div>
        <div class="post-actions">
            <button class="post-action-btn" onclick="likePost('${post.id}')">
                <i class="fas fa-heart"></i> ${post.likes}
            </button>
            <button class="post-action-btn" onclick="showComments('${post.id}')">
                <i class="fas fa-comment"></i> ${post.comments.length}
            </button>
            <button class="post-action-btn" onclick="sharePost('${post.id}')">
                <i class="fas fa-share"></i> Share
            </button>
        </div>
    `;
    
    // Add to feed
    feed.insertBefore(postElement, feed.firstChild);
}

// Load existing posts
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const feed = document.getElementById('feed');
    if (!feed) return;
    
    feed.innerHTML = '';
    posts.forEach(post => displayPost(post));
}

// Handle image upload for posts
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            showNotification('Please select a valid image file.', 'error');
            return;
        }
        
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            showNotification('Image size should be less than 10MB.', 'error');
            return;
        }
        
        // Show preview
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreview = document.createElement('div');
            imagePreview.className = 'image-preview';
            imagePreview.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button onclick="this.parentElement.remove()" class="remove-image">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            const postActions = document.querySelector('.post-actions');
            if (postActions) {
                postActions.parentElement.insertBefore(imagePreview, postActions);
            }
        };
        reader.readAsDataURL(file);
    }
}

// Handle file upload for posts
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Validate file size (max 50MB)
        if (file.size > 50 * 1024 * 1024) {
            showNotification('File size should be less than 50MB.', 'error');
            return;
        }
        
        // Show preview
        const filePreview = document.createElement('div');
        filePreview.className = 'file-preview';
        filePreview.innerHTML = `
            <i class="fas fa-file"></i>
            <span>${file.name}</span>
            <button onclick="this.parentElement.remove()" class="remove-file">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        const postActions = document.querySelector('.post-actions');
        if (postActions) {
            postActions.parentElement.insertBefore(filePreview, postActions);
        }
    }
}

// Utility functions for posts
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString();
}

function likePost(postId) {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        localStorage.setItem('posts', JSON.stringify(posts));
        
        // Update UI
        const likeBtn = document.querySelector(`[data-post-id="${postId}"] .post-action-btn`);
        if (likeBtn) {
            likeBtn.innerHTML = `<i class="fas fa-heart"></i> ${post.likes}`;
        }
    }
}

function showComments(postId) {
    // Implement comments functionality
    showNotification('Comments feature coming soon!', 'info');
}

function sharePost(postId) {
    // Implement share functionality
    if (navigator.share) {
        navigator.share({
            title: 'Check out this post on Studymate',
            text: 'I found this interesting post on Studymate',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        showNotification('Link copied to clipboard!', 'success');
    }
}

function openImageModal(imageSrc) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <img src="${imageSrc}" alt="Full size image">
        </div>
    `;
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function downloadFile(filename, data) {
    const link = document.createElement('a');
    link.href = data;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function addEmoji() {
    const emojis = ['😊', '👍', '🎉', '📚', '💡', '🔥', '⭐', '❤️', '😄', '🤔'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const postText = document.getElementById('postText');
    if (postText) {
        postText.value += emoji;
    }
}

// Initialize Calendar
function initializeCalendar() {
    console.log('Calendar system initialized');
}

// Initialize Mobile Enhancements
function initializeMobileEnhancements() {
    console.log('Mobile enhancements initialized');
}

// Initialize Network Monitoring
function initializeNetworkMonitoring() {
    const networkStatus = document.getElementById('networkStatus');
    const networkStatusText = document.getElementById('networkStatusText');
    
    if (networkStatus && networkStatusText) {
        function updateNetworkStatus(isOnline) {
            if (isOnline) {
                networkStatus.className = 'network-status online';
                networkStatusText.textContent = 'Connected';
                networkStatus.querySelector('i').className = 'fas fa-wifi';
                setTimeout(() => {
                    networkStatus.classList.remove('show');
                }, 2000);
            } else {
                networkStatus.className = 'network-status';
                networkStatusText.textContent = 'No internet connection';
                networkStatus.querySelector('i').className = 'fas fa-exclamation-triangle';
                networkStatus.classList.add('show');
            }
        }
        
        // Check initial network status
        updateNetworkStatus(navigator.onLine);
        
        // Listen for network changes
        window.addEventListener('online', () => updateNetworkStatus(true));
        window.addEventListener('offline', () => updateNetworkStatus(false));
    }
}

// Authentication check
function checkAuth() {
    const storedUser = JSON.parse(localStorage.getItem('studymate_user') || sessionStorage.getItem('studymate_user') || 'null');
    const goLogin = () => { window.location.href = 'login.html'; };

    // If Firebase is present, use it as source of truth
    try {
        if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0) {
            firebase.auth().onAuthStateChanged((fbUser) => {
                if (fbUser) {
                    updateUserInfo({ name: fbUser.displayName || fbUser.email, email: fbUser.email });
                } else if (storedUser) {
                    updateUserInfo(storedUser);
                } else {
                    goLogin();
                }
            });
            return;
        }
    } catch (_) {}

    if (!storedUser) {
        goLogin();
        return;
    }
    updateUserInfo(storedUser);
}

// Update user information in the UI
function updateUserInfo(user) {
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(element => {
        element.textContent = user.name || 'User';
    });
    
    const dashboardHeader = document.querySelector('.dashboard-header h1');
    if (dashboardHeader) {
        dashboardHeader.textContent = `Welcome back, ${user.name || 'User'}!`;
    }
}