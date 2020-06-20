package dtos

type UserRequest struct {
	Id                      string `json:"id"`
	UserId                  string `json:"userId"`
	Password                string `json:"password"`
	Email                   string `json:"email"`
}
