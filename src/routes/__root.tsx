import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sangamithra D — Frontend Engineer · React + TypeScript" },
      { name: "description", content: "Frontend engineer building scalable React + TypeScript apps, enterprise dashboards, UX-led frontend, and AI integrations." },
      { name: "author", content: "Sangamithra D" },
      { property: "og:title", content: "Sangamithra D — Frontend Engineer · React + TypeScript" },
      { property: "og:description", content: "Scalable React + TypeScript apps, enterprise dashboards, UX-led frontend, and AI integrations." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sangamithra D — Frontend Engineer · React + TypeScript" },
      { name: "twitter:description", content: "Scalable React + TypeScript apps, enterprise dashboards, UX-led frontend, and AI integrations." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/38a7b1ef-70b1-41de-b1a7-b3aef090eede/id-preview-73d6c02c--3a8ae5a5-8d16-487d-84e5-3e4dba1d84bd.lovable.app-1776675215554.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/38a7b1ef-70b1-41de-b1a7-b3aef090eede/id-preview-73d6c02c--3a8ae5a5-8d16-487d-84e5-3e4dba1d84bd.lovable.app-1776675215554.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
