package entity

import "time"

type PostModel struct {
	Id          string `json:"id"`
	Category string `json:"category"`
	Title        string `json:"title"`
	Description    string `json:"description"`
	FormId    string `json:"formId"`
	PostImg    string `json:"postImg"`
	CreatedOn time.Time `json:"createdOn"`
}

