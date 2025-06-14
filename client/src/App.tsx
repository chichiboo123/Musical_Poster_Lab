import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PosterStudio from "@/pages/poster-studio";
import NotFound from "@/pages/not-found";

// Get the base path from environment or use default for GitHub Pages
const basePath = import.meta.env.VITE_BASE_PATH || (import.meta.env.PROD ? '/repository-name/' : '/');

function Router() {
  return (
    <WouterRouter base={basePath}>
      <Switch>
        <Route path="/" component={PosterStudio} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
