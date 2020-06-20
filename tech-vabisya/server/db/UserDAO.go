package dao

import (
	model "go-blog/db/model"
	requests "go-blog/controller/dtos"
	"database/sql"
	"fmt"
	"github.com/davecgh/go-spew/spew"
	_ "github.com/lib/pq"
	"log"
)

var db *sql.DB

func init() {
	tmpDB, Dberr := sql.Open("postgres", "dbname=jobs user=postgres password=postgres host=localhost sslmode=disable")
	if Dberr != nil {
		log.Fatal(Dberr)
	}
	db = tmpDB
}

func GetUserAuthDetail(request requests.UserSearchRequest) (model.UserModel, int, error) {
	modelToReturn := model.UserModel{}
	fmt.Println("INSIDE DAO GET DETAIL")
	var err error

	sqlStatement := `SELECT id,user_name,password,email,role_id
		FROM users.users where 1=1 `

	if request.UserName != "" {
		sqlStatement += `AND user_name='` + request.UserName + `'`
	}
	if request.Id != "" {
		sqlStatement += ` AND id = '` + request.Id + `'`
	}

	fmt.Println("THE SQL STATE MENT IS ::: "+sqlStatement)

	rows, err := db.Query(sqlStatement)

	if err != nil {
		log.Fatal(err)
		return model.UserModel{}, 0, err
	}
	defer rows.Close()
	for rows.Next() {
		err := rows.Scan(&modelToReturn.Id, &modelToReturn.UserId, &modelToReturn.Password, &modelToReturn.Email,
			&modelToReturn.RoleId)
		if err != nil {
			log.Fatal(err)
		}
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
		return model.UserModel{}, 0, err
	}
	fmt.Println("THE ENTITY FROM DAO IS :::")
	spew.Dump(&modelToReturn)
	return modelToReturn, 0, err
}

func GetUserDetail(request requests.UserSearchRequest) (model.UserModel, int, error) {
	modelToReturn := model.UserModel{}
	fmt.Println("INSIDE DAO GET DETAIL")
	var err error

	sqlStatement := `SELECT id,user_name,coalesce (user_type_code,''),email,coalesce(full_name,''),role_id,
		coalesce(is_active,false)
		FROM users.users where 1=1 `

	if request.UserName != "" {
		sqlStatement += `AND user_name='` + request.UserName + `'`
	}
	if request.Id != "" {
		sqlStatement += ` AND id = '` + request.Id + `'`
	}

	fmt.Println("THE SQL STATE MENT IS ::: "+sqlStatement)

	rows, err := db.Query(sqlStatement)

	if err != nil {
		log.Fatal(err)
		return model.UserModel{}, 0, err
	}
	defer rows.Close()
	for rows.Next() {
		err := rows.Scan(&modelToReturn.Id, &modelToReturn.UserId,
			&modelToReturn.RoleId)
		if err != nil {
			log.Fatal(err)
		}
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
		return model.UserModel{}, 0, err
	}
	fmt.Println("THE ENTITY FROM DAO IS :::")
	spew.Dump(&modelToReturn)
	return modelToReturn, 0, err
}

