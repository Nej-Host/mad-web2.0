import { newEnforcer, Enforcer } from 'casbin';
import PgAdapter from 'casbin-pg-adapter';
import path from 'path';

let enforcer: Enforcer | null = null;

export async function initCasbin(): Promise<Enforcer> {
  if (enforcer) return enforcer;

  const adapter = await PgAdapter.newAdapter({
    connectionString: process.env.DATABASE_URL,
  });

  const modelPath = path.join(__dirname, 'casbin_model.conf');
  enforcer = await newEnforcer(modelPath, adapter);

  // Načíst pravidla z databáze
  await enforcer.loadPolicy();

  // Nastavit výchozí pravidla pokud neexistují
  await setupDefaultPolicies(enforcer);

  return enforcer;
}

async function setupDefaultPolicies(enforcer: Enforcer) {
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

export async function checkPermission(userId: string, resource: string, action: string): Promise<boolean> {
  if (!enforcer) {
    throw new Error('Casbin enforcer není inicializován');
  }

  return enforcer.enforce(userId, resource, action);
}

export async function assignRole(userId: string, role: string): Promise<boolean> {
  if (!enforcer) {
    throw new Error('Casbin enforcer není inicializován');
  }

  return enforcer.addRoleForUser(userId, role);
}

export async function removeRole(userId: string, role: string): Promise<boolean> {
  if (!enforcer) {
    throw new Error('Casbin enforcer není inicializován');
  }

  return enforcer.deleteRoleForUser(userId, role);
}

export function getEnforcer(): Enforcer | null {
  return enforcer;
}
