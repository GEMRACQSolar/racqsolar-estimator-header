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
  events: [
    {
      name: "clear:estimator",
      label: "On Clear Estimator",
      eventSchema: {
        timestamp: { type: "string", label: "Timestamp" },
        userName: { type: "string", label: "User Name" }
      }
    },
    {
      name: "navigate:profile",
      label: "On Navigate to Profile",
      eventSchema: {
        timestamp: { type: "string", label: "Timestamp" },
        userName: { type: "string", label: "User Name" },
        userEmail: { type: "string", label: "User Email" }
      }
    },
    {
      name: "user:logout",
      label: "On User Logout",
      eventSchema: {
        timestamp: { type: "string", label: "Timestamp" },
        userName: { type: "string", label: "User Name" }
      }
    }
  ]
}