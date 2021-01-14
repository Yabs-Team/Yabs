# Modules

## Books Module

### Getters

| Name       | Desc |
|------------|------|
| all        |      |
| allAsArray |      |

### Actions

| Name        | Args |
|-------------|------|
| fetchAll    |      |
| fetchSingle |      |
| create      |      |
| update      |      |
| delete      |      |

### Mutations

| Name            | Args |
|-----------------|------|
| setBook         |      |
| removeBook      |      |
| setFailure      |      |
| convertBookList |      |

## Loans Module

### Getters

| Name       | Desc |
|------------|------|
| all        |      |
| allAsArray |      |

### Actions

| Name     | Args |
|----------|------|
| fetchAll |      |
| create   |      |
| update   |      |
| delete   |      |

### Mutations

| Name                      | Args |
|---------------------------|------|
| setLoan                   |      |
| removeLoan                |      |
| removeLoanconvertLoanList |      |
| setFailure                |      |

## Status Module

### Getters

| Name       | Desc                                   |
|------------|----------------------------------------|
| allAsArray | Returns all statusMessages as an array |

### Actions

| Name | Args          |
|------|---------------|
| add  | StatusMessage |

### Mutations

| Name      | Args          |
|-----------|---------------|
| addStatus | StatusMessage |

## Titles Module

### Getters

| Name       | Desc |
|------------|------|
| all        |      |
| allAsArray |      |

### Actions

| Name              | Args |
|-------------------|------|
| fetchAll          |      |
| fetchSingle       |      |
| fetchSingleByISBN |      |
| create            |      |
| update            |      |
| delete            |      |
| getLoans          |      |

### Mutations

| Name             | Args |
|------------------|------|
| setTitle         |      |
| removeTitle      |      |
| setFailure       |      |
| convertTitleList |      |

## Users Module

### Getters

| Name          | Desc |
|---------------|------|
| currentUserID |      |
| all           |      |
| allAsArray    |      |
| currentUser   |      |

### Actions

| Name     | Args |
|----------|------|
| fetchAll |      |
| update   |      |
| signIn   |      |
| signOut  |      |

### Mutations

| Name            | Args |
|-----------------|------|
| setUser         |      |
| setCurrentUser  |      |
| setFailure      |      |
| convertUserList |      |
