package controller

import (
	db "go-blog/db"
	model "go-blog/db/model"
	"go-blog/utils"
	"go-blog/controller/dtos"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/davecgh/go-spew/spew"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)



func GetUserDetail(w http.ResponseWriter,r *http.Request){
	userSearchRequest := dtos.UserSearchRequest{}
	params := mux.Vars(r)
	userSearchRequest.Id = params["id"]
	_ = json.NewDecoder(r.Body).Decode(&userSearchRequest)
	fmt.Println("THE REQUEST IS =  ")
	spew.Dump(userSearchRequest)
	user,err := getUserDetail(userSearchRequest)
	if err!=nil{
		handleError(w,err)
		return
	}
	utils.ResponseJSON(w,user)
}

func getUserDetail(request dtos.UserSearchRequest) (dtos.UserRequest,error) {
	userModel, _, err := db.GetUserDetail(request)
	if err != nil {
		log.Fatal(err)
		return dtos.UserRequest{},err
	}
	if (model.UserModel{} == userModel) {
		fmt.Println("DAO RETURNED EMPTY")
		customError.Message = "User not found in db"
		return dtos.UserRequest{},errors.New(customError.Message)
	}
	return returnResponse(userModel),err
}

func returnResponse(model model.UserModel) dtos.UserRequest {
	userInfo:= dtos.UserRequest{}
	userInfo.Id = model.Id
	userInfo.UserId = model.UserId
	userInfo.Password = model.Password
	userInfo.Email = model.Email
	return userInfo
}