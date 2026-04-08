export type UserRole = 
  | "Admin" 
  | "Hr manager" 
  | "Content Manager" 
  | "Tech Manager" 
  | "Ops manager" 
  | "Content Team" 
  | "Dev Team" 
  | "Branding Team";

export const ADMIN_ROLES: UserRole[] = ["Admin", "Hr manager", "Content Manager", "Tech Manager", "Ops manager"];
export const TEAM_ROLES: UserRole[] = ["Content Team", "Dev Team", "Branding Team"];

export const blogStatuses = [
    { value: "DRAFT", label: "Draft", color: "bg-slate-100 text-slate-600" },
    { value: "PENDING_REVIEW", label: "Pending Review", color: "bg-amber-100 text-amber-600" },
    { value: "CHANGES_REQUESTED", label: "Changes Requested", color: "bg-rose-100 text-rose-600" },
    { value: "REJECTED", label: "Rejected", color: "bg-red-100 text-red-600" },
    { value: "PUBLISHED", label: "Published", color: "bg-emerald-100 text-emerald-600" }
];

export function isManager(role: string | null | undefined): boolean {
  return !!role && ADMIN_ROLES.includes(role as UserRole);
}

export function isTeamMember(role: string | null | undefined): boolean {
  return !!role && TEAM_ROLES.includes(role as UserRole);
}

export function canManageUsers(role: string | null | undefined): boolean {
  return isManager(role);
}

export function canPublishBlog(role: string | null | undefined): boolean {
  return isManager(role);
}

export function canEditCareers(role: string | null | undefined): boolean {
  return isManager(role);
}
