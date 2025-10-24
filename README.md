# Food Construct Website

## Description
This repository contains the source code for the third laboratory work in the Web Technologies discipline. The project is a responsive website for a food delivery service called "Food Construct".

## Project Overview
The website showcases a modern, responsive design for a business lunch delivery service. It consists of two main pages:

### 1. Main Page (About Us)
- Header with navigation menu and **burger menu for mobile devices**
- About Us section with company description
- Advantages section highlighting service benefits
- Top 5 Popular Dishes section with an interactive table
- Footer with contact information

### 2. Order Page (Lunch Constructor)
- Interactive lunch builder with **six categories**:
  - Soups (Gazpacho, Mushroom Cream Soup, Norwegian Soup)
  - Main Courses (Fried Potatoes with Mushrooms, Lasagna, Chicken Cutlets with Mashed Potatoes)
  - Salads (Caesar Salad, Greek Salad, Caprese Salad)
  - Starters (Bruschetta, Spring Rolls, Cheese Platter)
  - Drinks (Orange Juice, Apple Juice, Carrot Juice)
  - Desserts (Tiramisu, Cheesecake, Chocolate Cake)
- **Dish filtering by category** with interactive filter buttons
- Responsive card-based layout that adapts to different screen sizes
- Hover effects and smooth animations
- Modern white-gray color scheme with orange accents
- **Toast notifications** for user actions (dish added, form submitted, errors)

### 3. Multi-step Order Form
- **3-step ordering process**:
  1. **Meal Selection** - Choose soup, main course, drink, and add comments
  2. **Personal Data** - Enter name, email, phone number, and marketing preferences
  3. **Delivery Details** - Specify address, delivery time options, and special instructions
- **Real-time form validation** with visual feedback
- **Phone number formatting** (8-XXX-XXX-XX-XX) with automatic input masking
- **Dynamic form elements** - Time selection appears only when scheduled delivery is chosen
- **Google Sheets integration** - All orders are automatically saved to Google Spreadsheet
- **Form reset functionality** with one-click clearing of all data
- **Toast notifications** for successful submissions and error handling
- **Dynamic Meal Selection Interactions**, including:
  - **Sorting dishes alphabetically** by name before display
  - **Dynamic creation and insertion of dish cards** on the page from a JavaScript array, instead of hardcoded HTML cards
  - **Click "Add" button on cards** to select the dish in the corresponding `<select>` in the order form
  - **Real-time update of total order cost**, displayed below the comments field, fixed with a sticky position so it remains visible during form scrolling
  - Seamless synchronization between card clicks and form `<select>` values for a smooth user experience

## Features
- **Responsive Design**: Adapts to desktop, tablet, and mobile screens (320px, 480px, 768px breakpoints)
- **Burger Menu**: Collapsible navigation for mobile devices with smooth animations
- **Modern UI**: Clean, card-based design with subtle shadows and animations
- **Interactive Elements**: Hover effects on buttons and cards
- **Category Filtering**: Filter dishes by category with active state indication
- **Toast Notifications**: Non-intrusive popup messages for user feedback
- **Cross-browser Compatibility**: Works on all modern browsers
- **Accessible Navigation**: Active page highlighting in the menu
- **Google Sheets Integration**: Automatic data saving to cloud spreadsheet
- **Form Validation**: Client-side validation with error highlighting
- **Smooth Transitions**: Animated transitions between form steps

## Google Sheets Integration
The order form is connected to Google Sheets using Google Apps Script:
- Orders are automatically saved in real-time
- Data includes: timestamp, meal choices, customer details, delivery information
- Secure server-side processing
- Error handling for failed submissions with toast notifications
- Data structure: Date, Soup, Main Course, Drink, Comments, Name, Email, Phone, Marketing, Address, Delivery Time

## Technologies Used
- **HTML5** - Semantic markup and structure
- **CSS3** - Styling, flexbox, grid, and responsive design
- **JavaScript** - Form handling, validation, dynamic dish display, selection logic, category filtering, toast notifications, burger menu functionality, and Google Sheets integration
- **Google Apps Script** - Backend for data processing and spreadsheet management
- **Media Queries** - Responsive breakpoints for mobile devices
- **Git** - Version control
- **Google Fonts** - Montserrat font family
