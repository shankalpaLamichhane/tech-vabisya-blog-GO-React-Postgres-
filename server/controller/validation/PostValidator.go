package validation

import (
	"go-blog/controller/dtos"
	"go-blog/utils"
	"errors"
)

func ValidatePost(request dtos.PostRequest) error{
	if utils.IsBlank(request.Title) {
		customError.Message = "Title Missing"
		return errors.New(customError.Message)
	}
	if utils.IsBlank(request.Category){
		customError.Message = "Category Missing"
		return errors.New(customError.Message)
	}
	if utils.IsBlank(request.Description){
		customError.Message = "Description Missing"
		return errors.New(customError.Message)
	}
	return nil
}