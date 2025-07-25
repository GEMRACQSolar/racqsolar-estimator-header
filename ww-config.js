export default {
  // Editor configuration
  editor: {
    label: {
      en: "RACQ Header"
    },
    icon: "navbar",
    customStylePropertiesOrder: [],
    customSettingsPropertiesOrder: ["userName", "userEmail", "showClearButton"]
  },
  
  // Properties that can be edited in WeWeb's interface
  properties: {
    userName: {
      label: {
        en: "User Name"
      },
      type: "Text",
      defaultValue: "John Doe",
      bindable: true
    },
    userEmail: {
      label: {
        en: "User Email"
      },
      type: "Text",
      defaultValue: "john.doe@example.com",
      bindable: true
    },
    showClearButton: {
      label: {
        en: "Show Clear Button"
      },
      type: "OnOff",
      defaultValue: true,
      bindable: true
    }
  },
  
  // Event configuration for WeWeb workflows
  triggerEvents: [
    {
      name: "clear:estimator",
      label: { en: "On Clear Estimator" },
      event: {
        timestamp: "",
        userName: ""
      },
      default: true
    },
    {
      name: "navigate:profile",
      label: { en: "On Navigate to Profile" },
      event: {
        timestamp: "",
        userName: "",
        userEmail: ""
      }
    },
    {
      name: "user:logout",
      label: { en: "On User Logout" },
      event: {
        timestamp: "",
        userName: ""
      }
    },
    {
      name: "toggle:help",
      label: { en: "On Toggle Help" },
      event: {
        timestamp: ""
      },
      default: true
    }
  ]
}