package main

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))

	e.POST("/income", AddIncome)
	e.GET("/income", GetIncome)

	e.Logger.Fatal(e.Start(":3002"))
	
}

type Income struct {
	ID string `json:"id"`
	Text string `json:"text"`
	Amount int `json:"amount"`
}

func AddIncome(c echo.Context) error {
	var income Income

	if err := c.Bind(income); err != nil {
		return err
	}

	db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		return c.String(http.StatusInternalServerError, "there are errors")
	}

	db.Create(&income)

	return c.String(http.StatusOK, "add success")
}

func GetIncome(c echo.Context) error {
	var incomes []Income

	db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		return err
	}

	db.Find(&incomes)

	return c.JSON(http.StatusOK, incomes)
}