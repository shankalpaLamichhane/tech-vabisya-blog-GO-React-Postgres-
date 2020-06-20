package main

import (
	"go-blog/controller"
	"encoding/json"
	"github.com/gorilla/mux"
	"go/ast"
	"log"
	"net/http"
)


func main() {

	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/v1/posts", controller.AddPost).Methods("POST")
	router.HandleFunc("/v1/posts/{id}", controller.UpdatePost).Methods("PUT")
	router.HandleFunc("/v1/posts/search", controller.SearchPosts).Methods("POST")
	router.HandleFunc("/v1/posts/{id}", controller.GetPostByIdentifier).Methods("GET")
	router.HandleFunc("/v1/posts/lat/tech", controller.SearchLatestTech).Methods("GET")
	router.HandleFunc("/v1/posts/lat/busi", controller.SearchLatestBusiness).Methods("GET")
	router.HandleFunc("/v1/posts/lat/food", controller.SearchLatestFood).Methods("GET")
	router.HandleFunc(
		"/v1/authenticate",
		controller.AuthenticateUser).Methods("POST")
	router.HandleFunc("/v1/users/{id}", controller.GetUserDetail).Methods("GET")

	router.HandleFunc("/v1/authenticate",
		Cors).Methods("OPTIONS")
	router.HandleFunc("/v1/posts",
		Cors).Methods("OPTIONS")
	router.HandleFunc("/v1/posts/search", Cors).Methods("OPTIONS")
	router.HandleFunc("/v1/posts/{id}", Cors).Methods("OPTIONS")
	router.HandleFunc("/v1/posts/tech", Cors).Methods("OPTIONS")
	router.HandleFunc("/v1/posts/busi", Cors).Methods("OPTIONS")
	router.HandleFunc("/v1/posts/food", Cors).Methods("OPTIONS")
	router.HandleFunc("/v1/users",Cors).Methods("OPTIONS")
	router.HandleFunc("/v1/users/{id}", Cors).Methods("OPTIONS")
	router.HandleFunc("/v1/users/search", Cors).Methods("OPTIONS")
	log.Fatal(http.ListenAndServe(":8080", router))
}


func Cors(w http.ResponseWriter, r *http.Request) {
	log.Println("INSIDE ADD POST OPTIONS:::")
	w.WriteHeader(http.StatusOK)
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE,HEAD")
	(w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	(w).Header().Set("Access-Control-Allow-Credentials", "true")
	log.Println("INSIDE ADD POST OPTIONS SUCCESS:::")
	json.NewEncoder(w).Encode(ast.Object{})
}
