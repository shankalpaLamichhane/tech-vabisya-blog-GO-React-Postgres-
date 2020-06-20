package dtos

type RoleRequest struct{
	Id                 string `json:"id"`
	Permissions        []string `json:"permissions"`
	Name               string `json:"name"`
	PermissionsDisplay []PermissionsView `json:"permissionDisplay"`
}

type PermissionsView struct{
	Title string `json:"title"`
	Code  string `json:"code"`
}
