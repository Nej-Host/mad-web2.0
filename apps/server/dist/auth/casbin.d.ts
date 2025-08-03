import { Enforcer } from 'casbin';
export declare function initCasbin(): Promise<Enforcer>;
export declare function checkPermission(userId: string, resource: string, action: string): Promise<boolean>;
export declare function assignRole(userId: string, role: string): Promise<boolean>;
export declare function removeRole(userId: string, role: string): Promise<boolean>;
export declare function getEnforcer(): Enforcer | null;
