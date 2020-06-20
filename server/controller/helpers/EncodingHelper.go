package helpers

import (
	"crypto/sha256"
	"encoding/hex"
)

type CryptologyImpl struct{

}

func IsEncodingMatched(encodedString string, textValue string) bool{
	encodedText := EncodeString(textValue)
	if encodedString == encodedText{
		return true
	}
	return false
}

func EncodeString(plainText string)string{
	encodedString := sha256.Sum256([]byte(plainText))
	return hex.EncodeToString(encodedString[:])
}