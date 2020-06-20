package dtos

type AuthResponse struct{
	UserId string `json:"userId"`
	Permissions []string `json:"permissions"`
	Token string `json:"token"`
	LastLoginDate string `json:"lastLoginDate"`
}
