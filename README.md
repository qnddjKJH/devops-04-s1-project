# 쇼핑몰 API Server
쇼핑몰 주제로 요구 사항에 맞게 API Server 개발

# 쇼핑몰 요구사항
- [x] 사용자는 모든 상품을 조회할 수 있다
- [x] 사용자는 특정 분류의 상품을 조회할 수 있다(상품분류, 브랜드명, 가격, 상품명)    
- [x] 사용자의 타입이 판매자인 경우 자신의 상품을 등록할 수 있다    
- [x] 사용자는 상품을 장바구니에 담을 수 있다
- [x] 사용자는 자신의 장바구니를 조회할 수 있다   
- [x] 사용자는 자신의 장바구니에 있는 상품의 수량을 변경시킬 수 있다    
- [x] 사용자는 상품을 자신의 장바구니에서 제외할 수 있다

# ERD
![shopping mall diagram](/dbdiagram/shoppingmall%20diagram.png)

# 구현 결과
- 사용자는 모든 상품을 조회할 수 있다
    ![](/images/getProduct.png)
- 사용자는 특정 분류의 상품을 조회할 수 있다(상품분류, 브랜드명, 가격, 상품명)
    ![](/images/getProductFilter.png)
- 사용자의 타입이 판매자인 경우 자신의 상품을 등록할 수 있다
    ![](/images/postProduct.png)
    ![](/images/postProductAuth.png)
- 사용자는 상품을 장바구니에 담을 수 있다
    ![](/images/postBasket.png)
- 사용자는 자신의 장바구니를 조회할 수 있다
    ![](/images/getBasket.png)
- 사용자는 자신의 장바구니에 있는 상품의 수량을 변경시킬 수 있다
    ![](/images/patchBasket.png)
- 사용자는 상품을 자신의 장바구니에서 제외할 수 있다
    ![](/images/deleteBasket.png)

# API 명세

| Method | Path | Description | Request Header | Request Body | Response Status Code | Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| GET | /product | 전체 상품 조회 | - | - | 200 OK | List<https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21> |
| GET | /product/{product-id} | 개별 상품 조회 | - | - | 200 OK | https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21 |
| POST | /product | 상품 등록 | - | https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21 | 201 Created | List<https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21> |
| GET | https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21 | 사용자 장바구니 조회 | user-id : {user-id} | - | 200 OK | https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21 |
| POST | https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21 | 사용자 장바구니 상품 등록 | - | https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21 | 201 Created | List<https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21> |
| PATCH | https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21 | 사용자 장바구니 상품 수량 수정 | - | https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21 | 200 OK | https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21 |
| DELETE | https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21 | 사용자 장바구니 상품 제외 | - | - | 200 OK | {
status : string,
message : string
} |
| GET | /user | 전체 사용자 조회 | - | - | 200 OK | List<https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21> |
| GET | /user/{user-id} | 개별 사용자 조회 | - | - | 200 OK | https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21 |
| POST | /user | 개별 사용자 등록 | - | https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21 | 201 Created | https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21 |
| PATCH | /user/{user-id} | 개별 사용자 수정 | - | https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21 | 200 OK | https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21 |
| DELETE | /user/{user-id} | 개별 사용자 삭제 | - | - | 200 OK | https://www.notion.so/52c451c26a6d436dbc3801f23133233d?pvs=21 |