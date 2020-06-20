package controller

import (
	db "go-blog/db"
	model "go-blog/db/model"
	"go-blog/utils"
	"go-blog/controller/helpers"
	"go-blog/controller/dtos"
	"go-blog/controller/validation"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/davecgh/go-spew/spew"
	"log"
	"net/http"
)

var err error
var customError utils.Error

func AuthenticateUser(w http.ResponseWriter, r *http.Request) {
	request := dtos.AuthRequest{}
	_ = json.NewDecoder(r.Body).Decode(&request)
	log.Println("INSIDE AUTHENTICATE USER:::")
	spew.Dump(&request)
	err = validation.Validate(request)
	if err != nil {
		handleError(w,err)
		return
	}
	userInfo,err := getUser(request)
	if err != nil{
		handleError(w,err)
		return
	}
	err = validatePassword(userInfo,request)
	if err != nil{
		handleError(w,err)
		return
	}
	permissions,errorRole := preparePermissions()
	if errorRole != nil{
		handleError(w,errorRole)
		return
	}
	response,err := prepareResponse(w, userInfo, permissions)
	if err != nil{
		handleError(w,err)
		return
	}
	utils.ResponseJSON(w, response)
}


func validatePassword(userInfo dtos.UserRequest,request dtos.AuthRequest)error{
	fmt.Println("USER INFO::: ")
	spew.Dump(&userInfo)
	if !helpers.IsEncodingMatched(userInfo.Password,request.Password){
		customError.Message = "Invalid Login Credentials"
		fmt.Println("PASSWORD VALIDATION FAILED")
		return errors.New(customError.Message)
	}
	fmt.Println("PASSWORD VALIDATION PASSED")
	return nil
}

func prepareResponse(w http.ResponseWriter, userInfo dtos.UserRequest, permissions []string) (dtos.AuthResponse,error) {
	authenticateResponse := dtos.AuthResponse{}
	authenticateResponse.Permissions = permissions
	authenticateResponse.UserId = userInfo.UserId
	token,err := prepareToken(w, userInfo, permissions)
	if err!=nil{
		return authenticateResponse,err
	}
	authenticateResponse.Token = token
	return authenticateResponse,err
}

func prepareToken(w http.ResponseWriter, userInfo dtos.UserRequest, permissions []string) (string,error) {
	tokenString, err := helpers.GenerateToken(userInfo, permissions)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		customError.Message = "Token Generation Failed"
		return "",err
	}
	return tokenString,err
}

func preparePermissions() ([]string,error) {
	var perms []string
	return perms,nil
}

func handleError(w http.ResponseWriter, err error) {
	customError.Message = err.Error()
	customError.Code = "0"
	utils.RespondError(w, customError)
}

func getUser(request dtos.AuthRequest) (dtos.UserRequest,error) {
	userSearchRequest := getUserSearchRequestByUserName(request)
	userModel, _, err := db.GetUserAuthDetail(userSearchRequest)
	if err != nil {
		log.Fatal(err)
		return dtos.UserRequest{},err
	}
	if (model.UserModel{} == userModel) {
		fmt.Println("DB RETURNED EMPTY")
		customError.Message = "Invalid login credentials"
		return dtos.UserRequest{},errors.New(customError.Message)
	}
	return returnResponse(userModel),err
}

func getUserSearchRequestByUserName(request dtos.AuthRequest) dtos.UserSearchRequest{
	req := dtos.UserSearchRequest{}
	req.UserName = request.UserName
	return req
}
