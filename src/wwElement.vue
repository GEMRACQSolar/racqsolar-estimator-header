<template>
  <header class="racq-header">
    <div class="header-container">
      <!-- Left section: Logo and Title -->
      <div class="header-left">
        <svg class="header-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="20" fill="#FFE600"/>
          <path d="M50 10 L50 25 M50 75 L50 90 M10 50 L25 50 M75 50 L90 50 M22 22 L32 32 M68 68 L78 78 M78 22 L68 32 M32 68 L22 78" 
                stroke="#FFE600" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <h1 class="header-title">RACQ Solar Residential Estimator</h1>
      </div>

      <!-- Right section: User actions -->
      <div class="header-right">
        <!-- Clear Estimator button -->
        <button 
          v-if="content.showClearButton"
          class="clear-button"
          @click="handleClearEstimator"
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
          <span class="button-text">Clear Estimator</span>
        </button>

        <!-- Help button -->
        <button 
          class="help-button"
          @click="handleShowHelp"
          type="button"
          title="Help Guide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </button>

        <!-- User menu -->
        <div class="user-menu">
          <button 
            class="user-avatar"
            @click="toggleUserMenu"
            type="button"
            :aria-expanded="showUserMenu"
          >
            <span class="user-initials">{{ userInitials }}</span>
          </button>
          
          <!-- Dropdown menu -->
          <div v-if="showUserMenu" class="user-dropdown" v-click-outside="closeUserMenu">
            <div class="user-info">
              <span class="user-name">{{ userName }}</span>
              <span class="user-email">{{ userEmail }}</span>
            </div>
            <div class="dropdown-divider"></div>
            <button 
              class="dropdown-item"
              @click="handleProfile"
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Profile
            </button>
            <button 
              class="dropdown-item logout"
              @click="handleLogout"
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5-5-5m5 5H9"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'RACQHeaderComponent',
  
  props: {
    content: {
      type: Object,
      default: () => ({
        userName: 'John Doe',
        userEmail: 'john.doe@example.com',
        showClearButton: true
      })
    }
  },
  
  data() {
    return {
      showUserMenu: false
    }
  },
  
  computed: {
    userName() {
      return this.content.userName || 'User'
    },
    
    userEmail() {
      return this.content.userEmail || ''
    },
    
    userInitials() {
      const names = this.userName.split(' ')
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      }
      return this.userName.substring(0, 2).toUpperCase()
    }
  },
  
  methods: {
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    
    closeUserMenu() {
      this.showUserMenu = false
    },
    
    handleClearEstimator() {
      // Emit event for WeWeb workflow
      this.$emit('trigger-event', {
        name: 'clear:estimator',
        payload: {
          timestamp: new Date().toISOString(),
          userName: this.userName
        }
      })
    },
    
    handleShowHelp() {
      // Emit event to show help guide
      this.$emit('trigger-event', {
        name: 'show:help-guide',
        payload: {
          timestamp: new Date().toISOString()
        }
      })
    },
    
    handleProfile() {
      this.showUserMenu = false
      this.$emit('trigger-event', {
        name: 'navigate:profile',
        payload: {
          timestamp: new Date().toISOString(),
          userName: this.userName,
          userEmail: this.userEmail
        }
      })
    },
    
    handleLogout() {
      this.showUserMenu = false
      this.$emit('trigger-event', {
        name: 'user:logout',
        payload: {
          timestamp: new Date().toISOString(),
          userName: this.userName
        }
      })
    }
  },
  
  // Click outside directive
  directives: {
    'click-outside': {
      bind(el, binding) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value()
          }
        }
        document.addEventListener('click', el.clickOutsideEvent)
      },
      unbind(el) {
        document.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  }
}
</script>

<style scoped>
/* Header container */
.racq-header {
  width: 100%;
  background-color: #001f3f;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Left section */
.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 0; /* Allow flex item to shrink */
}

.header-logo {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #FFFFFF;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Right section */
.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

/* Clear button */
.clear-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: #FFFFFF;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Help button */
.help-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.help-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

/* User menu */
.user-menu {
  position: relative;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #FFE600;
  border: 2px solid transparent;
  color: #001f3f;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 0 0 2px rgba(255, 230, 0, 0.3);
}

.user-initials {
  pointer-events: none;
}

/* Dropdown menu */
.user-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 220px;
  background-color: #001f3f;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: dropdownFade 0.2s ease;
}

@keyframes dropdownFade {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-name {
  color: #FFFFFF;
  font-weight: 600;
  font-size: 0.875rem;
}

.user-email {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
}

.dropdown-divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
}

.dropdown-item {
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: #FFFFFF;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-align: left;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.dropdown-item.logout {
  color: #FF6B6B;
}

.dropdown-item.logout:hover {
  background-color: rgba(255, 107, 107, 0.1);
}

/* Responsive design */
@media (max-width: 768px) {
  .header-container {
    padding: 0.75rem 1rem;
  }
  
  .header-title {
    font-size: 1.125rem;
  }
  
  .header-logo {
    width: 32px;
    height: 32px;
  }
  
  .header-left {
    gap: 0.75rem;
  }
}

@media (max-width: 640px) {
  .header-title {
    font-size: 1rem;
  }
  
  .clear-button {
    padding: 0.5rem 0.75rem;
  }
  
  .button-text {
    display: none;
  }
  
  .help-button {
    width: 36px;
    height: 36px;
  }
  
  .user-avatar {
    width: 36px;
    height: 36px;
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0.625rem 0.75rem;
  }
  
  .header-title {
    font-size: 0.875rem;
    /* Keep the title visible but smaller */
  }
  
  .header-logo {
    width: 28px;
    height: 28px;
  }
  
  .header-left {
    gap: 0.5rem;
  }
  
  .header-right {
    gap: 0.5rem;
  }
  
  .clear-button {
    padding: 0.375rem 0.5rem;
  }
  
  .help-button {
    width: 32px;
    height: 32px;
  }
  
  .user-avatar {
    width: 32px;
    height: 32px;
  }
}

/* Very small screens - use flexible text sizing */
@media (max-width: 380px) {
  .header-title {
    font-size: 0.75rem;
    letter-spacing: -0.5px;
  }
  
  .header-container {
    padding: 0.5rem;
  }
}
</style>