package utils

import (
	"encoding/json"
	"github.com/davecgh/go-spew/spew"
	"net/http"
)

//RespondError - function to create response for error
func RespondError(w http.ResponseWriter, error Error) {
	w.Header().Set("Content-Type", "application/json") //set header
	errorResponse := Error{}
	errorResponse.Code=error.Code
	errorResponse.Message=error.Message
	setAllowCorsToWriter(w)
	w.WriteHeader(http.StatusBadRequest)                              //HTTP Status
	json.NewEncoder(w).Encode(&errorResponse)
}

//ResponseJSON - func to write the response JSON
func ResponseJSON(w http.ResponseWriter, data interface{}) {
	//w.Header().Set("Content-Type", "application/json") //set header
	response := Response{}
	response.Data = data
	response.Code="0"
	response.Message="SUCCESS"
	spew.Dump(&response)
	setAllowCorsToWriter(w)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&response)
}


func setAllowCorsToWriter(w http.ResponseWriter){
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE,HEAD")
	(w).Header().Set("Access-Control-Allow-Headers", "origin,accept,content-type,X-Requested-With,X-XSRF-TOKEN,Pragma,User-Agent,Lang")
	(w).Header().Set("Access-Control-Allow-Credentials", "true")
	(w).Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
	(w).Header().Set("Expires", "0")
	(w).Header().Set("Pragma", "no-cache")

}

func IsBlank(request string) bool{
	if request=="" {
		return true
	}
	return false
}