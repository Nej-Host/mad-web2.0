"use strict";
// === Sdílené typy pro celou aplikaci ===
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseStatus = exports.Priority = exports.TaskStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["MEMBER"] = "MEMBER";
    UserRole["VIEWER"] = "VIEWER";
})(UserRole || (exports.UserRole = UserRole = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["TODO"] = "TODO";
    TaskStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TaskStatus["REVIEW"] = "REVIEW";
    TaskStatus["DONE"] = "DONE";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
var Priority;
(function (Priority) {
    Priority["LOW"] = "LOW";
    Priority["MEDIUM"] = "MEDIUM";
    Priority["HIGH"] = "HIGH";
    Priority["URGENT"] = "URGENT";
})(Priority || (exports.Priority = Priority = {}));
var ExpenseStatus;
(function (ExpenseStatus) {
    ExpenseStatus["PENDING"] = "PENDING";
    ExpenseStatus["APPROVED"] = "APPROVED";
    ExpenseStatus["REJECTED"] = "REJECTED";
})(ExpenseStatus || (exports.ExpenseStatus = ExpenseStatus = {}));
