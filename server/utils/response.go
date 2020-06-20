package utils

type Response struct {
	Message string `json:"message"`
	Code    string `json:"code"`
	Data interface{} `json:"data""`
}
