"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCasbin = initCasbin;
exports.checkPermission = checkPermission;
exports.assignRole = assignRole;
exports.removeRole = removeRole;
exports.getEnforcer = getEnforcer;
const casbin_1 = require("casbin");
const casbin_pg_adapter_1 = __importDefault(require("casbin-pg-adapter"));
const path_1 = __importDefault(require("path"));
let enforcer = null;
async function initCasbin() {
    if (enforcer)
        return enforcer;
    const adapter = await casbin_pg_adapter_1.default.newAdapter({
        connectionString: process.env.DATABASE_URL,
    });
    const modelPath = path_1.default.join(__dirname, 'casbin_model.conf');
    enforcer = await (0, casbin_1.newEnforcer)(modelPath, adapter);
    // Načíst pravidla z databáze
    await enforcer.loadPolicy();
    // Nastavit výchozí pravidla pokud neexistují
    await setupDefaultPolicies(enforcer);
    return enforcer;
}
async function setupDefaultPolicies(enforcer) {
    // Kontrola, zda již existují některá pravidla
    const policies = await enforcer.getPolicy();
    if (policies.length === 0) {
        // Výchozí role a oprávnění
        // ADMIN oprávnění
        await enforcer.addPolicy('ADMIN', 'site_settings', 'read');
        await enforcer.addPolicy('ADMIN', 'site_settings', 'write');
        await enforcer.addPolicy('ADMIN', 'users', 'read');
        await enforcer.addPolicy('ADMIN', 'users', 'write');
        await enforcer.addPolicy('ADMIN', 'tasks', 'read');
        await enforcer.addPolicy('ADMIN', 'tasks', 'write');
        await enforcer.addPolicy('ADMIN', 'events', 'read');
        await enforcer.addPolicy('ADMIN', 'events', 'write');
        await enforcer.addPolicy('ADMIN', 'expenses', 'read');
        await enforcer.addPolicy('ADMIN', 'expenses', 'write');
        await enforcer.addPolicy('ADMIN', 'expenses', 'approve');
        // MEMBER oprávnění
        await enforcer.addPolicy('MEMBER', 'tasks', 'read');
        await enforcer.addPolicy('MEMBER', 'tasks', 'write');
        await enforcer.addPolicy('MEMBER', 'events', 'read');
        await enforcer.addPolicy('MEMBER', 'events', 'write');
        await enforcer.addPolicy('MEMBER', 'expenses', 'read');
        await enforcer.addPolicy('MEMBER', 'expenses', 'write');
        // VIEWER oprávnění (pouze čtení)
        await enforcer.addPolicy('VIEWER', 'tasks', 'read');
        await enforcer.addPolicy('VIEWER', 'events', 'read');
        await enforcer.addPolicy('VIEWER', 'expenses', 'read');
        // Uložit pravidla
        await enforcer.savePolicy();
        console.log('✅ Výchozí Casbin pravidla byla nastavena');
    }
}
async function checkPermission(userId, resource, action) {
    if (!enforcer) {
        throw new Error('Casbin enforcer není inicializován');
    }
    return enforcer.enforce(userId, resource, action);
}
async function assignRole(userId, role) {
    if (!enforcer) {
        throw new Error('Casbin enforcer není inicializován');
    }
    return enforcer.addRoleForUser(userId, role);
}
async function removeRole(userId, role) {
    if (!enforcer) {
        throw new Error('Casbin enforcer není inicializován');
    }
    return enforcer.deleteRoleForUser(userId, role);
}
function getEnforcer() {
    return enforcer;
}
