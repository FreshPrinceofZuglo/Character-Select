-------------------------------------------------------
Rick and Morty Character Information Panel - README
-------------------------------------------------------

---------------
Features
---------------

Browse all characters to see information about them, such as how they look, their names and their status.

Click any name to see a detailed profile/character page with origin, location, gender and count of episodes in which they appeared.

Search for any character by name.

Paginated through 42 pages of characters, 20 per page.

Shareable URL-s, even with search results.

---------------
How to start
---------------
Prerequisites: Node.js 20 or newer, and npm (comes with Node).

1. Clone the repo:

git clone https://github.com/FreshPrinceofZuglo/Rick-and-Morty-Character-Information-Panel-Character-Select-.git

2. Move into the project folder:

cd Character Select

3. Install npm from the terminal:

npm install

4. Start the dev server:

npm run dev

5. Then open the link that the terminal returns:

http://localhost:5173


---------------
Stack used
---------------

Built in React with typescript, using Vite as the build tool and React Router for client-side routing, with CSS modules for niceties.

Rick & Morty API as data source.

---------------
Project Structure
---------------
--src/App.tsx
--src/pages/Home.tsx
--src/pages/Home.module.css
--src/pages/Character.tsx
--src/pages/Character.module.css
--src/types/character.ts
