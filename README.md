# 🌎 NostalgiaMap

**NostalgiaMap** is an application that allows users to add their memories from different corners of the world and share them with others. Thanks to an interactive map, you can explore other people's stories from specific places – it's like traveling through emotions, time, and experiences.

---

## ✨ Features

- **User Registration & Authentication**
  Users can register with email verification and log in securely using JWT tokens.
- **Memory Management**
  Users can create, edit, and delete personal memories, including attaching photos and location data.
- **Social Interactions**
  Users can like memories and interact with others’ posts.
- **Filtering & Sorting**
  Memories can be filtered by categories and sorted by date or popularity.

---

## 🧭 Wireframe

---

## 📡 API

| Endpoint                                    | Method | Description                 |
|---------------------------------------------|--------|-----------------------------|
| `/auth/register`                            | POST   | Register a new user         |
| `/auth/verify-code`                         | POST   | Verify authentication code  |
| `/auth/login`                               | POST   | User login                  |
| `/memories/create`                          | POST   | Create a new memory entry   |
| `/memories/:id`                             | PATCH  | Update an existing memory   |
| `/memories/:id`                             | DELETE | Delete a memory             |
| `/memories`                                 | GET    | Retrieve all memories       |
| `/memories/:id`                             | GET    | Retrieve a specific memory  |
| `/memories/:id/like`                        | POST   | Like a memory               |
| `/memories/:id/like`                        | DELETE | Remove a like from a memory |
| `/memories/liked`                           | GET    | Retrieve all liked memories |
| `/memories/filter?categoryId=:id&sort=name` | GET    | Filter and sort memories    |
| `/users/:id/memories`                       | GET    | Retrieve memories of a user |
| `/users/:id`                                | GET    | Get user details            |
| `/users/:id`                                | PATCH  | Update user details         |
| `/users/:id`                                | DELETE | Delete a user               |
| `/categories`                               | GET    | Get list of categories      |

---

## 🛠️ Technologies used

| Category          | Tool        | Purpose                                                |
|-------------------|-------------|--------------------------------------------------------|
| Frontend          | Next        | Framework for building client side                     |
| Frontend          | Shadcn/ui   | Component library                                      |
| Frontend          | Leaflet     | Interactive maps library                               |
| Frontend          | Axios       | HTTP client                                            |
| Frontend          | dayjs       | Minimalist library for dates and times                 |
| Frontend          | Sonner      | Toast component                                        |
| Frontend          | TailwindCSS | CSS framework                                          |
| Frontend          | Heroicons   | Hand-crafted SVG icons                                 |
| Backend           | NestJS      | Framework for building API                             |
| Backend           | Typescript  | Typed JavaScript                                       |
| Backend           | JWT         | Authentication with JSON Web Tokens                    |
| Backend           | TypeORM     | ORM for database access                                |
| Backend           | Nodemailer  | Email sending                                          |
| Backend           | Pug         | Template engine                                        |
| Database          | PostgreSQL  | Relational database                                    |
| DevOps            | Docker      | Containerization                                       |
| Development Tools | Typescript  | Typed superset of JavaScript for better dev experience |
| Development Tools | Eslint      | Linter for maintaining code quality                    |
| Development Tools | Prettier    | Code formatter                                         |
| Development Tools | Jest        | Testing framework                                      |

---

## 🚀 How to run

### Server Setup

1. **Clone the repository**
```
# via SSH
git clone git@github.com:kamil-klawi/nostalgia-map.git

# or via HTTPS
git clone https://github.com/kamil-klawi/nostalgia-map.git

cd nostalgia-map
```
2. **Install dependencies**
```
pnpm install
```
3. **Configure environments variables**
Create a .env file in the root directory with the necessary variables. Example:
```
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database
```
4. **Build and run the container**
```
docker compose --env-file .env.development up
```
5. **Access the application**
The backend server will be available at: http://localhost:3000