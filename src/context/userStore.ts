import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import auth from "../firebase/config";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user: User | null) => set({ user }),
  setLoading: (loading: boolean) => set({ loading }),
}));

// Initialize Firebase Auth state listener
onAuthStateChanged(auth, (currentUser) => {
  const { setUser, setLoading } = useAuthStore.getState();
  setUser(currentUser);
  setLoading(false); // Set loading to false once user state is determined
});

export default useAuthStore;
