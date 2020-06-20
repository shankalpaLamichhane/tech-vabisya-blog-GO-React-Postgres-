package lib

import "go-blog/controller/dtos"

type MultiData struct {
	Data        []dtos.PostRequest `json:"data"`
}
