package dtos

type PostSearchRequest struct {
	Parameter string `json:"parameter"`
	Category        string `json:"category"`
	CreatedOn       string `json:"createdOn"`
}
