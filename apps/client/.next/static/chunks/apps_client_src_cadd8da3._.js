(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/apps/client/src/lib/apollo-client.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "apolloClient": ()=>apolloClient
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$core$2f$ApolloClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@apollo/client/core/ApolloClient.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$cache$2f$inmemory$2f$inMemoryCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@apollo/client/cache/inmemory/inMemoryCache.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$link$2f$http$2f$createHttpLink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@apollo/client/link/http/createHttpLink.js [app-client] (ecmascript)");
;
const httpLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$link$2f$http$2f$createHttpLink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHttpLink"])({
    uri: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql/public',
    credentials: 'include'
});
const apolloClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$core$2f$ApolloClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ApolloClient"]({
    link: httpLink,
    cache: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$cache$2f$inmemory$2f$inMemoryCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InMemoryCache"](),
    defaultOptions: {
        watchQuery: {
            errorPolicy: 'all'
        },
        query: {
            errorPolicy: 'all'
        }
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/client/src/components/providers/apollo-wrapper.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ApolloWrapper": ()=>ApolloWrapper
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$context$2f$ApolloProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@apollo/client/react/context/ApolloProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$apollo$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/client/src/lib/apollo-client.ts [app-client] (ecmascript)");
'use client';
;
;
;
function ApolloWrapper(param) {
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$context$2f$ApolloProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApolloProvider"], {
        client: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$apollo$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apolloClient"],
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/client/src/components/providers/apollo-wrapper.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = ApolloWrapper;
var _c;
__turbopack_context__.k.register(_c, "ApolloWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/client/src/lib/api/auth.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Authentication API
__turbopack_context__.s({
    "authApi": ()=>authApi,
    "authUtils": ()=>authUtils
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:4000/api") || 'http://localhost:4000/api';
// Helper function for API requests
async function authRequest(endpoint) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const url = "".concat(API_BASE_URL).concat(endpoint);
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
            throw new Error(errorData.message || "HTTP error! status: ".concat(response.status));
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
        const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('auth_token') : "TURBOPACK unreachable";
        const result = await authRequest('/auth/logout', {
            method: 'POST',
            headers: token ? {
                Authorization: "Bearer ".concat(token)
            } : {}
        });
        // Clear local storage
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
        }
        return result;
    },
    // Get current user
    async getCurrentUser () {
        const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('auth_token') : "TURBOPACK unreachable";
        if (!token) {
            throw new Error('No auth token found');
        }
        return authRequest('/auth/me', {
            headers: {
                Authorization: "Bearer ".concat(token)
            }
        });
    },
    // Refresh token
    async refreshToken () {
        const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('auth_token') : "TURBOPACK unreachable";
        if (!token) {
            throw new Error('No auth token found');
        }
        return authRequest('/auth/refresh', {
            method: 'POST',
            headers: {
                Authorization: "Bearer ".concat(token)
            }
        });
    },
    // Verify token
    async verifyToken (token) {
        return authRequest('/auth/verify', {
            method: 'POST',
            headers: {
                Authorization: "Bearer ".concat(token)
            }
        });
    }
};
const authUtils = {
    // Save auth data to localStorage
    saveAuthData (token, user) {
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_data', JSON.stringify(user));
        }
    },
    // Get auth data from localStorage
    getAuthData () {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        return {
            token,
            user: userData ? JSON.parse(userData) : null
        };
    },
    // Clear auth data
    clearAuthData () {
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
        }
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/client/src/store/auth-store.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useAuth": ()=>useAuth,
    "useAuthActions": ()=>useAuthActions,
    "useAuthGuard": ()=>useAuthGuard,
    "useAuthStore": ()=>useAuthStore
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/client/src/lib/api/auth.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["devtools"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].login(credentials);
                if (response.success && response.token && response.user) {
                    // Save to localStorage
                    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authUtils"].saveAuthData(response.token, response.user);
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].register(userData);
                if (response.success && response.token && response.user) {
                    // Save to localStorage
                    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authUtils"].saveAuthData(response.token, response.user);
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
                await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].logout();
            } catch (error) {
                console.error('Logout API call failed:', error);
            // Continue with logout even if API call fails
            }
            // Clear localStorage
            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authUtils"].clearAuthData();
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
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].getCurrentUser();
                set({
                    user,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                console.error('Get current user failed:', error);
                // Token might be invalid, clear auth data
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authUtils"].clearAuthData();
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].refreshToken();
                if (response.success && response.token && response.user) {
                    // Save new token
                    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authUtils"].saveAuthData(response.token, response.user);
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
            const { token, user } = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authUtils"].getAuthData();
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
    _s();
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
_s(useAuth, "8ZC44qhbtMxv0wotksQALRPDM9c=", false, function() {
    return [
        useAuthStore
    ];
});
const useAuthActions = ()=>{
    _s1();
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
_s1(useAuthActions, "8ZC44qhbtMxv0wotksQALRPDM9c=", false, function() {
    return [
        useAuthStore
    ];
});
const useAuthGuard = ()=>{
    _s2();
    const { isAuthenticated, user } = useAuth();
    return {
        isAuthenticated,
        isAdmin: (user === null || user === void 0 ? void 0 : user.role) === 'admin',
        isEditor: (user === null || user === void 0 ? void 0 : user.role) === 'editor' || (user === null || user === void 0 ? void 0 : user.role) === 'admin',
        hasRole: (role)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authUtils"].hasRole(role)
    };
};
_s2(useAuthGuard, "zqOjhT7Uiy3zlq7M7mfKh34T04g=", false, function() {
    return [
        useAuth
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/client/src/components/providers/auth-provider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": ()=>AuthProvider
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$store$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/client/src/store/auth-store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function AuthProvider(param) {
    let { children } = param;
    _s();
    const initialize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$store$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "AuthProvider.useAuthStore[initialize]": (state)=>state.initialize
    }["AuthProvider.useAuthStore[initialize]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            initialize();
        }
    }["AuthProvider.useEffect"], [
        initialize
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ClerkProvider"], {
        appearance: {
            variables: {
                colorPrimary: '#dc2626',
                colorBackground: '#000000',
                colorInputBackground: '#111111',
                colorInputText: '#ffffff'
            },
            elements: {
                formButtonPrimary: 'bg-red-600 hover:bg-red-700',
                card: 'bg-black border border-red-600/20',
                headerTitle: 'text-red-600',
                formFieldLabel: 'text-gray-300'
            }
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/client/src/components/providers/auth-provider.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "PDKoX6Aov6X+avJdSXinV5EMd0I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$client$2f$src$2f$store$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = AuthProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=apps_client_src_cadd8da3._.js.map