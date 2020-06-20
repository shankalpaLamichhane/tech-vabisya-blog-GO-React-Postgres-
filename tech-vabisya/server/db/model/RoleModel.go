package entity

type RoleModel struct {
	Id          string `json:"id"`
	Permissions string `json:"permissions"`
	Name        string `json:"name"`
	UserType    string `json:"userType"`
	IsActive    bool   `"json:"active"`
}
