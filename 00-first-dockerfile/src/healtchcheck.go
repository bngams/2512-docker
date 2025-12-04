// healtchcheck.go create a helatcheck script for http://localhost:8080/hello
// GET HTTP to request to http://localhost:8080/hello
package main

import (
	"net/http"
	"os"
)

func main() {
	resp, err := http.Get("http://localhost:8080/hello")
	if err != nil || resp.StatusCode != http.StatusOK {
		os.Exit(1)
	}
	os.Exit(0)
}
