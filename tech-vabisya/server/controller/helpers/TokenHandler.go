package helpers

import (
	"go-blog/controller/dtos"
	"github.com/dgrijalva/jwt-go"
	"time"
)

type TokenHandler struct{}

const (
	APP_KEY = "techvabisya.com"
)

func GenerateToken(info dtos.UserRequest,permissions []string) (string,error){
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,jwt.MapClaims{
		"userId":info.UserId,
		"expiryDate":time.Now().Add(time.Second*time.Duration(1000)).Unix(),
		"iat": time.Now().Unix(),
		"permissions":permissions,
	})
	tokenString,err := token.SignedString([]byte(APP_KEY))
	if err != nil{
		return "",err
	}
	return tokenString,err
}