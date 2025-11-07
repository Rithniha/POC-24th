import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatbot from "@/components/Chatbot";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardLayout from "./components/layout/DashboardLayout";
import StudentDashboard from "./pages/StudentDashboard";
import DisastersPage from "./pages/DisastersPage";
import LearningModules from "./pages/LearningModules";
import VirtualDrills from "./pages/VirtualDrills";
import ProgressTracker from "./pages/ProgressTracker";
import EmergencyContacts from "./pages/EmergencyContacts";
import EarthquakeModule from "./pages/EarthquakeModule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Chatbot />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<StudentDashboard />} />
          </Route>
          <Route path="/disasters" element={<DashboardLayout />}>
            <Route index element={<DisastersPage />} />
          </Route>
          <Route path="/modules" element={<DashboardLayout />}>
            <Route index element={<LearningModules />} />
          </Route>
          <Route path="/drills" element={<DashboardLayout />}>
            <Route index element={<VirtualDrills />} />
          </Route>
          <Route path="/progress" element={<DashboardLayout />}>
            <Route index element={<ProgressTracker />} />
          </Route>
          <Route path="/contacts" element={<DashboardLayout />}>
            <Route index element={<EmergencyContacts />} />
          </Route>
          <Route path="/disasters/earthquake" element={<DashboardLayout />}>
            <Route index element={<EarthquakeModule />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
