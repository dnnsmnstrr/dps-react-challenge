# DPS Frontend Coding Challenge

## Overview

This repository contains a very basic web application based on Typescript and React. Main application file is `App.tsx`. Node and npm are required.

## Environment Setup

Ensure you have Node.js (v14.x or later) and npm (v6.x or later) installed.  
To set up and run the application, execute the following commands:

```
npm install
npm run dev
```

The application will then be accessible at http://localhost:3000.

## Project Context

You will be enhancing a new CRM (Customer Relationship Management) software aimed at managing customer data efficiently. Your task is to develop a feature that displays a searchable list of customers.

Refer to the attached mockup image to guide your UI development 👇

![Mockup](images/mockup.png)

## Challenge Tasks

- [x] **Fork this project:** Start by forking this repository
- [x] **UI Implementation:** Implement the user interface according to the provided design mockup.
- [x] **Data Integration:** Utilize the endpoint https://dummyjson.com/users to fetch user data. If no filter is applied all data is displayed.
- [x] **Client-side Filtering:** Implement the following filters:
    - [x] **Name Filter:** An input field that dynamically filters by `firstName` or `lastName` as you type.
    - [x] **City Filter:** A dropdown that lists all cities present in the data. Users can select a city to filter the list accordingly.
    - [x] **Highlight Feature:** A checkbox that when checked, highlights the oldest users within each selected city (use data field `city`)
    - [x] **Optional:** Implement a 1-second debounce on the Name Filter input. This means the application should delay the filter action until 1 second has passed without any further input from the user. This optimization helps reduce the number of processing calls, enhancing performance.
- [ ] **Submission:** After completing the challenge, email us the URL of your GitHub repository.

-   **Further information:**
    -   If there is anything unclear regarding requirements, contact us by replying to our email.
    -   Use small commits, we want to see your progress towards the solution.
    -   Code clean and follow the best practices.

\
Happy coding!

### Notes

- [limit and skip users](https://dummyjson.com/docs/users#users-limit_skip)
- light mode inputs dark background / highlighted row text color
- format birthday
- total count below table
- full name search

### Ideas

- [x] "No Result" Placeholder
- [x] Change dropdown placeholder to "Reset" when filter is active
- [x] Improve layout with card background
- [ ] Loading state
- [ ] Pagination
- [ ] [Sorting](https://dummyjson.com/docs/users#users-sort)
- [ ] Responsive layout
- [x] Deployment - https://dps-react-challenge.vercel.app/