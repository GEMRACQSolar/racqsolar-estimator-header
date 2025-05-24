# RACQ Solar Estimator Header Component

A custom WeWeb component providing a header for the RACQ Solar Internal Estimator application.

## Features

- User avatar with initials
- User dropdown menu (Profile, Logout)
- Clear Estimator button
- Responsive design
- Dark theme with RACQ branding
- Event emissions for WeWeb workflow integration

## WeWeb Integration

This component emits the following events:
- `clear:estimator` - When Clear Estimator is clicked
- `navigate:profile` - When Profile is clicked
- `user:logout` - When Logout is clicked

## Configuration

Configurable properties:
- `userName` - Display name for the user
- `userEmail` - Email address for the user
- `showClearButton` - Toggle visibility of Clear Estimator button