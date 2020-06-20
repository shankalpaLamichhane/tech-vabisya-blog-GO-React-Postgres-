package entity

import (
	"time"
)

type UserModel struct {
	Id                      string    `json:"id"`
	UserId                  string    `json:"userId"`
	Password                string    `json:"password"`
	RoleId                  string    `json:"roleId"`
	Email                   string    `json:"email"`
	CreatedOn               time.Time `json:"createdOn"`
}
