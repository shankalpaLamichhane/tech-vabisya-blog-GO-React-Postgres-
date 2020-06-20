package validation

import (
	"go-blog/controller/dtos"
	"github.com/pkg/errors"
	"go-blog/utils"
	"log"
)

var customError utils.Error
type AuthenticateValidator struct{

}

func Validate(request dtos.AuthRequest) error{
	return ValidateEmpty(request)
}

func ValidateEmpty(request dtos.AuthRequest) error{
	if utils.IsBlank(request.UserName) {
		customError.Message = "User Name Missing"
		return errors.New(customError.Message)
	}
	if utils.IsBlank(request.Password) {
		customError.Message = "Password Missing"
		return errors.New(customError.Message)
	}
	log.Println("VALIDATION PASS:::")
	return nil
}
