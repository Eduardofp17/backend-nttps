export const swaggerJson = {
  "openapi": "3.0.0",
  "info": {
    "title": "API NOURISHNET",
    "version": "1.0.0",
    "description": "This is the nourishnet api"
  },
  "servers": [
    {
      "url": "http://localhost:3001",
      "description": "TEST API"
    },
    {
      "url": "https://backend.noursihnet.net",
      "description": "PRODUCTION API"
    }
  ],
  "paths": {
    "/cardapio/": {
      "get": {
        "description": "Returns the menus for the current week",
        "tags": [
          "Cardapio"
        ],
        "responses": {
          "200": {
            "description": "List of menus for the week",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Cardapios"
                }
              }
            }
          }
        }
      },
      "post": {
        "description": "Creates a new menu",
        "tags": [
          "Cardapio"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CardapioRequestBody"
              },
              "examples": {
                "cardapio": {
                  "value": {
                    "dayname": "Segunda-feira",
                    "breakfast": "Pao com ovo",
                    "lunch": "carne",
                    "afternoonsnack": "bolacha",
                    "weeknumber": 0
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Post-Cardapios-response"
                }
              }
            }
          },
          "400": {
            "description": "Occurs if the \"dayname\" field is not filled or if the cardapio already exist, and you will receive a string describing the error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BadPostRequest"
                }
              }
            }
          },
          "401": {
            "description": "Occurs if you are not logged in or do not have permission. The response will contain an array of error descriptions.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UnauthorizedResponse"
                }
              }
            }
          }
        }
      }
    },
    "/cardapio/all/": {
      "get": {
        "description": "Returns all menus",
        "tags": [
          "Cardapio"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Cardapios"
                }
              }
            }
          }
        }
      }
    },
    "/cardapio/{id}/": {
      "parameters": [
        {
          "in": "path",
          "name": "id",
          "schema": {
            "type": "integer"
          },
          "required": true,
          "description": "Numeric ID of the cardapio"
        },
        {
          "in": "authorization",
          "name": [
            "role"
          ],
          "schema": {
            "type": "integer"
          },
          "required": true,
          "description": "Only users with the aforementioned minimum role can access",
          "examples": {
            "role": {
              "value": 2
            }
          }
        }
      ],
      "put": {
        "description": "Updates an existing menu",
        "tags": [
          "Cardapio"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CardapioResponse"
                }
              }
            }
          },
          "400": {
            "description": "This happens if you don't has specified the cardapio's ID",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string"
                },
                "examples": {
                  "error-return": {
                    "value": "Missing ID"
                  }
                }
              }
            }
          },
          "401": {
            "description": "This happens if you don't has the role enough",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string"
                },
                "examples": {
                  "error-return": {
                    "value": "Permissão inválida"
                  }
                }
              }
            }
          },
          "404": {
            "description": "This happens if the cardapio doesn't exist",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string"
                },
                "examples": {
                  "error-return": {
                    "value": "Cardapio not found"
                  }
                }
              }
            }
          }
        }
      },
      "delete": {
        "description": "Deletes an existing menu",
        "tags": [
          "Cardapio"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DeleteResponse"
                }
              }
            }
          },
          "400": {
            "description": "This happens if you don't have specified the cardapio's ID",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string"
                },
                "examples": {
                  "error-return": {
                    "value": "Missing ID"
                  }
                }
              }
            }
          },
          "404": {
            "description": "This happens if the cardapio doesn't exist",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string"
                },
                "examples": {
                  "error-return": {
                    "value": "Cardapio not found"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/frequencia/": {
      "get": {
        "description": "Returns all the current frequencias of your school",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "tags": [
          "Frequencia"
        ],
        "responses": {
          "200": {
            "description": "Returns all the current frequencias of your school",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Frequencias"
                }
              }
            }
          }
        }
      },
      "post": {
        "description": "Create a room to manage attendance",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FrequenciaRequestBody"
              },
              "examples": {
                "FrequenciaRequestBody": {
                  "value": {
                    "sala": "Sala 01"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "tags": [
          "Frequencia"
        ],
        "responses": {
          "200": {
            "description": "Returns all the current frequencias of your school",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Frequencias"
                }
              }
            }
          },
          "400": {
            "description": "Returns an error if you don't filled the fields or an error when the room already exist",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string"
                },
                "examples": {
                  "error": {
                    "value": "Please, fill in the fields"
                  },
                  "error2": {
                    "value": "Sala already exist"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Returns an error if you have wrong information. Ex: You are not associated with an institution",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string"
                },
                "examples": {
                  "error": {
                    "value": "You must be associated with a school"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/frequencia/{id}/": {
      "delete": {
        "description": "Delete a record of Frequencia by ID",
        "tags": [
          "Frequencia"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of the Frequencia to be deleted",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Frequencia successfully deleted",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "deleted": {
                      "type": "boolean",
                      "description": "Indicates if the Frequencia was successfully deleted"
                    },
                    "msg": {
                      "type": "string",
                      "description": "Success message"
                    }
                  }
                },
                "example": {
                  "deleted": true,
                  "msg": "Successfully deleted"
                }
              }
            }
          },
          "400": {
            "description": "Error: Bad Request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "deleted": {
                      "type": "boolean",
                      "description": "Indicates if the Frequencia was not deleted"
                    },
                    "msg": {
                      "type": "string",
                      "description": "Error message"
                    }
                  }
                },
                "examples": {
                  "error": {
                    "value": {
                      "deleted": false,
                      "msg": "Missing ID"
                    }
                  },
                  "error2": {
                    "value": {
                      "deleted": false,
                      "msg": "Frequencia doesn't exist"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Error: Frequencia not found",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "deleted": {
                      "type": "boolean",
                      "description": "Indicates if the Frequencia was not deleted"
                    },
                    "msg": {
                      "type": "string",
                      "description": "Error message"
                    }
                  }
                },
                "examples": {
                  "error": {
                    "value": {
                      "deleted": false,
                      "msg": "Frequencia doesn't exist"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "put": {
        "description": "Update a record of Frequencia by ID",
        "tags": [
          "Frequencia"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of the Frequencia to be updated",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FrequenciaRequestBody"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Frequencia successfully updated",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "updated": {
                      "type": "boolean",
                      "description": "Indicates if the Frequencia was successfully updated"
                    },
                    "theDoc": {
                      "$ref": "#/components/schemas/Frequencia"
                    }
                  }
                },
                "example": {
                  "updated": true,
                  "theDoc": {
                    "id": 1,
                    "sala": "Sala 01",
                    "qtd_presentes": 50,
                    "updated_by": "John Doe",
                    "Date": "2023-07-20",
                    "Hour": "14:30",
                    "created_at": "2023-07-20T10:00:00Z",
                    "updated_at": "2023-07-20T14:30:00Z",
                    "school_id": 1
                  }
                }
              }
            }
          },
          "400": {
            "description": "Error: Bad Request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "updated": {
                      "type": "boolean",
                      "description": "Indicates if the Frequencia was not updated"
                    },
                    "msg": {
                      "type": "string",
                      "description": "Error message"
                    }
                  }
                },
                "examples": {
                  "error": {
                    "value": {
                      "updated": false,
                      "msg": "Missing ID"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Invalid permission or not associated with a school",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "updated": {
                      "type": "boolean",
                      "description": "Indicates if the Frequencia was not updated"
                    },
                    "msg": {
                      "type": "string",
                      "description": "Error message"
                    }
                  }
                },
                "examples": {
                  "error": {
                    "value": {
                      "updated": false,
                      "msg": "You must be associate to an school"
                    }
                  },
                  "error2": {
                    "value": {
                      "updated": false,
                      "msg": "Invalid permission"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Error: Frequencia not found",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "updated": {
                      "type": "boolean",
                      "description": "Indicates if the Frequencia was not updated"
                    },
                    "msg": {
                      "type": "string",
                      "description": "Error message"
                    }
                  }
                },
                "examples": {
                  "error": {
                    "value": {
                      "updated": false,
                      "msg": "Frequencia doesn't exist"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/frequencia/history/": {
      "get": {
        "description": "Get the history record of a Frequencia by ID",
        "tags": [
          "Frequencia"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Frequencia history successfully retrieved",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/FrequenciaHistoric"
                }
              }
            }
          }
        }
      }
    },
    "/users/": {
      "get": {
        "description": "Retrieve a list of users from the database.",
        "tags": [
          "Users"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response with a list of users.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Users"
                }
              }
            }
          }
        }
      },
      "put": {
        "description": "Update user information in the database.",
        "tags": [
          "Users"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response indicating the user information was updated.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "updated": {
                      "type": "boolean"
                    },
                    "theDoc": {
                      "type": "object",
                      "properties": {
                        "user": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer"
                            },
                            "nome": {
                              "type": "string"
                            },
                            "sobrenome": {
                              "type": "string"
                            },
                            "email": {
                              "type": "string"
                            },
                            "level": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request with error messages.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/users/forgotPassword/": {
      "post": {
        "description": "Send an email to users or school users to redefine their password.",
        "tags": ["Users"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string",
                    "description": "Email of the user or school user to receive the password reset link."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Email sent successfully.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string",
                  "example": "Email sent successfully"
                }
              }
            }
          },
          "400": {
            "description": "Bad request with error messages.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string"
                },
                "examples": {
                  "error": {
                    "value": "Please type the email"
                  },
                  "error2": {
                    "value": "Invalid email"
                  }
                }
              }
            }
          },
          "422": {
            "description": "User doesn't exist.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string",
                  "example": "User doesn't exist."
                }
              }
            }
          }
        }
      }
    },
    "/users/redefine/{token}": {
      "put": {
        "description": "Redefine user password using the provided token.",
        "tags": ["Users"],
        "parameters": [
          {
            "name": "Authorization",
            "in": "path",
            "description": "JWT token to authenticate the request",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "password": {
                    "type": "string",
                    "description": "The new password to set for the user."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Password redefined successfully.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string",
                  "example": "Password redefined"
                }
              }
            }
          },
          "400": {
            "description": "Bad request with error messages.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string"
                },
                "examples": {
                  "error": {
                    "value": "User doesn't exist"
                  },
                  "error2": {
                    "value": "Please type the new password"
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal server error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string",
                  "example": "Internal server error"
                }
              }
            }
          }
        }
      }
    },
    "/users/update-user-role/{id}": {
      "put": {
        "description": "Change the user role",
        "tags": ["Users"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Id of the user to be updated",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "level": {
                    "type": "number",
                    "description": "The new  user role"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "User role successfully updated.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "updated": {
                      "type": "boolean"
                    },
                    "theDoc": {
                      "type": "object",
                      "properties": {
                        "user": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer"
                            },
                            "nome": {
                              "type": "string"
                            },
                            "sobrenome": {
                              "type": "string"
                            },
                            "email": {
                              "type": "string"
                            },
                            "school_id": {
                              "type": "number"
                            },
                            "level": {
                              "type": "string"
                            }
                            ,
                            "updated_at": {
                              "type": "string"
                            },
                            "created_at": {
                              "type": "string"
                            }

                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },

            "400": {
              "description": "Bad request with error messages.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "errors": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized - You cannot update this user as it is not linked to your institution.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "errors": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "examples": {
                    "example": {
                      "value": {
                        "errors": ["You cannot update this user as it is not linked to your institution"]
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "User not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "errors": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "examples": {
                    "example": {
                      "value": {
                        "errors": ["User not found"]
                      }
                    }
                  }
                }
              }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Cardapios": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/Cardapio"
        }
      },
      "Cardapio": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "dayname": {
            "type": "string"
          },
          "breakfast": {
            "type": "string"
          },
          "lunch": {
            "type": "string"
          },
          "afternoonsnack": {
            "type": "string"
          },
          "weeknumber": {
            "type": "number",
            "description": "NUMBER that indicates the actual week"
          },
          "school_id": {
            "type": "number",
            "description": "ID that indicates the school to which the menu belongs"
          },
          "created_at": {
            "type": "string",
            "description": "UTC date containing the date when the menu was created"
          },
          "updated_at": {
            "type": "string",
            "description": "UTC date containing the last date the menu was updated"
          }
        }
      },
      "CardapioRequestBody": {
        "type": "object",
        "properties": {
          "dayname": {
            "type": "string"
          },
          "breakfast": {
            "type": "string"
          },
          "lunch": {
            "type": "string"
          },
          "afternoonsnack": {
            "type": "string"
          },
          "weeknumber": {
            "type": "number",
            "description": "NUMBER that indicates the actual week"
          }
        }
      },
      "Post-Cardapios-response": {
        "type": "object",
        "properties": {
          "msg": {
            "type": "string",
            "description": "Successfully created"
          },
          "cardapio": {
            "$ref": "#/components/schemas/Cardapio"
          }
        }
      },
      "BadPostRequest": {
        "type": "object",
        "properties": {
          "error": {
            "type": "string"
          }
        }
      },
      "UnauthorizedResponse": {
        "type": "object",
        "properties": {
          "errors": {
            "type": "array",
            "items": {
              "type": "string",
              "description": "Description of the invalid permission error."
            }
          }
        }
      },
      "CardapioResponse": {
        "type": "object",
        "properties": {
          "updated": {
            "type": "boolean"
          },
          "theDoc": {
            "$ref": "#/components/schemas/Cardapio"
          }
        }
      },
      "DeleteResponse": {
        "type": "object",
        "properties": {
          "deleted": {
            "type": "boolean"
          }
        }
      },
      "Frequencias": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/Frequencia"
        }
      },
      "FrequenciaRequestBody": {
        "type": "object",
        "properties": {
          "sala": {
            "type": "string"
          }
        }
      },
      "Frequencia": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "sala": {
            "type": "string"
          },
          "qtd_presentes": {
            "type": "integer"
          },
          "updated_by": {
            "type": "string"
          },
          "Date": {
            "type": "string"
          },
          "Hour": {
            "type": "string"
          },
          "created_at": {
            "type": "string"
          },
          "updated_at": {
            "type": "string"
          },
          "school_id": {
            "type": "integer"
          }
        }
      },
      "FrequenciaHistoric": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "sala": {
            "type": "string"
          },
          "breakfast": {
            "type": [
              "string",
              "null"
            ]
          },
          "lunch": {
            "type": [
              "string",
              "null"
            ]
          },
          "afternoonsnack": {
            "type": [
              "string",
              "null"
            ]
          },
          "updated_by": {
            "type": "string"
          },
          "Date": {
            "type": "string"
          },
          "Hour": {
            "type": "string"
          },
          "school_id": {
            "type": "integer"
          },
          "created_at": {
            "type": "string"
          },
          "updated_at": {
            "type": "string"
          }
        }
      },
      "Users": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/userBody"
        }
      },
      "userBody": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "nome": {
            "type": "string"
          },
          "sobrenome": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "level": {
            "type": "string"
          },
          "created_at": {
            "type": "string"
          },
          "updated_at": {
            "type": "string"
          }
        }
      }
    },
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  }
}
