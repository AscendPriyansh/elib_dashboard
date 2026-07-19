import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface TokenStore {
    token: string,
    user: { name: string, email: string } | null;
    setToken: (data: string) => void;
    setUser: (data: {name: string; email: string}) => void;
}

const useTokenStore = create<TokenStore>()(
    devtools(
        persist(
            (set) => ({
                token: '',
                user: null,
                setToken: (data: string) => set(() => ({ token: data })),
                setUser: (data: {name: string; email: string}) => set(() => ({ user: data })),
            }),
            { name: 'token-store' }
        )
    )
);

export default useTokenStore;