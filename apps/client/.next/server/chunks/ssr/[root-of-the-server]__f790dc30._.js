module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/apps/client/src/lib/apollo-client.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "apolloClient": ()=>apolloClient
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$core$2f$ApolloClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@apollo/client/core/ApolloClient.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$cache$2f$inmemory$2f$inMemoryCache$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@apollo/client/cache/inmemory/inMemoryCache.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$link$2f$http$2f$createHttpLink$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@apollo/client/link/http/createHttpLink.js [app-ssr] (ecmascript)");
;
const httpLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$link$2f$http$2f$createHttpLink$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHttpLink"])({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql/public',
    credentials: 'include'
});
const apolloClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$core$2f$ApolloClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ApolloClient"]({
    link: httpLink,
    cache: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$cache$2f$inmemory$2f$inMemoryCache$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InMemoryCache"](),
    defaultOptions: {
        watchQuery: {
            errorPolicy: 'all'
        },
        query: {
            errorPolicy: 'all'
        }
    }
});
}),
"[project]/apps/client/src/components/providers/apollo-wrapper.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ApolloWrapper": ()=>ApolloWrapper
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$context$2f$ApolloProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@apollo/client/react/context/ApolloProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$apollo$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/client/src/lib/apollo-client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function ApolloWrapper({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$context$2f$ApolloProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApolloProvider"], {
        client: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$apollo$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apolloClient"],
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/client/src/components/providers/apollo-wrapper.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/client/src/lib/api/auth.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// Authentication API
__turbopack_context__.s({
    "authApi": ()=>authApi,
    "authUtils": ()=>authUtils
});
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:4000/api") || 'http://localhost:4000/api';
// Helper function for API requests
async function authRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultHeaders = {
        'Content-Type': 'application/json'
    };
    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers
        }
    };
    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Auth API request failed:', error);
        throw error;
    }
}
const authApi = {
    // Login user
    async login (credentials) {
        return authRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    },
    // Register user
    async register (userData) {
        return authRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },
    // Logout user
    async logout () {
        const token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        const result = await authRequest('/auth/logout', {
            method: 'POST',
            headers: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : {}
        });
        // Clear local storage
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return result;
    },
    // Get current user
    async getCurrentUser () {
        const token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        if ("TURBOPACK compile-time truthy", 1) {
            throw new Error('No auth token found');
        }
        return authRequest('/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    // Refresh token
    async refreshToken () {
        const token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        if ("TURBOPACK compile-time truthy", 1) {
            throw new Error('No auth token found');
        }
        return authRequest('/auth/refresh', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    // Verify token
    async verifyToken (token) {
        return authRequest('/auth/verify', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
};
const authUtils = {
    // Save auth data to localStorage
    saveAuthData (token, user) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    },
    // Get auth data from localStorage
    getAuthData () {
        if ("TURBOPACK compile-time truthy", 1) {
            return {
                token: null,
                user: null
            };
        }
        //TURBOPACK unreachable
        ;
        const token = undefined;
        const userData = undefined;
    },
    // Clear auth data
    clearAuthData () {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    },
    // Check if user is authenticated
    isAuthenticated () {
        const { token } = this.getAuthData();
        return !!token;
    },
    // Check if user has specific role
    hasRole (requiredRole) {
        const { user } = this.getAuthData();
        if (!user) return false;
        const roleHierarchy = {
            'user': 0,
            'editor': 1,
            'admin': 2
        };
        const userLevel = roleHierarchy[user.role] || 0;
        const requiredLevel = roleHierarchy[requiredRole] || 0;
        return userLevel >= requiredLevel;
    }
};
}),
"[project]/apps/client/src/store/auth-store.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useAuth": ()=>useAuth,
    "useAuthActions": ()=>useAuthActions,
    "useAuthGuard": ()=>useAuthGuard,
    "useAuthStore": ()=>useAuthStore
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/client/src/lib/api/auth.ts [app-ssr] (ecmascript)");
;
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["devtools"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        // Initial state
        user: null,
        token: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
        // Actions
        login: async (credentials)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].login(credentials);
                if (response.success && response.token && response.user) {
                    // Save to localStorage
                    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].saveAuthData(response.token, response.user);
                    // Update store
                    set({
                        user: response.user,
                        token: response.token,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null
                    });
                } else {
                    throw new Error(response.message || 'Login failed');
                }
            } catch (error) {
                set({
                    error: error instanceof Error ? error.message : 'Login failed',
                    isLoading: false,
                    isAuthenticated: false
                });
                throw error;
            }
        },
        register: async (userData)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].register(userData);
                if (response.success && response.token && response.user) {
                    // Save to localStorage
                    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].saveAuthData(response.token, response.user);
                    // Update store
                    set({
                        user: response.user,
                        token: response.token,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null
                    });
                } else {
                    throw new Error(response.message || 'Registration failed');
                }
            } catch (error) {
                set({
                    error: error instanceof Error ? error.message : 'Registration failed',
                    isLoading: false,
                    isAuthenticated: false
                });
                throw error;
            }
        },
        logout: async ()=>{
            set({
                isLoading: true
            });
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].logout();
            } catch (error) {
                console.error('Logout API call failed:', error);
            // Continue with logout even if API call fails
            }
            // Clear localStorage
            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].clearAuthData();
            // Reset store
            set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
            });
        },
        getCurrentUser: async ()=>{
            const { token } = get();
            if (!token) {
                set({
                    isAuthenticated: false,
                    user: null
                });
                return;
            }
            set({
                isLoading: true,
                error: null
            });
            try {
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].getCurrentUser();
                set({
                    user,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                console.error('Get current user failed:', error);
                // Token might be invalid, clear auth data
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].clearAuthData();
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error: 'Session expired'
                });
            }
        },
        refreshToken: async ()=>{
            const { token } = get();
            if (!token) {
                return;
            }
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].refreshToken();
                if (response.success && response.token && response.user) {
                    // Save new token
                    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].saveAuthData(response.token, response.user);
                    // Update store
                    set({
                        user: response.user,
                        token: response.token,
                        isAuthenticated: true,
                        error: null
                    });
                }
            } catch (error) {
                console.error('Token refresh failed:', error);
                // Refresh failed, logout user
                get().logout();
            }
        },
        clearError: ()=>set({
                error: null
            }),
        setLoading: (loading)=>set({
                isLoading: loading
            }),
        // Initialize from localStorage
        initialize: ()=>{
            const { token, user } = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].getAuthData();
            if (token && user) {
                set({
                    token,
                    user,
                    isAuthenticated: true
                });
                // Verify token is still valid
                get().getCurrentUser();
            }
        }
    }), {
    name: 'auth-store',
    // Only persist essential data
    partialize: (state)=>({
            token: state.token,
            user: state.user,
            isAuthenticated: state.isAuthenticated
        })
}), {
    name: 'auth-store'
}));
const useAuth = ()=>{
    const store = useAuthStore();
    return {
        user: store.user,
        isAuthenticated: store.isAuthenticated,
        isLoading: store.isLoading,
        error: store.error,
        login: store.login,
        register: store.register,
        logout: store.logout,
        clearError: store.clearError
    };
};
const useAuthActions = ()=>{
    const store = useAuthStore();
    return {
        login: store.login,
        register: store.register,
        logout: store.logout,
        getCurrentUser: store.getCurrentUser,
        refreshToken: store.refreshToken,
        clearError: store.clearError,
        initialize: store.initialize
    };
};
const useAuthGuard = ()=>{
    const { isAuthenticated, user } = useAuth();
    return {
        isAuthenticated,
        isAdmin: user?.role === 'admin',
        isEditor: user?.role === 'editor' || user?.role === 'admin',
        hasRole: (role)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].hasRole(role)
    };
};
}),
"[project]/apps/client/src/components/providers/auth-provider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "AuthProvider": ()=>AuthProvider
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$store$2f$auth$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/client/src/store/auth-store.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function AuthProvider({ children }) {
    const initialize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$store$2f$auth$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])((state)=>state.initialize);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        initialize();
    }, [
        initialize
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__f790dc30._.js.map