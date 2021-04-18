package main

import (
	"github.com/labstack/echo"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Income struct {
	ID string `json:"id"`
	Text string `json:"text"`
	Amount int `json:"amount"`
}

func AddIncome(c echo.Context) (err error) {
	var income Income

	if err := c.Bind(income); err != nil {
		return err
	}

	db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		return err
	}

	db.Create(&income)

	return nil
}