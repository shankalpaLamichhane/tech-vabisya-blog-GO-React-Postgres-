package dao

import (
	"database/sql"
	"fmt"
	model "go-blog/db/model"
	"github.com/davecgh/go-spew/spew"
	"log"
	requests "go-blog/controller/dtos"
)

func init(){
	tmpDB,Dberr := sql.Open("postgres","dbname=jobs user=postgres password=postgres host=localhost sslmode=disable")
	if Dberr != nil{
		log.Fatal(Dberr)
	}
	db = tmpDB
}

func InsertPost(postModel model.PostModel) (model.PostModel, int, error) {

	fmt.Println("INSIDE DAO INSERT")

	var err error

	sqlStatement := `
INSERT INTO posts.posts (id, title, category, description,form_id,post_img,created_on)
VALUES ($1, $2, $3, $4, $5,$6,$7)
RETURNING id`
	_, err = db.Exec(sqlStatement, postModel.Id, postModel.Title,
	postModel.Category, postModel.Description,
	postModel.FormId,postModel.PostImg,postModel.CreatedOn)
	if err != nil {
		panic(err)
	}
	fmt.Println("New record ID is:", postModel.Id)
	return postModel, 0, err

}


func UpdatePost(postModel model.PostModel) (model.PostModel, int, error) {

	fmt.Println("INSIDE DAO UPDATE")

	var err error

	sqlStatement := `
UPDATE posts.posts set title=$1,category=$2,description=$3,form_id=$4`

	if ""!=postModel.PostImg{
		sqlStatement+=`,post_img='`+postModel.PostImg+`'`
	}
	sqlStatement+=` where id = $5`

	fmt.Println("THE FINAL SQL STATEMENT IS ::: ")
	fmt.Println(sqlStatement)
	_, err = db.Exec(sqlStatement,  postModel.Title, postModel.Category,
		postModel.Description,postModel.FormId,
		postModel.Id)
	if err != nil {
		panic(err)
	}
	fmt.Println("Updated record ID is:", postModel.Id)
	return postModel, 0, err

}

func GetPostDetail(request requests.PostRequest) (model.PostModel, int, error) {
	modelToReturn := model.PostModel{}
	fmt.Println("INSIDE DAO GET DETAIL")
	var err error
	sqlStatement := `SELECT id,category,title,description,form_id,post_img,coalesce(created_on,'0001-01-01 00:00:00.000000')
		FROM posts.posts where id = $1`
	rows, err := db.Query(sqlStatement, request.Id)

	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	for rows.Next() {
		err := rows.Scan(&modelToReturn.Id, &modelToReturn.Category, &modelToReturn.Title, &modelToReturn.Description,
			&modelToReturn.FormId,
			&modelToReturn.PostImg,
			&modelToReturn.CreatedOn)
		if err != nil {
			log.Fatal(err)
		}
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
		return model.PostModel{}, 0, err
	}
	return modelToReturn, 0, err
}


func SearchPosts(request requests.PostSearchRequest) ([]model.PostModel, int, error) {

	fmt.Println("INSIDE DAO SEARCH")

	types := []model.PostModel{}

	sqlStatement := `SELECT id,category,title,description,form_id,post_img,coalesce(created_on,'0001-01-01 00:00:00.000000')
		FROM posts.posts WHERE 1=1 `

	var err error

	if request.Parameter!=""{
		sqlStatement+=` AND lower(concat(title,category,description)) like lower('%`+request.Parameter+`%')`
	}

	if request.Category != ""{
		sqlStatement+= ` AND lower(category) = lower('`+request.Category+`')`
	}

	if request.CreatedOn != ""{
		sqlStatement+= ` AND date(created_on) = '`+request.CreatedOn+`'`
	}
		sqlStatement+=` ORDER BY created_on DESC`

	sqlStatement+= ` LIMIT 10 OFFSET 0`

	fmt.Println("THE FINAL sql statement IS")
	spew.Dump(sqlStatement)

	rows, err := db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		model := model.PostModel{}
		err := rows.Scan(&model.Id, &model.Category, &model.Title, &model.Description,
			&model.FormId,
			&model.PostImg,
			&model.CreatedOn)
		if err != nil {
			log.Fatal(err)
		}
		types = append(types, model)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
		return []model.PostModel{}, 0, err
	}
	return types, 0, err

}

func SearchPostsByCategory(request requests.PostSearchRequest) ([]model.PostModel, int, error) {

	fmt.Println("INSIDE DAO SEARCH BY CATEGORY")

	types := []model.PostModel{}

	sqlStatement := `SELECT id,category,title,post_img,coalesce(created_on,'0001-01-01 00:00:00.000000')
	FROM posts.posts WHERE 1=1 `

	if request.Category!=""{
		sqlStatement+=` AND category ='`+request.Category+`'`
	}

	sqlStatement+= ` order by created_on desc`
	var err error

	fmt.Println("THE FINAL sql statement IS")
	spew.Dump(sqlStatement)

	rows, err := db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		model := model.PostModel{}
		err := rows.Scan(&model.Id, &model.Category, &model.Title,
			&model.PostImg,
			&model.CreatedOn)
		if err != nil {
			log.Fatal(err)
		}
		types = append(types, model)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
		return []model.PostModel{}, 0, err
	}
	return types, 0, err

}

func CountPosts(request requests.PostSearchRequest) (int64, int, error) {

	fmt.Println("INSIDE DAO SEARCH")

	sqlStatement := `SELECT count(id) FROM posts.posts WHERE 1=1 `

	if request.Parameter!=""{
		sqlStatement+=` AND lower(concat(title,category,description)) like lower('%`+request.Parameter+`%')`
	}

	if request.Category != ""{
		sqlStatement+= ` AND lower(category) = lower('`+request.Category+`')`
	}

	if request.CreatedOn != ""{
		sqlStatement+= ` AND date(created_on) = '`+request.CreatedOn+`'`
	}

	var count int64

	rows := db.QueryRow(sqlStatement)
	err := rows.Scan(&count)
	if err != nil {
		log.Fatal(err)
		return 0, 0, err
	}
	return count, 0, err

}
