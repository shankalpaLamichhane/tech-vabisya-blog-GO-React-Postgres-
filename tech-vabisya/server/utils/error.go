package utils

// Error - To assign error message to be sent to the client
type Error struct {
	Code string `json;"code"`
	Message string `json:"message"`
}
