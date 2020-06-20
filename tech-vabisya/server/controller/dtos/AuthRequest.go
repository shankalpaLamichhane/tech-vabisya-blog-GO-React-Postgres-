package dtos

type AuthRequest struct{
	UserName string `json:"userName"`
	Password string `json:"password"`
}
