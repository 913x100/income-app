package main

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/labstack/gommon/log"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
    panic("failed to connect database")
  }

	db.AutoMigrate(&Income{})

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))
	
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Ok")
	})
	e.POST("/income", AddIncome)
	e.GET("/income", GetIncome)
	e.POST("/expense", AddExpense)
	e.GET("/expense", GetExpense)

	e.Logger.Fatal(e.Start(":3002"))
	
}

type Income struct {
	ID string `json:"id"`
	Text string `json:"text"`
	Amount int `json:"amount"`
}

type Expense struct {
	ID string `json:"id"`
	Text string `json:"text"`
	Amount int `json:"amount"`
}

func AddIncome(c echo.Context) error {
	var income Income
	if err := c.Bind(&income); err != nil {
		log.Error(err)
		return c.String(http.StatusInternalServerError, err.Error())
	}

	db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		log.Error(err)
		return c.String(http.StatusInternalServerError, err.Error())
	}

	db.Create(&income)

	return c.String(http.StatusOK, "add success")
}

func GetIncome(c echo.Context) error {
	var income []Income

	db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		return err
	}

	db.Find(&income)

	return c.JSON(http.StatusOK, income)
}

func AddExpense(c echo.Context) error {
	var expense Expense
	if err := c.Bind(&expense); err != nil {
		log.Error(err)
		return c.String(http.StatusInternalServerError, err.Error())
	}

	db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		log.Error(err)
		return c.String(http.StatusInternalServerError, err.Error())
	}

	db.Create(&expense)

	return c.String(http.StatusOK, "add success")
}

func GetExpense(c echo.Context) error {
	var expense []Expense

	db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		return err
	}

	db.Find(&expense)

	return c.JSON(http.StatusOK, expense)
}