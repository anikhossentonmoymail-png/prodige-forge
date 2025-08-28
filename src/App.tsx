import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import UseCases from "./pages/UseCases";
import Solutions from "./pages/Solutions";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="udx3-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Dashboard route without header/footer */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Auth routes without header/footer */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Main routes with header/footer */}
            <Route path="/" element={
              <>
                <Header />
                <main className="flex-1">
                  <Index />
                </main>
                <Footer />
              </>
            } />
            <Route path="/use-cases" element={
              <>
                <Header />
                <main className="flex-1">
                  <UseCases />
                </main>
                <Footer />
              </>
            } />
            <Route path="/solutions" element={
              <>
                <Header />
                <main className="flex-1">
                  <Solutions />
                </main>
                <Footer />
              </>
            } />
            <Route path="/pricing" element={
              <>
                <Header />
                <main className="flex-1">
                  <Pricing />
                </main>
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Header />
                <main className="flex-1">
                  <Contact />
                </main>
                <Footer />
              </>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
