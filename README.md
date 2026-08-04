# Penbase

A full-stack blogging platform built with React, Redux Toolkit, React Router, and Appwrite. Users can sign up, write posts with a rich text editor, manage their own content, and read posts published by others — all wrapped in a clean, responsive UI.

---
[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://pen-base.vercel.app/)


## Feedback & contributions

Found a bug, have an idea for an upgrade, or want to suggest a feature? Open an issue or a pull request on this repo — all feedback is welcome, especially from anyone using this as a learning reference.

---

## What makes this different from a typical CRUD/tutorial project

Most beginner blog clones stop at "create a post, show a list." This project goes further in a few deliberate ways:

- **Real ownership-based access control** — it's not enough to be *logged in* to edit or delete a post; the app checks that the logged-in user is the actual author (`post.user_id === userData.$id`) before showing Edit/Delete controls or allowing access to the Edit route at all. A logged-in user cannot edit someone else's post, even by typing the URL directly.

- **Two distinct feeds with different scopes** — `Home` is a public feed showing every published post from every user (no login required). `All Posts` is a private dashboard showing only the logged-in user's own posts, regardless of published/draft status, so a user can always find and manage their own drafts.

- **Publish/draft workflow** — posts have a `status` of `active` or `inactive`. Only `active` posts appear on the public `Home` feed. A user's own `All Posts` page shows both, so setting a post to `inactive` never locks it out of view for its owner.

- **Session persistence across refresh, without relying on browser storage** — Redux state lives in memory and is wiped on every reload. Instead of losing the logged-in state on refresh, the app calls Appwrite's `account.get()` once on mount to re-hydrate Redux from the real session, with a loading state shown while that check resolves.

- **Auth-aware route protection in both directions** — a shared `AuthLayout` wrapper handles two opposite rules with one component: pages like `Add Post` require the user to be logged in (redirect to `/login` if not), while `Login`/`Signup` require the user to be logged out (redirect to `/` if already authenticated) so a signed-in user never sees a stale login form.

- **Rich text content rendered safely** — post content is authored in TinyMCE and stored as HTML. It's rendered with `dangerouslySetInnerHTML` deliberately and knowingly, scoped to content the app's own editor produced, styled with Tailwind's Typography plugin (`prose`) rather than hand-styling every possible HTML tag.

- **Auto-generated, human-readable slugs used as real database IDs** — rather than a random Appwrite-generated ID, each post's slug (derived live from its title as the user types) *is* the document's ID, so post URLs are clean and predictable (`/post/my-first-post`) instead of opaque hashes.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend framework | React (Vite) |
| Routing | React Router v6 (`createBrowserRouter`) |
| State management | Redux Toolkit |
| Forms & validation | React Hook Form |
| Rich text editor | TinyMCE (`@tinymce/tinymce-react`) |
| Styling | Tailwind CSS + `@tailwindcss/typography` |
| Backend / BaaS | Appwrite (Auth, Databases, Storage) |

---

## Project structure

```
src/
  appwrite/
    auth.js         # Appwrite Account service wrapper (signup, login, logout, session)
    config.js        # Appwrite Databases + Storage service wrapper (posts, files)
  components/
    Header/
      Header.jsx
      LogoutBtn.jsx
    Footer/
      Footer.jsx
    PostForm/
      PostForm.jsx
    Button.jsx
    Input.jsx
    Select.jsx
    Logo.jsx
    Container.jsx
    PostCard.jsx
    RTE.jsx
    AuthLayout.jsx
    index.js         # barrel file re-exporting shared components
  pages/
    Home.jsx
    Login.jsx
    Signup.jsx
    AllPosts.jsx
    AddPost.jsx
    EditPost.jsx
    Post.jsx
  store/
    store.js
    authSlice.js
  conf/
    conf.js           # reads Appwrite env vars
  router.js
  App.jsx
  main.jsx
```

---

## Setup instructions

### 1. Prerequisites

- Node.js (v18+ recommended)
- npm
- An [Appwrite](https://appwrite.io) account/project (Appwrite Cloud or self-hosted)
- A [TinyMCE](https://www.tiny.cloud/) API key (free tier is fine)

### 2. Clone and install

```bash
git clone <your-repo-url>
cd penbase
npm install
```

### 3. Set up Appwrite

In your Appwrite console:

1. **Create a project.** Note the **Project ID** and your **API Endpoint**.
2. **Create a Database**, and inside it, **create a Collection** for posts with these attributes:
   - `title` — string
   - `content` — string (large size, for HTML content)
   - `featured_img` — string
   - `status` — string (`active` / `inactive`)
   - `user_id` — string
3. **Set Collection permissions** so that:
   - Any/authenticated users can **Read** documents (needed for the public feed)
   - Authenticated users can **Create** documents
   - Consider document-level permissions so only the creator can **Update**/**Delete** their own document (the app also enforces this on the client, but Appwrite-side permissions are the real security boundary)
4. **Create a Storage Bucket** for post images. Note the **Bucket ID**.
5. **Enable Email/Password authentication** under Auth settings.

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_APPWRITE_URL=https://your-appwrite-endpoint/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

Make sure `conf/conf.js` reads these via `import.meta.env.VITE_...` and exports them as a single config object.

### 5. Install the Tailwind Typography plugin (if not already present)

```bash
npm install -D @tailwindcss/typography
```

Add it to your Tailwind config's `plugins` array (or via the equivalent `@plugin` directive if using Tailwind v4's CSS-first config).

### 6. Run the dev server

```bash
npm run dev
```

Visit the printed local URL (typically `http://localhost:5173`).

### 7. Try it out

1. Sign up for a new account.
2. Create a post (title, content, featured image, status).
3. View it on the **Home** feed if `active`, and on **All Posts** regardless of status.
4. Edit or delete it — note that these controls only appear for the post's actual author.
5. Log out and confirm the public post is still readable, but Edit/Delete are gone and protected routes redirect to Login.

---

## Known follow-ups / not yet implemented

- Author name display on posts (deliberately deferred — would require either denormalizing the author's name onto each post at creation time, or a backend function with elevated permissions to look up another user's account info safely)
- Visual distinction between `active` and `inactive` posts on the "My Posts" dashboard (e.g. a "Draft" badge)
- Pagination for the post feeds
