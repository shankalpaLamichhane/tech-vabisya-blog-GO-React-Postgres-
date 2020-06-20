package helpers

type Cryptology interface {
	 IsEncodingMatched(encodedText string,plainText string) bool
	 EncodeString(plainText string) string
}

