# CMS Admin

Admin panel for managing products in the Escoramento platform.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Axios
- TypeScript

## Features

- Login and auth session handling
- Product list with create, edit, and delete actions
- Image upload support through backend API
- Role-based permissions (admin/editor/manager)
- Switch user panel for quick role testing

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - run eslint

## Notes

- Material UI has been removed from this app.
- UI is now built with Tailwind utility classes.
- `next.config.ts` sets `turbopack.root` for monorepo root detection.
