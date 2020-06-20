package controller

import (
	db "go-blog/db"
	model "go-blog/db/model"
	"go-blog/lib"
	"go-blog/utils"
	"go-blog/controller/dtos"
	"go-blog/controller/validation"
	"encoding/json"
	"fmt"
	"github.com/davecgh/go-spew/spew"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/pkg/errors"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"strings"
	"time"
)

func AddPost(w http.ResponseWriter,r *http.Request){
	request:= dtos.PostRequest{}
	r.Header.Add("Content-Type","multipart/form-data")
	r.ParseMultipartForm(500)
	for key,value:= range r.Form{
		fmt.Printf("%s = %s \n",key,value)
	}

	request.Title =r.Form.Get("title")
	request.Category = r.Form.Get("category")
	request.Description = r.Form.Get("description")
	request.FormId = r.Form.Get("formId")

	validationErr:= validation.ValidatePost(request)
	if validationErr != nil{
		fmt.Println(validationErr)
		return
	}

	postImg, handler, err:= r.FormFile("postImg")
	if err != nil{
		fmt.Println(err)
		return
	}

	postModel := model.PostModel{}
	postModel.Id = uuid.New().String()
	postModel.Title = request.Title
	postModel.Category = request.Category
	postModel.Description = request.Description
	postModel.FormId = request.FormId
	imgStringToStore := processImage(postImg,handler)
	postModel.PostImg = imgStringToStore
	postModel.CreatedOn = time.Now()

	response,_,errorFromDb := db.InsertPost(postModel)
	if errorFromDb!=nil{
		handleError(w,err)
		return
	}
	utils.ResponseJSON(w,response)
}


func UpdatePost(w http.ResponseWriter,r *http.Request){

	r.Header.Add("Content-Type","multipart/form-data")
	log.Println("INSIDE UPDATE POST :::")
	r.ParseMultipartForm(500)
	for key,value:= range r.Form{
		fmt.Printf("%s = %s \n",key,value)
	}

	postRequest := dtos.PostRequest{}
	params := mux.Vars(r)
	postRequest.Id = params["id"]
	postModel,_,errorFromDb := db.GetPostDetail(postRequest)
	if errorFromDb!=nil{
		handleError(w,errorFromDb)
		return
	}
	if (postModel == model.PostModel{}){
		customError.Message = "POST NOT FOUND"
		handleError(w,errors.New(customError.Message))
		return
	}
	spew.Dump(&postModel)

	postRequest.Title =r.Form.Get("title")
	postRequest.Category = r.Form.Get("category")
	postRequest.Description = r.Form.Get("description")
	postRequest.FormId = r.Form.Get("formId")
	postImg, handler, err:= r.FormFile("postImg")


	validationErr:= validation.ValidatePost(postRequest)
	if validationErr != nil{
		fmt.Println(validationErr)
		return
	}

	newpostModel := model.PostModel{}
	newpostModel.Id = postRequest.Id
	newpostModel.Title = postRequest.Title
	newpostModel.Category = postRequest.Category
	newpostModel.Description = postRequest.Description
	newpostModel.FormId = postRequest.FormId
	if nil!=postImg{
	imgStringToStore := processImage(postImg,handler)
		newpostModel.PostImg = imgStringToStore
	}

	response,_,errorFromDb := db.UpdatePost(newpostModel)
	if errorFromDb!=nil{
		handleError(w,err)
		return
	}
	utils.ResponseJSON(w,response)
}

func processImage(file multipart.File,handler *multipart.FileHeader) string {
	//TODO: STORE IN FIREBASE

	fmt.Printf("UPLOADED FILE : %+v\n",handler.Filename)
	fmt.Printf("FILE SIZE : %+v\n",handler.Size)
	fmt.Printf("MIME Header : %+v\n",handler.Header)

	tempFile,err := ioutil.TempFile("/media/sankalpa/New Volume/tech-vabisya-ui/public/images","upload-*.png")
	if err !=nil{
		fmt.Println(err)
	}
	defer tempFile.Close()

	fileBytes,err := ioutil.ReadAll(file)
	if err != nil{
		fmt.Println(err)
	}

	tempFile.Write(fileBytes)

	fmt.Println("SUCCESSFULLY UPLOADED FILE")
	return strings.Split(tempFile.Name(),"public/images/")[1]
}

func GetPostByIdentifier(w http.ResponseWriter,r *http.Request){
	postRequest := dtos.PostRequest{}
	params := mux.Vars(r)
	postRequest.Id = params["id"]
	postModel,_,errorFromDb := db.GetPostDetail(postRequest)
	if errorFromDb!=nil{
		handleError(w,errorFromDb)
		return
	}
	if (postModel == model.PostModel{}){
		customError.Message = "POST NOT FOUND"
		handleError(w,errors.New(customError.Message))
		return
	}
	spew.Dump(&postModel)
	utils.ResponseJSON(w,&postModel)
}

func SearchPosts(w http.ResponseWriter,r *http.Request){
	postSearchRequest := dtos.PostSearchRequest{}
	multidata := lib.MultiData{}
	_ = json.NewDecoder(r.Body).Decode(&postSearchRequest)
	fmt.Println("THE REQUEST IS ::: ")
	spew.Dump(multidata)

	if err !=nil{
		handleError(w,err)
		return
	}
	postsResponse,err:=getPosts(postSearchRequest)
	multidata.Data = postsResponse
	if err!=nil{
		handleError(w,err)
	}
	if err!=nil{
		fmt.Println(err)
	}
	utils.ResponseJSON(w,multidata)
}

func getPosts(postSearchRequest dtos.PostSearchRequest)([]dtos.PostRequest,error){
	postsResponse := []dtos.PostRequest{}
	postsModel,_,errFromDb := db.SearchPosts(postSearchRequest)
	if errFromDb!=nil{
		fmt.Println("DAO RETURNED EMPTY")
		customError.Message = "Invalid Login Credentials"
		return []dtos.PostRequest{},errFromDb
	}
	for i,p := range postsModel{
		fmt.Println(i)
		postsResponse = append(postsResponse, toPostRequest(p))
	}
	return postsResponse,nil
}

func toPostRequest(model model.PostModel)(dtos.PostRequest){
	postResponse := dtos.PostRequest{}
	postResponse.Id = model.Id
	postResponse.Title = model.Title
	postResponse.Category = model.Category
	postResponse.Description = model.Description
	postResponse.PostImg = postResponse.PostImg
	return postResponse
}

func SearchLatestTech(w http.ResponseWriter,r *http.Request){
	request := prepareRequestForSearchByCategory("TECH")
	spew.Dump(&request)
	postsResponse,err:=getPostsByCategory(request)
	if err!=nil{
		handleError(w,err)
	}
	utils.ResponseJSON(w, postsResponse)
}

func SearchLatestBusiness(w http.ResponseWriter,r *http.Request){
	postFilter := prepareRequestForSearchByCategory("BUSI")
	postsResponse,err:=getPostsByCategory(postFilter)
	spew.Dump(postsResponse)
	if err!=nil{
		handleError(w,err)
	}
	utils.ResponseJSON(w,postsResponse)
}

func SearchLatestFood(w http.ResponseWriter,r *http.Request){
	postFilter := prepareRequestForSearchByCategory("FOOD")
	postsResponse,err:=getPostsByCategory(postFilter)
	if err!=nil{
		handleError(w,err)
	}
	utils.ResponseJSON(w,postsResponse)
}

func getPostsByCategory(request dtos.PostSearchRequest)([]dtos.PostRequest,error) {
	postInfos := []dtos.PostRequest{}
	postEntities,_,errFromDb := db.SearchPostsByCategory(request)
	if errFromDb!=nil{
		fmt.Println("DB ERROR")
		return []dtos.PostRequest{},errFromDb
	}
	for i,p := range postEntities{
		fmt.Println(i)
		postInfos = append(postInfos, toPostResponse(p))
	}
	return postInfos,nil
}

func toPostResponse(postEntity model.PostModel )(dtos.PostRequest){
	postInfo:= dtos.PostRequest{}
	postInfo.Id = postEntity.Id
	postInfo.Category = postEntity.Category
	postInfo.Title = postEntity.Title
	postInfo.FormId = postEntity.FormId
	postInfo.PostImg = postEntity.PostImg
	postInfo.Description = postEntity.Description
	return postInfo
}


func prepareRequestForSearchByCategory(category string) dtos.PostSearchRequest {
	request := dtos.PostSearchRequest{}
	request.Category = category
	return request
}
