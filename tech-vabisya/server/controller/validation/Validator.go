package validation

type Validator interface{
	Validate(data interface{})
}
