package dtos

type PostRequest struct {
	Id          string   `json:"id"`
	Category   	string `json:"category"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	FormId      string   `json:"formId"`
	PostImg     string   `"json:"postImg"`
	IsActive    bool     `json:"active"`
}
